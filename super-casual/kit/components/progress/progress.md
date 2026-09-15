# Progress Bar

Shows progress toward a goal: XP, level progress, health, loading. Optional icon on the left end and star markers.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/progress/progress.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-progress" data-value="72" data-color="green" data-label="percent"></div>
```

The bar builds itself from its attributes and stretches to the width of its container.

## Options

| Attribute    | Values | Default | Notes |
|--------------|--------|---------|-------|
| `data-value` | number | — | Required |
| `data-max`   | number | `100` | |
| `data-label` | `percent` `value` or any text | — | `percent` → "72%", `value` → "723 / 1000". Hidden on `sm` and when stars are shown |
| `data-color` | `blue` `sky` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `blue` | Fill color |
| `data-size`  | `sm` `md` `lg` | `md` | 14 / 24 / 32 px tall |
| `data-icon`  | icon name | — | Icon on the left end |
| `data-stars` | e.g. `"33,66,100"` | — | Star markers at percent positions |

## Examples

```html
<!-- Health -->
<div class="sc-progress" data-icon="heart" data-value="85" data-color="green"></div>

<!-- XP -->
<div class="sc-progress" data-icon="star" data-value="723" data-max="1000" data-label="value"></div>

<!-- Level score toward 3 stars (gameplay HUD) -->
<div class="sc-progress" data-value="0" data-max="3000" data-stars="33,66,100" data-color="green"></div>
```

## JavaScript

```js
SC.setValue(xpBar, 850);                                     // animated fill + label
bar.addEventListener('star', e => playSound(e.detail.index)); // a star lit up
```

## Rules for AI agents

- **Color meaning:** green = health / level progress · blue = XP · orange = timers, loading · red = low health or danger · yellow = max / complete.
- **Health:** `data-icon="heart"` with green. Switch `data-color` to `red` below 25%.
- **Level goals:** `data-stars="33,66,100"` in the gameplay HUD, no label.
- **XP:** `data-label="value"` so the player sees exact numbers.
- **Always update with `SC.setValue()`** so the fill animates.
- **Width comes from the container.** Put the bar inside a sized element.
