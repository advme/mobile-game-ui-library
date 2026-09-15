# Title Banner Ribbon

A ribbon banner with darker folded tails behind both ends, for announcements above a character, reward or result panel: NEW SKIN!, SEASON RESULT, LEVEL UP.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/banner/banner.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-banner" data-color="pink" data-animate="unfurl">NEW SKIN!</div>
```

Write the text inside. The runtime wraps it in `.sc-banner-band`; the tails come from CSS. Do not write inner markup.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-color` | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `orange` | |
| `data-size` | `sm` `md` `lg` | `md` | Text 14 / 20 / 28 px. |
| `data-animate` | `unfurl` `drop` | none | Entrance animation (replays each time it is shown). |

## JavaScript

```js
SC.setLabel(banner, 'LEVEL UP');
SC.replay(banner);
```

## Rules for AI agents

- Use 1–3 capital words, often with "!". For big result words (CLEAR!, FAILED) use Screen Title instead.
- Place it centered above the thing it announces.
- Leave about one banner-height of free space on each side for the tails.
- Colors: pink = new skin/character, orange = season/results, purple = rare/epic, green = level up.
- Use `data-animate="unfurl"` on reward reveals.
