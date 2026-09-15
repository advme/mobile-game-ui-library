# Icon Button

A square or round button that shows only an icon: pause, close, settings, arrows. Add a label for home-screen shortcuts.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/icon-button/icon-button.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<button class="sc-icon-button" data-icon="pause" aria-label="Pause"></button>
```

Pick the icon by name with `data-icon`. `sc.js` loads it from `kit/assets` and centers it optically.

## Options

| Attribute      | Values | Default | Notes |
|----------------|--------|---------|-------|
| `data-icon`    | an icon name from `registry.json → icons` | — | `arrow-left` is `arrow-right` mirrored |
| `data-variant` | `glossy` `flat` `ring` | `glossy` | Visual style |
| `data-shape`   | `square` `round` | `square` | |
| `data-color`   | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `sky` | Glossy only |
| `data-size`    | `sm` `md` `lg` | `md` | 44 / 56 / 72 px |
| `aria-label`   | text | — | Required when there is no visible label |
| `disabled`     | boolean | — | Grey, not clickable |

**Label:** plain text inside the button puts a label under the icon: `<button class="sc-icon-button" data-variant="flat" data-size="lg" data-icon="calendar">Daily</button>`

## Examples

```html
<!-- Pause, top-left of gameplay -->
<button class="sc-icon-button" data-variant="ring" data-icon="pause" aria-label="Pause"></button>

<!-- Close, top-right of a popup -->
<button class="sc-icon-button" data-color="red" data-size="sm" data-icon="close" aria-label="Close"></button>

<!-- Round next arrow -->
<button class="sc-icon-button" data-shape="round" data-color="green" data-icon="arrow-right" aria-label="Next"></button>

<!-- Menu shortcut with label -->
<button class="sc-icon-button" data-variant="flat" data-size="lg" data-icon="trophy">Rank</button>
```

## JavaScript

```js
pauseButton.addEventListener('click', () => game.pause());
SC.setIcon(button, 'check');   // swap the icon
```

## Rules for AI agents

- **Pause** in gameplay: top-left, `data-variant="ring"` or glossy `sky`.
- **Close** on popups: glossy `red` + `data-icon="close"`, top-right.
- **Glossy** for important actions, **flat** for menus/navigation, **ring** over busy game scenes.
- **Always** add `aria-label` when there is no visible label.
- **Only** use icon names listed in `registry.json → icons`. Never invent icon names or draw icons with code.

## Corner count

Load `kit/components/bubble/bubble.css` and add `data-badge="3"` to this component. Optional `data-badge-color="red"` changes the blue default. Update with `SC.setBadge(el, count, color?)`; pass `null` to hide. See [Count Bubble](../bubble/bubble.md) for values, spacing and accessibility rules.
