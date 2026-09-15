# Shop Card

A shop offer card: glossy colored card, pack picture (kit icon) with an amount, optional corner sticker and bonus line, and a green price button. Tapping the price fires `buy`.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/shopcard/shopcard.css">
<link rel="stylesheet" href="kit/components/button/button.css">
<link rel="stylesheet" href="kit/components/tag/tag.css">   <!-- for data-tag -->
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-shopcard" data-icon="gem-pile" data-amount="500" data-price="$4.99" data-color="purple" data-tag="BEST"></div>
<div class="sc-shopcard" data-icon="heart" data-amount="5" data-price="200" data-price-icon="coin" data-color="red"></div>
```

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-icon` | kit icon | required | `gem-pile`, `coin-pile`, `chest`, `gift`, … |
| `data-amount` | number | none | Shown as "x500". |
| `data-price` | text | required | "$4.99", "FREE", or a currency amount. |
| `data-price-icon` | `coin` `gem` | none | Currency icon on the button. |
| `data-bonus` | text | none | Small yellow line under the picture. |
| `data-color` | `sky` `blue` `green` `yellow` `orange` `red` `purple` `pink` | `blue` | |
| `data-tag` / `data-tag-color` | text / color | none | Corner sticker. |
| `data-state` | `sold` | none | Grey card, disabled "SOLD" button. |

Cards are 120px wide (set `width` to change).

## JavaScript

```js
shop.addEventListener('buy', e => {
  // e.target = card; e.detail = { price: '$4.99', currency: null } or { price: '400', currency: 'coin' }
});
card.dataset.state = 'sold';
```

## Rules for AI agents

- Put 2–3 cards per row inside a popup or shop screen. Use the same color for the same currency (yellow coins, purple gems).
- Use `gem-pile`/`coin-pile` for currency packs and other kit icons for items.
- Use at most one BEST and one discount tag per row.
- Always handle `buy`: check the balance, show `SC.toast` if short, then update counters.
- The game connects `buy` to the real store. Never fake a real-money purchase.
