# Button

A chunky, glossy game button with outlined 3D text. Use it for any action the player taps: start, retry, claim, buy, confirm.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/button/button.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<button class="sc-button" data-color="green">Play</button>
```

Write the label as plain text. `sc.js` turns it into the outlined 3D text automatically.

## Options

| Attribute    | Values                                                                 | Default | Notes |
|--------------|------------------------------------------------------------------------|---------|-------|
| `data-color` | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `sky`   | Button color and matching text outline |
| `data-size`  | `sm` `md` `lg`                                                         | `md`    | Height 52 / 64 / 76 px |
| `data-width` | `full`                                                                 | —       | Stretch to the container width |
| `data-icon`  | icon name (see `registry.json → icons`)                                | —       | Leading icon |
| `disabled`   | boolean attribute                                                      | —       | Grey and not clickable |

**Icon:** add `data-icon` with an icon name: `<button class="sc-button" data-color="green" data-icon="video">x2 Claim</button>`

## Examples

```html
<!-- Main call to action on a start screen -->
<button class="sc-button" data-color="yellow" data-size="lg">PLAY</button>

<!-- Two choices side by side in a popup -->
<button class="sc-button" data-color="dark" data-size="sm">No</button>
<button class="sc-button" data-color="green" data-size="sm">Yes</button>

<!-- Rewarded video -->
<button class="sc-button" data-color="green" data-icon="video">x2 Claim</button>

<!-- Full width inside a panel -->
<button class="sc-button" data-color="green" data-width="full">RESUME</button>

<!-- Not available yet -->
<button class="sc-button" data-color="purple" disabled>Locked</button>
```

## JavaScript

```js
button.addEventListener('click', () => startGame());   // normal DOM events
SC.setLabel(button, 'Claimed');                        // change the label (keeps the 3D text in sync)
SC.setIcon(button, 'check');                           // change the icon
button.disabled = true;                                 // disable
```

## Rules for AI agents

- **One `lg` button per screen** — it is the main action (PLAY, RETRY, CLAIM).
- **Color meaning:** `green` = positive / continue / rewarded video · `yellow` = main play action · `red` = destructive or quit · `dark` = cancel / secondary · `purple` = premium (gems) · `sky`/`blue` = neutral.
- **Popups** use `sm` or `md`. Two buttons side by side: secondary on the left, primary on the right.
- **Labels:** 1–2 words. Short labels read better on phones.
- **Never** restyle the button with custom CSS colors — pick a `data-color`.
- Buttons are HTML on top of the game canvas. Put UI in a layer above the canvas (see `examples/button-on-canvas.html`).
