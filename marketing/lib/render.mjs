#!/usr/bin/env node
/**
 * Renders one reel: scene.html -> a wide still -> a panned 1080x1920 mp4.
 *
 *   node marketing/lib/render.mjs marketing/reels/001-net-trap-1024
 *
 * Two things this does that a naive pan does not.
 *
 * First, the camera holds. A question needs reading time, and a constant
 * linear pan gives every part of the strip the same two seconds whether it is
 * a four-word hook or four options with exponents in them. So `beats` in
 * spec.json alternates holds and moves, and the moves ease in and out.
 *
 * Second, there are no per-frame screenshots. The scene is rasterised once
 * and ffmpeg does the movement as a cropped window travelling across that one
 * image, which is why a 17-second reel renders in seconds rather than taking
 * 500 screenshots. Changing a word costs one re-render, not a recompile.
 *
 * Needs only Chrome and ffmpeg, both of which are already on this machine.
 * Override either with CHROME= / FFMPEG= if they move.
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
    throw new Error(
      'No Chrome or Edge found. Set CHROME=/path/to/chrome.exe and retry.',
    );
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
      // font has arrived, and the whole piece silently falls back to Georgia.
      '--virtual-time-budget=10000',
      `--window-size=${width},${height}`,
      `--screenshot=${target}`,
      `file:///${resolve(html).replace(/\\/g, '/')}`,
    ],
    { stdio: 'pipe' },
  );
  if (!existsSync(out)) throw new Error(`Chrome wrote no screenshot for ${html}`);
}

/**
 * Turns `beats` into absolute keyframes.
 *
 * A beat is either { hold: seconds } (camera still) or
 * { to: x, move: seconds } (camera travels to x). Everything is in scene
 * pixels, where x is the left edge of the 1080-wide window.
 */
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
      throw new Error(`Beat is neither a hold nor a move: ${JSON.stringify(beat)}`);
    }
  }
  return { segs, total: t };
}

/**
 * The crop's x as one ffmpeg expression.
 *
 * Moves use smoothstep rather than a straight ramp: a pan that starts and
 * stops abruptly reads as a slide transition, which is exactly the look the
 * flat-and-slow reference avoids.
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

  const sceneW = spec.width;
  if (!sceneW) throw new Error('spec.width (the strip width in px) is required');

  const scenePng = join(work, 'scene.png');
  const endPng = join(work, 'end.png');

  console.log(`· rasterising scene  ${sceneW}x${FRAME_H}`);
  shoot(chrome, join(dir, 'scene.html'), scenePng, sceneW, FRAME_H);

  const hasEnd = existsSync(join(dir, 'end.html'));
  if (hasEnd) {
    console.log(`· rasterising end card  ${FRAME_W}x${FRAME_H}`);
    shoot(chrome, join(dir, 'end.html'), endPng, FRAME_W, FRAME_H);
  }

  const { segs, total } = keyframes(spec.beats, spec.start ?? 0);
  const endSec = hasEnd ? (spec.end?.seconds ?? 2.6) : 0;
  const fps = spec.fps ?? 30;
  const expr = panExpr(segs, sceneW - FRAME_W);

  // Written to a file rather than passed inline: the expression is full of
  // commas and parentheses, and quoting it through a shell on Windows is a
  // reliable way to lose an afternoon.
  const parts = [
    `[0:v]crop=${FRAME_W}:${FRAME_H}:'${expr}':0,fps=${fps},format=yuv420p[a]`,
  ];
  if (hasEnd) {
    parts.push(`[1:v]fps=${fps},format=yuv420p[b]`);
    parts.push(`[a][b]concat=n=2:v=1:a=0[v]`);
  } else {
    parts.push(`[a]null[v]`);
  }
  const graph = join(work, 'filter.txt');
  writeFileSync(graph, parts.join(';\n'), 'utf8');

  const out = join(dir, `${basename(dir)}.mp4`);
  const args = [
    '-y', '-v', 'error',
    '-loop', '1', '-framerate', String(fps), '-t', total.toFixed(3), '-i', scenePng,
  ];
  if (hasEnd) {
    args.push('-loop', '1', '-framerate', String(fps), '-t', endSec.toFixed(3), '-i', endPng);
  }
  if (spec.audio) {
    args.push('-i', resolve(dir, spec.audio));
  }
  args.push(
    '-filter_complex_script', graph,
    '-map', '[v]',
  );
  if (spec.audio) {
    args.push('-map', `${hasEnd ? 2 : 1}:a`, '-c:a', 'aac', '-b:a', '160k', '-shortest');
  }
  args.push(
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-r', String(fps),
    out,
  );

  console.log(`· encoding  ${(total + endSec).toFixed(1)}s`);
  execFileSync(FFMPEG, args, { stdio: 'inherit' });

  console.log(`\n  ${out}`);
  console.log(`  ${(total + endSec).toFixed(1)}s · ${FRAME_W}x${FRAME_H} · ${fps}fps`);
  if (hasEnd) console.log(`  end card also usable as the static: ${endPng}`);
}

main();
