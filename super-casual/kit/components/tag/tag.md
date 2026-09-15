# Tag Ribbon

Small sticker labels: NEW, HOT, BEST, SALE, FREE, -50%, x2. Attach one to a Button, Icon Button or Tab with `data-tag`, or place a standalone `.sc-tag` inside cards, rows and titles. Glossy two-tone label with a dark outline and a 3D bottom edge in any kit color.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/tag/tag.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<!-- On a host: the runtime builds the sticker -->
<button class="sc-button" data-color="yellow" data-tag="HOT">Shop</button>

<!-- Standalone -->
<span class="sc-tag" data-color="green">NEW</span>
```

Reward Slot keeps its own built-in `data-tag` on the top edge.

## Options

On a host (`.sc-button`, `.sc-icon-button`, tab buttons):

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-tag` | short text | none | Empty or removed = no tag. |
| `data-tag-color` | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `red` | |
| `data-tag-pos` | `top-left` `top-right` `top` | `top-left` | Corners are tilted; `top` is centered on the top edge. |

Standalone `.sc-tag`:

| Attribute | Values | Default |
|---|---|---|
| `data-color` | same colors | `red` |
| `data-size` | `sm` `md` `lg` (11 / 14 / 18 px text) | `md` |
| `data-tilt` | boolean | not tilted |

## JavaScript

```js
btn.dataset.tag = 'SALE';
btn.dataset.tagColor = 'purple';
btn.removeAttribute('data-tag');
```

## Rules for AI agents

- Use one short capital word: NEW, HOT, BEST, SALE, FREE, -50%, x2.
- Colors: red = HOT/SALE, green = NEW/FREE, yellow = BEST, purple = discounts, sky = multipliers.
- One tag per item, and at most 2–3 tagged items per screen.
- Leave ~10px around tagged hosts, with no `overflow:hidden` parent.
- Starburst "BEST/HOT" stickers are image assets. Never draw them in code.
