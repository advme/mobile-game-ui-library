# Resource Counter

Shows how much of a resource the player has: coins, gems, energy, lives. Optional "+" button to get more.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/counter/counter.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-counter" data-icon="coin" data-value="350"></div>
```

The component builds itself from its attributes. Don't write inner HTML.

## Options

| Attribute     | Values | Default | Notes |
|---------------|--------|---------|-------|
| `data-icon`   | icon name (see `registry.json → icons`) | — | Required |
| `data-value`  | number | — | Required |
| `data-max`    | number | — | Shows `value/max` (energy, lives) |
| `data-plus`   | `sky` `blue` `green` `yellow` `orange` `red` `purple` `pink` `mint` | — | Adds a "+" button in this color |
| `data-format` | `full` `short` | `full` | `short`: 12500 → 12.5K |
| `data-size`   | `sm` `md` `lg` | `md` | |

## Examples

```html
<!-- Top-right HUD -->
<div class="sc-counter" data-icon="energy" data-value="5" data-max="5" data-plus="blue"></div>
<div class="sc-counter" data-icon="coin" data-value="349810" data-plus="orange"></div>
<div class="sc-counter" data-icon="gem" data-value="120" data-plus="purple"></div>

<!-- Compact big number -->
<div class="sc-counter" data-size="sm" data-icon="coin" data-value="12500" data-format="short"></div>
```

## JavaScript

```js
SC.setValue(coins, 350000);                     // animated count-up + bump
SC.setValue(coins, 350000, { animate: false }); // instant
coins.addEventListener('plus', () => openShop()); // "+" tapped
SC.format(12500, 'short');                       // "12.5K"
```

## Rules for AI agents

- **Placement:** top-right of the screen, 12px from the edges. Most important resource furthest right.
- **"+" color matches the resource:** coin → `orange`, gem → `purple`, energy → `blue`, cash/ticket → `green`.
- **Only add "+"** when tapping it opens a way to get more (shop, rewarded video).
- **Energy and lives** use `data-max`.
- **Use `data-format="short"`** when values can pass 100,000 on small screens.
- **Always update with `SC.setValue()`** so the player sees the change. Never edit the inner text directly.
