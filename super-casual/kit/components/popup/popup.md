# Popup

A modal window over the game: confirmations, level info, downloads, pause menus. You write the content, and the kit builds the header, title, close button, dark backdrop and animations.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/button/button.css">
<link rel="stylesheet" href="kit/components/icon-button/icon-button.css">
<link rel="stylesheet" href="kit/components/popup/popup.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-popup" id="exit" data-color="purple" data-title="Exit Game" hidden>
  <p class="sc-popup-message">Do you really want to exit the game?</p>
  <div class="sc-popup-actions">
    <button class="sc-button" data-color="dark" data-size="sm" data-close>No</button>
    <button class="sc-button" data-color="green" data-size="sm" id="exitYes">Yes</button>
  </div>
</div>
```

```js
SC.popup.open('exit');
```

Don't write the header or close button yourself. They're built from `data-title`.

## Options

| Attribute       | Values | Default | Notes |
|-----------------|--------|---------|-------|
| `data-title`    | text | — | Required |
| `data-color`    | `blue` `red` `purple` | `blue` | |
| `data-sub`      | text | — | Small tag under the title: NORMAL, HARD, LEVEL 12 |
| `data-closable` | `false` | — | Hides the X |
| `data-backdrop` | `static` | — | Tapping outside does not close |
| `hidden`        | boolean | — | Popup starts closed |
| `data-close`    | on any child | — | Tapping it closes the popup |

## Content helpers

| Class | Use |
|-------|-----|
| `.sc-popup-message` | Outlined message text (1–2 sentences) |
| `.sc-popup-value` | Big yellow highlighted value: 40.5MB, 250 |
| `.sc-popup-hint` | Small soft helper text |
| `.sc-panel` | Light inset card grouping items (e.g. small reward slots) |
| `.sc-popup-section` | Darker bottom area (put actions inside) |
| `.sc-popup-actions` | Button row. `data-layout="stack"` = vertical, full width |

## Examples

```html
<!-- Level start -->
<div class="sc-popup" id="level" data-color="red" data-title="LEVEL 54" data-sub="HARD" hidden>
  <div class="sc-panel">
    <div class="sc-slot" data-size="sm" data-icon="gem" data-count="24" data-color="white"></div>
    <div class="sc-slot" data-size="sm" data-icon="ruby" data-count="12" data-color="white"></div>
  </div>
  <div class="sc-popup-section">
    <div class="sc-popup-actions">
      <button class="sc-button" data-color="yellow" id="play">PLAY</button>
    </div>
  </div>
</div>

<!-- Pause menu -->
<div class="sc-popup" id="pause" data-title="PAUSED" data-sub="LEVEL 12" hidden>
  <div class="sc-popup-actions" data-layout="stack">
    <button class="sc-button" data-color="green" data-size="lg" data-close>RESUME</button>
    <button class="sc-button" data-color="yellow" id="restart">Restart</button>
    <button class="sc-button" data-color="red" id="quit">Quit</button>
  </div>
</div>
```

## JavaScript

```js
SC.popup.open('pause');
SC.popup.close('pause');
SC.popup.toggle('pause');
pause.addEventListener('open',  () => game.pause());
pause.addEventListener('close', () => game.resume());
```

## Rules for AI agents

- **Color meaning:** blue = info / neutral · red = warning, hard levels, destructive · purple = premium or special.
- **Keep it short:** title 1–3 words, message 1–2 sentences, at most 3 buttons.
- **Buttons:** two in a row use `sm`, secondary left, primary right. Three or more use `data-layout="stack"`.
- **Pause the game** while a popup is open, using the `open` / `close` events.
- **Required choices** use `data-closable="false"` and `data-backdrop="static"`.
- **Only one popup open at a time.** Place popups as direct children of the UI layer, above the game canvas.
