# Loading Bar

The loading part of a game's start screen: a big glossy progress bar, a "Loading… 42%" label, an optional bouncing icon and rotating gameplay tips. `SC.loading.done` fills it, fires `done` and hides its Screen Shell.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/screen/screen.css">
<link rel="stylesheet" href="kit/components/progress/progress.css">
<link rel="stylesheet" href="kit/components/loading/loading.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-screen" data-backdrop="solid" id="loadingScreen">
  <div class="sc-screen-middle"><h1 class="sc-title" data-color="gold">MY GAME</h1></div>
  <div class="sc-screen-bottom">
    <div class="sc-loading" id="loader" data-icon="coin" data-tips="Tap to jump|Collect coins for skins"></div>
  </div>
</div>
```

```js
assets.onProgress = p => SC.loading.set('loader', p * 100);
loader.addEventListener('done', startGame);
assets.onComplete = () => SC.loading.done('loader');
```

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-value` | 0–100 | `0` | Clamped and rounded. |
| `data-color` | `blue` `sky` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `orange` | Bar fill. |
| `data-icon` | kit icon | none | Bounces above the bar. |
| `data-tips` | `tip|tip|tip` | none | Rotated every 3 s. |
| `data-label` | text | `Loading` | Text before the percent. |

The runtime builds `.sc-loading-icon`, `.sc-loading-label`, a large `.sc-progress` and `.sc-loading-tip`, and sets `role="progressbar"` + `aria-valuenow`.

## JavaScript

```js
SC.loading.set(el, pct);  // el or id; fires "done" once when it first reaches 100
SC.loading.done(el);      // set 100, fire done, hide the parent .sc-screen after 0.4 s
```

## Rules for AI agents

- Show one loading screen at game start: a solid Screen Shell with the game title in the middle and `.sc-loading` in the bottom.
- Report real progress, and never go backwards.
- Tips: 2–5 short gameplay tips, about 8 words max each.
- Start the game on the `done` event.
