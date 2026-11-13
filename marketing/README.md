# Ustaad on Instagram

Brand kit and reel pipeline. Open `brand/kit.html` in a browser to see the
system; `brand/brand.css` is the thing every piece actually imports.

> The preview pane inside Claude Code renders these as static snapshots and
> drops the stylesheet, so they look unstyled in there. Open them in a real
> browser, or render one with the command below.

## Making a reel

    node marketing/lib/render.mjs marketing/reels/001-net-trap-1024

Out comes `001-net-trap-1024.mp4` at 1080x1920 30fps, plus two sets of
stills, numbered in order:

- `.build/stills/` at 1080x1920, for Stories and for a reel's frames
- `.build/stills-feed/` at 1080x1350, for a feed carousel

4:5 is the tallest a feed post may be. Handing Instagram a 9:16 image for the
feed leaves the crop to it, so the second set is cut here instead, 285px off
each end. The cards are centred with deep padding so nothing is lost; worth
re-checking if a card is ever built with content near an edge.

The same scene therefore ships as a reel, a Story or a carousel with no
rebuild.

Nothing needs installing. Chrome rasterises the artwork once and ffmpeg does
all the movement, so a 13-second reel encodes in seconds and changing a word
is a re-render, not a recompile.

## A reel is two files

    reels/<slug>/
      scene.html   the artwork, importing brand.css
      spec.json    timing and the caption

### mode: cards (the default)

`scene.html` is a `.deck`: a vertical column of 1080x1920 cards. The reel
cuts between them, and each lands with a short scale-in.

```json
{
  "mode": "cards",
  "fps": 30,
  "cards": [
    { "name": "hook", "seconds": 2.3, "pop": 0.30 },
    { "name": "question", "seconds": 3.7, "pop": 0.22 }
  ]
}
```

`seconds` is how long the card holds. `pop` is how long its scale-in takes;
drop it for a flat cut. The scene must be exactly as many cards tall as the
array is long.

### mode: pan

`scene.html` is a `.strip`, one wide image, and the camera travels across it,
holding where there is something to read.

```json
{
  "mode": "pan",
  "width": 4320,
  "beats": [
    { "hold": 2.4 },
    { "to": 1080, "move": 0.75 }
  ],
  "end": { "seconds": 3.0 }
}
```

`to` is the left edge of the visible window in scene pixels, so a
four-screen strip ends at `3240`, not `4320`. In this mode an `end.html`, if
present, is appended as the final frame.

**Use cards for a question.** A pan cannot show that something changed: the
marked answer slides past and a viewer reads it as the same card moving. Use
pan only for a piece that is one continuous thought.

## Rules worth not breaking

**English.** The app is bilingual on purpose; the socials are not. Forced
Roman Urdu in on-screen copy reads as try-hard, and the one place a Pakistani
voice belongs is the caption and a voiceover, if there ever is one.

**One highlight per card.** The `.hl` block is how a changed line registers.
Two of them on a card and neither does.

**The hook has to earn two seconds.** A crest so a student knows it is their
exam, the claim, and a stake. A pill reading "NUST NET" at 26px is not a
hook; nobody can read it while scrolling.

**The yellow is for the last card only.** It is how a viewer knows a piece
has finished.

**Keep clear of Instagram's chrome.** Roughly the top 7% and the bottom 19%.
The `.screen` and `.endcard` padding already accounts for it; check a frame
if you move anything lower.

**Flat.** No gradients, no shadows, ever, and especially not on a bubble.

## Checking a render before posting

    ffmpeg -ss 1.5 -i <reel>.mp4 -frames:v 1 frame.png

Worth doing on the first frame of each card. Safe-zone bands can be drawn on
with `drawbox` if something is close to an edge.

## Two kinds of post

`spec.json` records which one a piece is in `kind`.

**reach** carries no ask, judged on shares and saves.
**conversion** carries the ask, goes out only when something is happening,
judged on link taps and installs.

Judge a conversion post on likes and you will conclude it failed. The
reference account's own numbers: the brand piece took 22.9K likes, the 75%
off piece took 65. The second one was not a mistake.

## Where the questions come from

Real past papers, never invented. `ustaad_extractor` holds the bank, and the
`Mistake:` line in each explanation is what a trap reel is built around.

Note that `explanations.json` there is an unterminated append log, so it
needs repair-parsing (drop the trailing partial object, close the array)
before it will parse. Questions in `done/*.json` carry options and the
correct index but no explanations; join them to that file on question text.

Crests come from the site's own `public/unis/`. They are trademarks, used
nominatively to say which test is being covered, and any university that asks
is dropped.
