# Reward Slot

A colored card with an item icon and a count. Use it to show rewards, prizes, loot and item requirements.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/slot/slot.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-slot" data-icon="gem" data-count="300" data-color="purple"></div>
```

The slot builds itself from its attributes. Don't write inner HTML.

## Options

| Attribute     | Values | Default | Notes |
|---------------|--------|---------|-------|
| `data-icon`   | icon name (see `registry.json → icons`) | — | Required |
| `data-count`  | number | — | Shown bottom-right |
| `data-color`  | `white` `dark` `green` `sky` `purple` `yellow` `red` `lavender` | `dark` | Card color |
| `data-tag`    | short text | — | Label on the top edge: BONUS, NEW, HOT, x2 |
| `data-state`  | `claimed` `locked` | — | Dims the slot, adds a check or a lock |
| `data-format` | `full` `short` | `full` | `short`: 25000 → 25K |
| `data-size`   | `sm` `md` `lg` | `md` | 60 / 84 / 104 px |

## Examples

```html
<!-- Reward grid on a success screen -->
<div class="sc-slot" data-icon="coin" data-count="1000" data-color="white" data-tag="BONUS"></div>
<div class="sc-slot" data-icon="gift" data-count="1" data-color="dark"></div>
<div class="sc-slot" data-icon="clover" data-count="5" data-color="green"></div>
<div class="sc-slot" data-icon="gem" data-count="300" data-color="purple"></div>

<!-- Level requirements in a popup -->
<div class="sc-slot" data-size="sm" data-icon="key" data-count="3" data-color="sky"></div>
<div class="sc-slot" data-size="sm" data-icon="clover" data-color="green" data-state="claimed"></div>
<div class="sc-slot" data-size="sm" data-icon="chest" data-color="yellow" data-state="locked"></div>
```

## JavaScript

```js
SC.setValue(slot, 2000);                    // animate the count (e.g. after x2 Claim)
slot.dataset.state = 'claimed';             // mark as claimed
SC.popIn(grid.children, { stagger: 0.07 }); // reveal slots one after another
```

## Rules for AI agents

- **Rarity by color:** white/dark = common · green/sky = uncommon · purple = epic · yellow = legendary · red = special · lavender = premium.
- **Reward screens:** grid of 4 columns, `md` size, revealed with `SC.popIn()`.
- **Popups and rows:** `sm` size.
- **Tags:** one short word or `x2`, and at most one tagged slot per group.
- **`locked`** for rewards the player can't get yet, **`claimed`** after collecting.
- **Doubling rewards:** update with `SC.setValue()` so counts animate. Never edit inner text directly.

## Corner count

Load `kit/components/bubble/bubble.css` and add `data-badge="3"` to this component. Optional `data-badge-color="red"` changes the blue default. Update with `SC.setBadge(el, count, color?)`; pass `null` to hide. See [Count Bubble](../bubble/bubble.md) for values, spacing and accessibility rules.
