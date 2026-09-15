# Notification Dot

A small red "!" (the kit `alert` icon) or a plain red dot on the top-right corner of a button, icon button, slot, tab or tab bar item. It means "something new here": new mail, a free reward, an unlocked skin. It pops in and gently pulses.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/alert/alert.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<button class="sc-icon-button" data-icon="mail" data-alert aria-label="Mail, new"></button>
<button class="sc-button" data-alert="dot">Shop</button>
<span class="sc-alert"></span>  <!-- standalone, inline -->
```

## Options

| Attribute | Values | Notes |
|---|---|---|
| `data-alert` | bare / `icon` | Red "!" icon. |
| `data-alert` | `dot` | Small plain red dot (quieter). |
| `data-alert` | `false` or absent | None. |

Hosts: `.sc-button`, `.sc-icon-button`, `.sc-slot`, tab buttons, tab bar items. On tab bar items it sits on the icon corner. It can be combined with `data-tag` on the same host.

## JavaScript

```js
SC.setAlert(el, true);   // "!" icon
SC.setAlert(el, 'dot');  // dot
SC.setAlert(el, false);  // remove
```

## Rules for AI agents

- An alert means something new, with no number. For counts use Count Bubble (`data-badge`), and never put both on one element.
- Clear it as soon as the player opens that thing.
- Show at most 2–3 alerts per screen. Use `dot` for secondary places like settings or profile.
- The marker is hidden from screen readers, so update the host's `aria-label` (e.g. "Mail, new").
