# Screen Title

Big gradient headline for result and event screens: CLEAR!, FAILED, LEVEL UP, NEW RECORD.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/title/title.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<h1 class="sc-title" data-color="gold" data-animate="drop">CLEAR!</h1>
```

Write the text as plain text. `sc.js` builds the gradient and outline layers.

## Options

| Attribute      | Values | Default | Notes |
|----------------|--------|---------|-------|
| `data-color`   | `gold` `red` `blue` `green` `purple` `white` | `gold` | Gradient color |
| `data-size`    | `sm` `md` `lg` | `lg` | 32 / 46 / 60 px |
| `data-animate` | `drop` `pop` `shake` | — | Entrance animation, plays when shown |

## Examples

```html
<h1 class="sc-title" data-color="gold" data-animate="drop">CLEAR!</h1>
<h1 class="sc-title" data-color="red" data-animate="shake">FAILED</h1>
<h1 class="sc-title" data-color="blue" data-animate="pop">LEVEL UP</h1>
<h1 class="sc-title" data-color="white">PAUSED</h1>
```

## JavaScript

```js
SC.setLabel(title, 'FAILED'); // change the text
SC.replay(title);             // play the entrance animation again
```

## Rules for AI agents

- **One title per screen**, at the top.
- **Color and animation by outcome:** win → `gold` + `drop` · fail → `red` + `shake` · level up → `blue` · reward / new item → `purple` + `pop` · neutral (PAUSED) → `white`.
- **Text:** 1–2 words, UPPERCASE, optional "!".
- **Size:** `lg` for result screens, `md` if the text is longer than 8 letters.
- **Not for popup headers.** Popups build their own title from `data-title`.
