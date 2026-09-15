# Level Badge

The kit's `level-badge` shield with an outlined level number. Use it alone (profile, hero card) or on the left end of a Progress Bar to make an XP bar.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/level/level.css">
<link rel="stylesheet" href="kit/components/progress/progress.css">  <!-- for XP bars -->
<script src="kit/sc.js"></script>
```

## Usage

```html
<span class="sc-level" data-value="5"></span>
<div class="sc-progress" data-value="723" data-max="1000" data-label="value" data-level="5"></div>
```

## Options

| Attribute | On | Values | Default |
|---|---|---|---|
| `data-value` | `.sc-level` | number (≤ 3 digits) | required |
| `data-size` | `.sc-level` | `sm` `md` `lg` (32 / 46 / 64 px) | `md` |
| `data-level` | `.sc-progress` | number | none; badge overlaps the bar's left end (min 30px) |

The runtime adds the image, the number and `aria-label="Level 5"`.

## JavaScript

```js
SC.setValue(levelBadge, 6);   // update + pop (only when the value changes)
xpBar.dataset.level = '6';    // update the badge on an XP bar
SC.setValue(xpBar, 0);        // reset the bar after a level-up
```

## Rules for AI agents

- Use for player level (top bar, results XP bar) and hero/item levels.
- On a bar, don't also set `data-icon`; the badge takes the left end.
- Pop only on real level-ups.
