# Top Bar

The top of a home/menu screen: the player's picture (framed kit icon) with a Level Badge and name on the left, and Resource Counters on the right. Tapping the player block fires `profile`.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/topbar/topbar.css">
<link rel="stylesheet" href="kit/components/level/level.css">
<link rel="stylesheet" href="kit/components/counter/counter.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-screen-top">
  <div class="sc-topbar" data-name="Player" data-level="12">
    <div class="sc-counter" data-icon="coin" data-value="349810" data-format="short" data-size="sm"></div>
    <div class="sc-counter" data-icon="gem" data-value="120" data-plus="purple" data-size="sm"></div>
  </div>
</div>
```

The runtime builds `.sc-topbar-player` (a button with avatar, level and name) and moves your counters into `.sc-topbar-res`. Counters added later also move to the right. Don't write the player block yourself.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-name` | text | none | Long names fade out; the name shrinks before the counters do. |
| `data-level` | number | none | Level Badge on the picture's corner. |
| `data-avatar` | kit icon | `avatar` | Picture. |
| children | 1–3 Resource Counters | | Right side. |

## JavaScript

```js
topbar.addEventListener('profile', openProfile);
topbar.dataset.level = '13';
topbar.dataset.name = 'NewName';
SC.setValue(topbar.querySelector('.sc-counter'), 1500);
```

## Rules for AI agents

- Only on home/menu screens, in `.sc-screen-top`. During gameplay, use plain counters + a pause button instead.
- Use `data-size="sm"` counters with `data-format="short"` for big numbers.
- Use at most 3 resources, or 2 when a name is shown.
- Open the profile or avatar picker on `profile`.
