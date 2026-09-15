# Toast Message

A short message that slides in at the top (or bottom) of the screen and disappears by itself: "Not enough coins!", "Saved", "+1 Life". A glossy pill with outlined kit text and an optional icon.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/toast/toast.css">
<script src="kit/sc.js"></script>
```

## Usage (JavaScript only)

```js
SC.toast('Not enough coins!', { kind: 'error', icon: 'coin' });
```

## Options

| Option | Values | Default | Notes |
|---|---|---|---|
| `kind` | `info` `success` `error` `reward` | `info` | Dark, green, red, gold. |
| `icon` | kit icon name | none | Left of the text. |
| `duration` | ms | `1800` | Minimum 600. |
| `pos` | `top` `bottom` | `top` | 12px + safe area from that edge. |

The top and bottom each show one toast at a time. New toasts wait in a queue: at most 3 wait, and a text that is already waiting isn't added again. Toasts sit above everything, never block taps, and are announced politely to screen readers.

## Rules for AI agents

- Keep it to 1–5 words. It gives feedback, not questions; anything the player must answer goes in a Popup.
- Kinds: `error` when an action fails, `success` when it worked, `reward` for small gains, `info` otherwise.
- Don't toast what the player already sees happen. Use `SC.float` next to the object instead.
- Use top by default; bottom only for messages about the bottom area.
- Never call it every frame.
