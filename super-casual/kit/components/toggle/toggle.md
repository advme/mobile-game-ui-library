# Toggle

A chunky ON/OFF switch for settings such as sound, music and vibration. The thumb slides right for ON and left for OFF. ON is green by default; OFF uses the muted dark palette.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/toggle/toggle.css">
<script src="kit/sc.js"></script>
```

No image assets or other components are required.

## Usage

```html
<button id="sound-toggle" class="sc-toggle" data-checked="true" aria-label="Sound"></button>
```

Use a native `<button>` with a stable accessible setting name. The runtime adds `type="button"`, `role="switch"`, `aria-checked` and the visual ON/OFF text. Do not build the inner markup or change `aria-checked` manually.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-checked` | Empty, `true`, `false` | Absent (OFF) | Bare `data-checked` or `data-checked="true"` means ON. Missing, `false` or other values mean OFF. |
| `data-color` | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `green` | ON color. OFF remains muted dark. |
| `data-size` | `sm` `md` `lg` | `md` | Width × height: 96×44 / 104×48 / 120×56 px. |
| `disabled` | Native boolean attribute | — | Blocks mouse, touch and keyboard activation; shows a grey switch. `disabled="false"` is still disabled: remove the attribute or use `.disabled = false`. |
| `aria-label` or `aria-labelledby` | Setting name or visible label ID | Required | Use a stable name such as Sound. Do not put ON/OFF in the accessible name. |

## Examples

```html
<!-- Sound starts ON -->
<button class="sc-toggle" data-checked="true" aria-label="Sound"></button>

<!-- Music starts OFF -->
<button class="sc-toggle" aria-label="Music"></button>

<!-- Small blue toggle -->
<button class="sc-toggle" data-size="sm" data-color="blue"
        data-checked="true" aria-label="Vibration"></button>

<!-- Unavailable option, preserving its saved ON state -->
<button class="sc-toggle" data-checked="true" disabled aria-label="Cloud saves"></button>

<!-- Visible outlined label; the switch carries the accessible name -->
<span class="sc-text" data-text="Music" aria-hidden="true">Music</span>
<button class="sc-toggle" aria-label="Music"></button>
```

## JavaScript

```js
const soundToggle = document.querySelector('#sound-toggle');

soundToggle.addEventListener('change', event => {
  game.audio.setEnabled(event.detail.checked); // game owns audio behavior and saving
});

SC.setChecked(soundToggle, true);                 // simple alias of SC.toggle.set
SC.toggle.get(soundToggle);                       // returns a boolean
SC.toggle.set(soundToggle, true);                 // set silently (e.g. restore saved preference)
SC.toggle.set(soundToggle, false, { emit: true }); // notify if the state actually changes
SC.toggle.toggle(soundToggle);                   // invert silently
SC.toggle.toggle(soundToggle, { emit: true });    // invert and notify

soundToggle.dataset.checked = 'true';            // automatically renders; no change event
soundToggle.removeAttribute('data-checked');      // returns to OFF silently
soundToggle.disabled = true;                     // disable interactions
soundToggle.disabled = false;                    // re-enable
```

`SC.setChecked` and `SC.toggle.set` require a JavaScript boolean, not the string `"false"`. Their optional `emit` defaults to `false`. Programmatic updates work even when disabled, so the game can restore preferences before enabling the control.

The bubbling `change` event carries `{ checked: boolean }` in `event.detail`. A user activation fires it once, after the visual state and `aria-checked` update. Initialization, direct attribute edits and default helper calls are silent; an unchanged value never fires an event.

Newly inserted toggles upgrade automatically. Use `SC.upgrade(container)` if immediate rendering is needed. Native buttons supply Tab focus plus Space/Enter activation. The toggle does not submit forms, create a form field, save preferences, or control audio by itself.

## Rules for AI agents

- Use for a persistent binary setting that takes effect immediately. Use ordinary Buttons for one-time actions.
- Always use `<button class="sc-toggle">` and supply `aria-label` or `aria-labelledby`. Keep the setting name unchanged when the state changes; assistive technology reads `aria-checked`.
- Put the setting name outside the switch. Do not add a `.sc-button` class or custom inner markup.
- Use `data-checked` / `SC.toggle` as the source of truth. Do not write `aria-checked` or use `.checked`, which belongs to checkbox inputs.
- Listen for `change` to apply and save the setting. Do not add your own click/key handler to invert the state: the runtime already does it.
- Keep one color convention per settings panel; green ON is the default. Use `data-color` instead of custom CSS palette overrides.
- Small is still 44px tall. Preserve the tap target and leave room for the focus outline.
- Use native `disabled` when unavailable. `aria-disabled` alone is not supported as an interaction lock.
- Do not use `SC.setLabel` for ON/OFF text or `SC.setIcon` on this component. No picture asset is needed.
- The runtime respects reduced-motion preferences. The game owns persistence and side effects.
