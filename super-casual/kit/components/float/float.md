# Floating Text

Quick feedback that floats up and fades where something happened: points, coins, damage, combos.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/float/float.css">
<script src="kit/sc.js"></script>
```

## Usage

JavaScript only. Call `SC.float()` when something happens. It removes itself.

```js
canvas.addEventListener('pointerdown', e => SC.float('+50', e));
```

## Options

```js
SC.float(text, target, { color, size, icon, style })
```

| Parameter | Values | Default | Notes |
|-----------|--------|---------|-------|
| `text`    | string | — | Required: `+50`, `MISS`, `COMBO!` |
| `target`  | pointer event · element · `{ x, y }` · `null` | screen center | Where it appears |
| `color`   | `white` `gold` `green` `red` `sky` `purple` | `white` | |
| `size`    | `sm` `md` `lg` | `md` | 18 / 26 / 38 px |
| `icon`    | icon name | — | Icon before the text |
| `style`   | `rise` `pop` | `rise` | `pop` = big bouncy hit |

## Examples

```js
SC.float('+50', event);                                         // at a tap
SC.float('+5', coinSprite, { icon: 'coin', color: 'gold' });    // over an element
SC.float('-25', { x: 180, y: 320 }, { color: 'red' });          // at coordinates
SC.float('PERFECT!', null, { size: 'lg', style: 'pop', color: 'gold' }); // screen center
```

For objects drawn on a canvas (Three.js, Phaser), convert the object's position to page pixels and pass `{ x, y }`.

## Rules for AI agents

- **Color meaning:** white = points · gold = coins · green = healing / bonus · red = damage / miss · sky = XP · purple = gems.
- **Show it where the action happened.** Pass the tap event, the element, or the object's screen position.
- **Keep text tiny:** numbers with + or −, or one word (MISS, PERFECT!).
- **`style: 'pop'` + `size: 'lg'`** only for special moments (combo, level up), not every point.
- **Pair with counters:** float "+5" with a coin icon, then `SC.setValue()` the coin counter.
