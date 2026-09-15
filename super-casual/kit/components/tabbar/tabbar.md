# Bottom Tab Bar

The main navigation bar at the bottom of a home/menu screen: Shop, Chests, Play, Rank, Settings. It's a dark navy bar with icons. The selected item rises on a glossy block (indigo by default) with a bigger icon and its name underneath. Items can carry count badges.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/screen/screen.css">
<link rel="stylesheet" href="kit/components/tabbar/tabbar.css">
<link rel="stylesheet" href="kit/components/bubble/bubble.css">  <!-- for data-badge -->
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-screen" id="menuBar">
  <div class="sc-screen-bottom">
    <nav class="sc-tabbar" data-value="play">
      <button data-value="shop" data-icon="cash" data-panel="shopScreen">Shop</button>
      <button data-value="play" data-icon="star" data-panel="playScreen">Play</button>
      <button data-value="rank" data-icon="trophy" data-panel="rankScreen">Rank</button>
    </nav>
  </div>
</div>
```

Inside `.sc-screen-bottom` the bar bleeds to the phone's left, right and bottom edges and pads the home-bar safe area itself. It uses the same runtime as Tabs: the runtime adds `.sc-tabbar-item`, roles, `aria-selected`, icons, labels and badges.

## Options

On `.sc-tabbar`:

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-value` | item value | first enabled item | Selected item. |
| `data-color` | `sky` `blue` `green` `yellow` `orange` `red` `purple` `pink` `mint` | indigo | Raised block color. |

On each `<button>`:

| Attribute | Notes |
|---|---|
| `data-value` | Required, unique. |
| `data-icon` | Required kit icon. |
| text | 1-word label, shown only under the selected item. |
| `data-panel` | Id of the screen shown only while this item is selected. |
| `data-badge` / `data-badge-color` | Count bubble on the icon. |
| `disabled` | Locked item. |

## JavaScript

```js
bar.addEventListener('change', e => openScreen(e.detail.value));
SC.tabbar.get(bar);                         // 'play'
SC.tabbar.set(bar, 'shop');                 // silent
SC.tabbar.set(bar, 'shop', { emit: true }); // fires change
SC.setBadge(bar.querySelector('[data-value="chests"]'), null); // clear a badge
```

`SC.tabbar` is the same object as `SC.tabs`. Left/Right/Home/End keys work.

## Rules for AI agents

- Only on home/menu screens, never during gameplay. Use 3–5 items with the main action (Play) in the middle.
- Put it in `.sc-screen-bottom` of its own always-visible `.sc-screen` layer, above the content screens in the DOM order. Do not add margins.
- Every item needs `data-icon` (kit icons only) and a 1-word label.
- Switch content with `data-panel` (screen ids) or listen for `change`.
- Use red badges for things to collect and green for good news. Clear a badge when the player opens that item.
