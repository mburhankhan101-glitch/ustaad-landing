#!/usr/bin/env node
/**
 * Renders one reel.
 *
 *   node marketing/lib/render.mjs marketing/reels/001-net-trap-1024
 *
 * Two modes, both built on the same trick: rasterise the artwork once with
 * Chrome, then let ffmpeg do all the movement. Nothing is screenshotted per
 * frame, so a 13-second reel encodes in seconds and changing a word is a
 * re-render rather than a recompile.
 *
 *   mode: "cards"  (default) — scene.html is a vertical column of 1080x1920
 *         cards. Each one cuts to the next and lands with a short scale-in,
 *         so a changed line arrives as an event instead of sliding past.
 *
 *   mode: "pan" — scene.html is one wide strip and the camera travels across
 *         it, holding where there is something to read. Right for a piece
 *         that is one continuous thought; wrong for a question, because a
 *         viewer cannot tell that anything changed.
 *
 * Needs only Chrome and ffmpeg. Override with CHROME= / FFMPEG= if they move.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

const FRAME_W = 1080;
const FRAME_H = 1920;

const CHROME_CANDIDATES = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);

function findChrome() {
  const hit = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!hit) {
    throw new Error('No Chrome or Edge found. Set CHROME=/path/to/chrome.exe.');
  }
  return hit;
}

const FFMPEG = process.env.FFMPEG || 'ffmpeg';

/** Rasterises one html file at an exact pixel size. */
function shoot(chrome, html, out, width, height) {
  // Absolute, because Chrome resolves --screenshot against its own working
  // directory rather than ours and silently writes nothing useful otherwise.
  const target = resolve(out).replace(/\\/g, '/');
  execFileSync(
    chrome,
    [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      // Without a virtual time budget the screenshot can land before the web
      // font and the logo have arrived, and the piece silently falls back to
      // a system face with a missing image where the crest should be.
      '--virtual-time-budget=10000',
      // scene.html pulls the university crest out of the site's public
      // folder, which a file:// page is otherwise not allowed to read.
      '--allow-file-access-from-files',
      `--window-size=${width},${height}`,
      `--screenshot=${target}`,
      `file:///${resolve(html).replace(/\\/g, '/')}`,
    ],
    { stdio: 'pipe' },
  );
  if (!existsSync(out)) throw new Error(`Chrome wrote no screenshot for ${html}`);
}

/**
 * A card's scale-in, as an ffmpeg zoompan expression.
 *
 * Starts slightly enlarged and settles, which reads as the card landing.
 * Scale can only go one way here: the source is already exactly one frame
 * wide, so zooming below 1 would have nothing to fill the edges with.
 */
function popExpr(pop, fps, amount = 0.07) {
  const frames = Math.max(1, Math.round(pop * fps));
  const u = `(on/${frames})`;
  const ease = `(${u}*${u}*(3-2*${u}))`;
  return `if(lt(on,${frames}),${1 + amount}-${amount}*${ease},1)`;
}

/**
 * The pan's x as one ffmpeg expression.
 *
 * Moves use smoothstep rather than a straight ramp: a pan that starts and
 * stops abruptly reads as a slide transition.
 */
function panExpr(segs, maxX) {
  const clamp = (v) => Math.max(0, Math.min(maxX, Math.round(v)));
  let expr = `${clamp(segs[segs.length - 1].x1)}`;
  for (let i = segs.length - 1; i >= 0; i--) {
    const { t0, t1, x0, x1 } = segs[i];
    const a = clamp(x0);
    const b = clamp(x1);
    let piece;
    if (a === b) {
      piece = `${a}`;
    } else {
      const u = `((t-${t0.toFixed(3)})/${(t1 - t0).toFixed(3)})`;
      piece = `(${a}+(${b - a})*(${u}*${u}*(3-2*${u})))`;
    }
    expr = `if(lt(t,${t1.toFixed(3)}),${piece},${expr})`;
  }
  return expr;
}

function keyframes(beats, startX) {
  const segs = [];
  let t = 0;
  let x = startX;
  for (const beat of beats) {
    if (beat.hold != null) {
      segs.push({ t0: t, t1: t + beat.hold, x0: x, x1: x });
      t += beat.hold;
    } else if (beat.to != null) {
      const d = beat.move ?? 0.8;
      segs.push({ t0: t, t1: t + d, x0: x, x1: beat.to });
      t += d;
      x = beat.to;
    } else {
      throw new Error(`Beat is neither hold nor move: ${JSON.stringify(beat)}`);
    }
  }
  return { segs, total: t };
}

function run(args) {
  execFileSync(FFMPEG, args, { stdio: 'inherit' });
}

