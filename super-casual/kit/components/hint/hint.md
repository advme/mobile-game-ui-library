# Tooltip / Hint Bubble

A white speech bubble with a dark outline and a small pointer that aims at something: info explanations, tutorial steps, "tap here" nudges.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/hint/hint.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<!-- Tap to show (hides after 2.5 s, on the next tap, or on a tap elsewhere) -->
<button class="sc-icon-button" data-icon="info" data-hint="Win 3 levels to unlock" aria-label="Info"></button>

<!-- Static bubble you place yourself -->
<span class="sc-hint" data-pos="bottom">Hint Text</span>
```

```js
// Tutorial step: stays until hidden
SC.hint.show(playButton, 'Tap Play to start!', { pos: 'top', duration: 0 });
playButton.addEventListener('click', () => SC.hint.hide(playButton));
```

Floating bubbles are placed next to the target, kept 12px inside the screen, and the pointer keeps aiming at the target. They scale with the target's Screen Shell and never block taps.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-hint` | text | | On any element: show on tap. |
| `data-hint-pos` | `top` `bottom` `left` `right` | `top` | Side the bubble appears on. |
| `.sc-hint` `data-pos` | `top` `bottom` `left` `right` | `top` | Static bubble: side it sits on (pointer faces the other way). |
| `.sc-hint` `data-size` | `sm` `md` | `md` | Text 12 / 15 px. |

## JavaScript

```js
SC.hint.show(target, text, { pos: 'top', duration: 2500 }); // target element or id; returns the bubble (or null)
SC.hint.hide(target);  // one
SC.hint.hide();        // all
```

One bubble per target; showing again replaces it. Bubbles created by `data-hint` taps close on a tap elsewhere; bubbles created from code only close by duration or `hide`.

## Rules for AI agents

- Keep hints to about 8 words. Longer text goes in a Popup.
- Use `data-hint` on info (i) buttons and on items whose effect isn't obvious.
- For tutorials, use `SC.hint.show(target, text, { duration: 0 })` and hide it when the player does the action. Show one tutorial hint at a time.
- Choose the side with the most free space (top by default).
