# Slider

A glossy track with a round white thumb for picking an amount: sound and music volume, sensitivity, brightness, difficulty. Drag or tap anywhere on it; arrow keys, Page Up/Down, Home and End also work.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/slider/slider.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<span class="sc-text" data-text="Music" aria-hidden="true">Music</span>
<div class="sc-slider" data-value="70" data-label="percent" aria-label="Music"></div>
```

The runtime builds the track, fill, thumb and optional value text, and keeps `role="slider"`, `tabindex` and `aria-valuemin/max/now/valuetext` in sync. Do not write the inner markup yourself.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-value` | number | `data-min` | Snapped to `data-step` and kept inside the range. |
| `data-min` | number | `0` | |
| `data-max` | number | `100` | |
| `data-step` | number | `1` | Decimals allowed (`0.5`). |
| `data-label` | `percent` `value` | none | Text on the right: `70%` or `70`. |
| `data-color` | `sky` `blue` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `sky` | Fill color. |
| `data-size` | `sm` `md` `lg` | `md` | Track 12 / 18 / 24 px, thumb 28 / 36 / 44 px. Touch area is at least 44px tall. |
| `data-icon` | kit icon name | none | Icon on the left. |
| `disabled` | boolean | | Ignores taps, drags and keys. Also disabled inside `<fieldset disabled>`. |
| `aria-label` | text | | Required setting name. |

## Examples

```html
<!-- Volume with percent -->
<div class="sc-slider" data-value="80" data-label="percent" aria-label="Sound"></div>

<!-- Difficulty 1–5 -->
<div class="sc-slider" data-min="1" data-max="5" data-value="3" data-label="value" data-color="orange" aria-label="Difficulty"></div>

<!-- Locked -->
<div class="sc-slider" data-value="50" disabled aria-label="Voice chat"></div>
```

## JavaScript

```js
music.addEventListener('input',  e => setVolume(e.detail.value));   // while dragging / each key press
music.addEventListener('change', e => saveSetting(e.detail.value)); // when the user lets go / each key press

SC.slider.get(music);                      // → 70
SC.slider.set(music, 0);                   // silent: restore saved settings without triggering saves
SC.slider.set(music, 100, { emit: true }); // also fires input + change
music.dataset.value = '40';                // attribute changes also re-render (silent)
```

`SC.slider.set` ignores invalid values (`'abc'`, `null`, `''`). Events only fire when the value actually changes.

## Rules for AI agents

- Use Slider for amounts. For ON/OFF use Toggle.
- Always add `aria-label` with the setting name, plus a visible text label next to the slider.
- Apply the value on `input` (e.g. live volume); save it on `change`.
- Restore saved values with `SC.slider.set(el, value)` (silent).
- Let the slider fill its row inside a popup or settings screen; keep it at least 160px wide.
- It works inside a scaled `.sc-screen`; do not compensate for scale.
- Sound/music icons are not in the kit yet. Use text labels until they are added.
