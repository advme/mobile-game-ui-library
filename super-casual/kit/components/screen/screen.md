# Screen Shell

The full-page layout every game screen starts from: a top bar, a centered middle and a bottom bar. It floats above the game canvas, fits any phone, never scrolls, and keeps 12px (plus the notch / home-bar safe area) from the real screen edges.

Content is designed at **400×870** and scaled to fit. The shell stretches to the real screen shape, so the top and bottom bars always hug the real edges and the middle stays centered.

## Install

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/screen/screen.css">
<script src="kit/sc.js"></script>
```

Also load the CSS of every component you put inside (button, counter, title…).

## Usage

```html
<canvas id="game"></canvas>

<div class="sc-screen">
  <div class="sc-screen-top">…</div>      <!-- sticks to the top edge -->
  <div class="sc-screen-middle">…</div>   <!-- centered in the space left -->
  <div class="sc-screen-bottom">…</div>   <!-- sticks to the bottom edge -->
</div>
```

All three regions are optional. `sc.js` handles scaling and resizing; never write resize code.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-backdrop` | `none` `dim` `solid` | `none` | `none`: game visible, and taps on empty space reach the game (HUD). `dim`: dark see-through, blocks the game (pause, results). `solid`: opaque dark background (start, shop, loading). |
| `data-width` | px | `400` | Design width. |
| `data-height` | px | `870` | Design height. |
| `data-fit` | `screen` `parent` | `screen` | `parent` fills the parent box instead of the phone screen (docs previews only; parent needs `position:relative`). |
| `data-enter` | `fade` `pop` `none` | `fade` | Animation when shown. |
| `hidden` | | | Not shown. Use `SC.screen.show(id)`. |

Regions:

| Element | Layout | Options |
|---|---|---|
| `.sc-screen-top` | row, items spread apart | `data-align="between | start | center | end"`, `data-stack` = column |
| `.sc-screen-middle` | column, centered, fills the free space | |
| `.sc-screen-bottom` | row, centered, always at the bottom | `data-align`, `data-stack` |

## Examples

```html
<!-- Gameplay HUD: game stays tappable -->
<div class="sc-screen" id="hud">
  <div class="sc-screen-top">
    <div class="sc-counter" data-icon="coin" data-value="1250"></div>
    <button class="sc-icon-button" data-icon="pause" aria-label="Pause"></button>
  </div>
</div>

<!-- Result screen over the game -->
<div class="sc-screen" data-backdrop="dim" id="win" hidden>
  <div class="sc-screen-middle">
    <h1 class="sc-title" data-color="gold" data-animate="drop">CLEAR!</h1>
    <div class="sc-stars" data-value="3" data-layout="arc" data-size="lg" data-animate></div>
  </div>
  <div class="sc-screen-bottom" data-stack>
    <button class="sc-button" data-color="green" data-size="lg">Next</button>
    <button class="sc-button" data-color="dark" data-size="sm">Home</button>
  </div>
</div>
```

Full working example: `examples/screen-on-canvas.html` (start → HUD → pause).

## JavaScript

```js
SC.screen.show('win');   // show (fires "show"); child entrance animations replay
SC.screen.hide('hud');   // short fade, then hidden (fires "hide")
SC.screen.fit();         // re-measure; only needed after resizing a data-fit="parent" box yourself

win.addEventListener('show', () => …);
win.addEventListener('hide', () => …);
```

## Rules for AI agents

- Every full-page UI (HUD, start, pause, success, fail, shop, settings, loading) is one `.sc-screen`. Never write your own scale/resize code or `position:fixed` layouts.
- Never scroll. If content does not fit 400×870, remove or shrink content.
- HUD uses `data-backdrop="none"`. Menus and results over the game use `dim`, and screens that replace the game use `solid`.
- Resources and pause go in the top bar. Main actions go in the bottom bar. Titles, stars and rewards go in the middle.
- Do not add edge margins or safe-area padding; the shell already has them. Add `viewport-fit=cover` to the viewport meta.
- Show one screen per layer at a time and switch with `SC.screen.show / hide`. The HUD may stay under a `dim` screen.
- Put `.sc-popup` outside `.sc-screen` (at the end of `<body>`), never inside it.
- Size content for the 400px design width (e.g. a full-width bar is `width:100%` inside a region, not `100vw`).
