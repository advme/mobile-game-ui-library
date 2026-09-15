# Tabs

A row of 2–4 tabs where exactly one is selected: Daily / Weekly, Skins / Items, Friends / Global. The selected tab is glossy (blue by default); the others are muted dark purple. Tabs can show and hide content panels for you.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/tabs/tabs.css">
<!-- only if a tab uses data-badge -->
<link rel="stylesheet" href="kit/components/bubble/bubble.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-tabs" data-value="daily">
  <button data-value="daily">Daily</button>
  <button data-value="weekly">Weekly</button>
</div>
```

Write plain `<button data-value>` elements directly inside `.sc-tabs`. The runtime adds `.sc-tab`, `type="button"`, `role="tablist"/"tab"`, `aria-selected`, roving `tabindex`, outlined text and icons.

## Options

On `.sc-tabs`:

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-value` | a tab's value | first enabled tab | Selected tab. Invalid values fall back to the first enabled tab. |
| `data-color` | `sky` `blue` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `blue` | Selected tab color. |
| `data-size` | `sm` `md` `lg` | `md` | 36 / 46 / 56 px tall. |

On each tab `<button>`:

| Attribute | Values | Notes |
|---|---|---|
| `data-value` | text | Required, unique in the group. |
| `data-icon` | kit icon name | Icon before the text. |
| `data-panel` | element id | That element is shown only while the tab is selected (`hidden` otherwise). |
| `data-badge` / `data-badge-color` | number / color | Count bubble on the tab corner. |
| `disabled` | boolean | Cannot be selected; skipped by arrow keys. |

## Examples

```html
<!-- Icons + panels -->
<div class="sc-tabs" data-value="coins">
  <button data-value="coins" data-icon="coin" data-panel="coinList">Coins</button>
  <button data-value="gems" data-icon="gem" data-panel="gemList">Gems</button>
</div>
<div id="coinList">…</div>
<div id="gemList" hidden>…</div>

<!-- New items badge, locked tab -->
<div class="sc-tabs" data-color="purple">
  <button data-value="inbox" data-icon="mail" data-badge="5" data-badge-color="red">Inbox</button>
  <button data-value="vip" data-icon="lock" disabled>VIP</button>
</div>
```

## JavaScript

```js
tabs.addEventListener('change', e => showList(e.detail.value)); // user picked another tab (click, Left/Right, Home/End)

SC.tabs.get(tabs);                           // → 'daily'
SC.tabs.set(tabs, 'weekly');                 // silent; returns false for unknown/disabled values
SC.tabs.set(tabs, 'weekly', { emit: true }); // fires change if it changed
tabs.dataset.value = 'weekly';               // attribute also works (silent)
```

## Rules for AI agents

- Use 2–4 tabs with 1-word labels. For the main screens at the bottom of the phone, use Bottom Tab Bar.
- Tabs are plain `<button data-value>` elements directly inside `.sc-tabs`. Do not add classes, roles or click handlers yourself.
- Prefer `data-panel` for showing content. Otherwise listen for `change`.
- Place tabs full width at the top of a popup body or screen middle.
- Use `data-badge` (red) for new items on a tab.