function renderCards(dir, spec, chrome, work, out) {
  const fps = spec.fps ?? 30;
  const cards = spec.cards;
  if (!Array.isArray(cards) || !cards.length) {
    throw new Error('mode "cards" needs a non-empty spec.cards');
  }

  const sceneH = cards.length * FRAME_H;
  const scenePng = join(work, 'scene.png');
  console.log(`· rasterising ${cards.length} cards  ${FRAME_W}x${sceneH}`);
  shoot(chrome, join(dir, 'scene.html'), scenePng, FRAME_W, sceneH);

  const args = ['-y', '-v', 'error'];
  // The same still is opened once per card so each can carry its own
  // duration; ffmpeg is happy to take one file as several inputs.
  for (const card of cards) {
    args.push('-loop', '1', '-framerate', String(fps), '-t', String(card.seconds), '-i', scenePng);
  }
  if (spec.audio) args.push('-i', resolve(dir, spec.audio));

  const chains = cards.map((card, i) => {
    const y = i * FRAME_H;
    const bits = [`[${i}:v]crop=${FRAME_W}:${FRAME_H}:0:${y}`];
    if (card.pop) {
      bits.push(
        `zoompan=z='${popExpr(card.pop, fps)}'` +
          `:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'` +
          `:d=1:s=${FRAME_W}x${FRAME_H}:fps=${fps}`,
      );
    }
    bits.push(`fps=${fps}`, `format=yuv420p`);
    return `${bits.join(',')}[c${i}]`;
  });
  chains.push(
    `${cards.map((_, i) => `[c${i}]`).join('')}concat=n=${cards.length}:v=1:a=0[v]`,
  );

  // Written to a file: the expressions are full of commas and parentheses,
  // and quoting them through a shell on Windows loses an afternoon.
  const graph = join(work, 'filter.txt');
  writeFileSync(graph, chains.join(';\n'), 'utf8');

  const total = cards.reduce((s, c) => s + c.seconds, 0);
  console.log(`· encoding  ${total.toFixed(1)}s`);

  args.push('-filter_complex_script', graph, '-map', '[v]');
  if (spec.audio) {
    args.push('-map', `${cards.length}:a`, '-c:a', 'aac', '-b:a', '160k', '-shortest');
  }
  args.push(
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', String(fps),
    out,
  );
  run(args);

  // The last card doubles as the static post, so it is also written on its
  // own. One asset, two placements.
  const still = join(work, 'last-card.png');
  run([
    '-y', '-v', 'error', '-i', scenePng,
    '-vf', `crop=${FRAME_W}:${FRAME_H}:0:${(cards.length - 1) * FRAME_H}`,
    '-frames:v', '1', still,
  ]);

  return { total, extra: still };
}

function renderPan(dir, spec, chrome, work, out) {
  const fps = spec.fps ?? 30;
  const sceneW = spec.width;
  if (!sceneW) throw new Error('mode "pan" needs spec.width');

  const scenePng = join(work, 'scene.png');
  console.log(`· rasterising strip  ${sceneW}x${FRAME_H}`);
  shoot(chrome, join(dir, 'scene.html'), scenePng, sceneW, FRAME_H);

  const hasEnd = existsSync(join(dir, 'end.html'));
  const endPng = join(work, 'end.png');
  if (hasEnd) {
    console.log(`· rasterising end card  ${FRAME_W}x${FRAME_H}`);
    shoot(chrome, join(dir, 'end.html'), endPng, FRAME_W, FRAME_H);
  }

  const { segs, total } = keyframes(spec.beats, spec.start ?? 0);
  const endSec = hasEnd ? (spec.end?.seconds ?? 2.6) : 0;
  const expr = panExpr(segs, sceneW - FRAME_W);

  const parts = [
    `[0:v]crop=${FRAME_W}:${FRAME_H}:'${expr}':0,fps=${fps},format=yuv420p[a]`,
  ];
  if (hasEnd) {
    parts.push(`[1:v]fps=${fps},format=yuv420p[b]`, `[a][b]concat=n=2:v=1:a=0[v]`);
  } else {
    parts.push(`[a]null[v]`);
  }
  const graph = join(work, 'filter.txt');
  writeFileSync(graph, parts.join(';\n'), 'utf8');

  const args = [
    '-y', '-v', 'error',
    '-loop', '1', '-framerate', String(fps), '-t', total.toFixed(3), '-i', scenePng,
  ];
  if (hasEnd) {
    args.push('-loop', '1', '-framerate', String(fps), '-t', endSec.toFixed(3), '-i', endPng);
  }
  if (spec.audio) args.push('-i', resolve(dir, spec.audio));
  args.push('-filter_complex_script', graph, '-map', '[v]');
  if (spec.audio) {
    args.push('-map', `${hasEnd ? 2 : 1}:a`, '-c:a', 'aac', '-b:a', '160k', '-shortest');
  }
  args.push(
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', String(fps),
    out,
  );

  console.log(`· encoding  ${(total + endSec).toFixed(1)}s`);
  run(args);
  return { total: total + endSec, extra: hasEnd ? endPng : null };
}

function main() {
  const dir = process.argv[2];
  if (!dir) {
    console.error('usage: node marketing/lib/render.mjs <reel folder>');
    process.exit(1);
  }

  const specPath = join(dir, 'spec.json');
  if (!existsSync(specPath)) throw new Error(`No spec.json in ${dir}`);
  const spec = JSON.parse(readFileSync(specPath, 'utf8'));

  const chrome = findChrome();
  const work = join(dir, '.build');
  mkdirSync(work, { recursive: true });

  const out = join(dir, `${basename(dir)}.mp4`);
  const mode = spec.mode ?? 'cards';
  const { total, extra } =
    mode === 'pan'
      ? renderPan(dir, spec, chrome, work, out)
      : renderCards(dir, spec, chrome, work, out);

  console.log(`\n  ${out}`);
  console.log(`  ${total.toFixed(1)}s · ${FRAME_W}x${FRAME_H} · ${spec.fps ?? 30}fps`);
  if (extra) console.log(`  static post: ${extra}`);
}

main();
