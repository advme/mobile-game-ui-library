# Star Rating

Shows how many stars the player earned: level results, level select, item quality.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/stars/stars.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-stars" data-value="2"></div>
```

The stars build themselves from `data-value`. Don't write inner HTML.

## Options

| Attribute      | Values | Default | Notes |
|----------------|--------|---------|-------|
| `data-value`   | number | — | Required. Earned stars |
| `data-max`     | 1–5 | `3` | Total stars |
| `data-size`    | `sm` `md` `lg` | `md` | 22 / 44 / 96 px |
| `data-layout`  | `row` `arc` | `row` | `arc`: raised middle star, tilted outer stars |
| `data-animate` | boolean | — | Stars pop in one by one when shown |

## Examples

```html
<!-- Success screen -->
<div class="sc-stars" data-value="2" data-layout="arc" data-size="lg" data-animate></div>

<!-- Fail screen -->
<div class="sc-stars" data-value="0" data-layout="arc" data-size="lg"></div>

<!-- Level select button -->
<div class="sc-stars" data-size="sm" data-value="3"></div>
```

## JavaScript

```js
SC.setValue(stars, 3);                                        // newly earned stars pop in
stars.addEventListener('star', e => playDing(e.detail.index)); // one event per earned star
```

## Rules for AI agents

- **Result screens:** `data-layout="arc"` + `data-size="lg"` + `data-animate`, right under the Screen Title.
- **Fail screens:** `data-value="0"` (all empty), no animation.
- **Level select and lists:** `sm`, row layout.
- **Play a sound on each `star` event.** A rising pitch per star feels best.
- **3 stars for levels.** Use `data-max="5"` only for ratings or item quality.
