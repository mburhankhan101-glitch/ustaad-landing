# Ustaad on Instagram

Brand kit and reel pipeline. Open `brand/kit.html` in a browser to see the
system; `brand/brand.css` is the thing every piece actually imports.

> The preview pane inside Claude Code renders these as static snapshots and
> drops the stylesheet, so they look unstyled there. Open them in a real
> browser, or render one with the command below, to see them properly.

## Making a reel

    node marketing/lib/render.mjs marketing/reels/001-net-trap-1024

Out comes `001-net-trap-1024.mp4`, 1080x1920, 30fps, ready to upload, plus
`.build/end.png` which is the end card on its own and doubles as the static
post.

Nothing needs installing. The renderer uses Chrome (already here) to
rasterise the HTML and ffmpeg (already here) to move a 1080-wide window
across it. A 17-second reel takes a few seconds, which is the point: changing
a word is a re-render, not a recompile.

## A reel is three files

    reels/<slug>/
      scene.html   one wide strip, 1080px per frame, imports brand.css
      end.html     one 1080x1920 card on the loud yellow
      spec.json    how the camera moves, and the caption

`spec.json`:

| field | what it does |
|---|---|
| `width` | the strip's full width. Four screens is `4320` |
| `beats` | the camera, in order. `{"hold": 4.0}` sits still; `{"to": 2160, "move": 0.7}` travels to that x |
| `end.seconds` | how long the end card holds |
| `audio` | usually `null`. Add trending audio in Instagram instead; it helps distribution |
| `caption` | the post caption, kept with the asset so it does not get rewritten from memory later |

Moves ease in and out, and `to` is the left edge of the visible window in
scene pixels. A four-screen strip ends at `3240`, not `4320`.

## Rules worth not breaking

**The camera holds.** A question needs reading time. A constant pan gives a
four-word hook and four options with exponents in them the same two seconds.

**The layout does not change between frames of the same question.** Only the
marking does. That is what makes a pan read as an answer sheet being filled
in rather than as three separate cards.

**The yellow is for end cards only.** It is how a viewer knows a piece has
finished.

**Keep clear of Instagram's chrome.** It covers roughly the top 7% and the
bottom 19%. The `.screen` padding already accounts for this; if you move
content lower, check a frame before posting.

**Flat.** No gradients, no shadows, no bevels, ever, and especially not on a
bubble.

## Two kinds of post

`spec.json` records which one a piece is in `kind`.

**reach** carries no ask. Judged on shares and saves.
**conversion** carries the ask, goes out only when something is actually
happening, and is judged on link taps and installs.

Judge a conversion post on likes and you will conclude it failed. The
reference account's own numbers: the brand piece took 22.9K likes, the 75%
off piece took 65. The second one was not a mistake.

## Where the questions come from

Real past papers, never invented. `ustaad_extractor` holds the bank; the
`Mistake:` line in each explanation is what a "ye trap hai" reel is built
around, and there are thousands of them.

Note that `explanations.json` in that repo is an unterminated append log, so
it needs repair-parsing (drop the trailing partial object, close the array)
before it will parse.
