# Checkbox

A chunky tick box for yes/no choices that are listed together or confirmed later: "Don't show again", accepting terms, mission checklists. Unchecked is a dark inset box. Checked is a glossy colored box with the kit's white check icon.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/checkbox/checkbox.css">
<script src="kit/sc.js"></script>
```

Uses the `check` icon from `kit/assets` (loaded automatically).

## Usage

```html
<button class="sc-checkbox" data-checked>Don't show again</button>
```

Use a native `<button>`. Text inside becomes the outlined label on the right. The runtime adds `type="button"`, `role="checkbox"`, `aria-checked`, the box and the check icon. Do not build the inner markup.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-checked` | empty, `true`, `false` | absent (unchecked) | Bare or `true` = checked. |
| `data-color` | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `green` | Checked box color. |
| `data-size` | `sm` `md` `lg` | `md` | Box 28 / 36 / 46 px; label 16 / 20 / 24 px. |
| `disabled` | native boolean | | Keeps state, blocks taps and keys, greys out. |
| text inside | text | | Label. Without text, add `aria-label`. |

## Examples

```html
<button class="sc-checkbox" data-checked>Don't show again</button>
<button class="sc-checkbox" data-size="sm">Skip tutorial</button>
<button class="sc-checkbox" data-checked data-color="sky" aria-label="Mission 1 done"></button>
<button class="sc-checkbox" data-checked disabled>Already claimed</button>
```

## JavaScript

```js
box.addEventListener('change', e => save(e.detail.checked)); // one event per tap / Space / Enter

SC.checkbox.get(box);                          // boolean
SC.checkbox.set(box, true);                    // silent
SC.checkbox.set(box, false, { emit: true });   // fires change only if it changed
SC.checkbox.toggle(box);                       // invert silently
SC.setLabel(box, 'Never show again');          // change label text
box.dataset.checked = 'true';                  // attributes also work (silent)
```

`SC.checkbox.set` requires a real boolean and throws otherwise.

## Rules for AI agents

- Checkbox is for choices in a list or confirmed by a button. Use Toggle for settings that apply instantly.
- Always use a native `<button>`. Put the label as text inside, or use `aria-label` when there is no text.
- Listen for `change`. Never add your own click handler that flips the state.
- Use real booleans with `SC.checkbox.set`. Never hand-build the box or draw a check mark.
- Keep labels short (1–4 words).
