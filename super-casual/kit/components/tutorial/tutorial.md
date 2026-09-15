# Tutorial Hand

An animated pointing hand (kit `hand` icon) that shows the player what to do: tap here, swipe, drag this there. It can add a Hint Bubble and a spotlight that dims the screen with a rounded hole, so only the target can be tapped.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/tutorial/tutorial.css">
<link rel="stylesheet" href="kit/components/hint/hint.css">  <!-- for text -->
<script src="kit/sc.js"></script>
```

## Usage (JavaScript only)

```js
// Step by step: each point() resolves true when the player taps the target
await SC.tutorial.point(playButton, { text: 'Tap Play!' });
await SC.tutorial.point(giftSlot, { text: 'Open your gift' });

// Gameplay gestures: no spotlight, so the game stays playable
SC.tutorial.point(player, { gesture: 'swipe-up', spotlight: false, once: false });
SC.tutorial.point(gem, { gesture: 'drag', to: slot, spotlight: false, once: false });
SC.tutorial.clear();
```

## Options

| Option | Values | Default | Notes |
|---|---|---|---|
| `gesture` | `tap` `swipe-up` `swipe-down` `swipe-left` `swipe-right` `drag` | `tap` | `tap` also shows a ripple ring. |
| `to` | element or id | | Destination for `drag`. |
| `text` | string | | Hint Bubble above the target. |
| `spotlight` | boolean | `true` | Dims everything except the target, and blocks taps outside it. |
| `once` | boolean | `true` | Clears when the target is tapped. |

The hand follows the target if it moves. Only one tutorial shows at a time: a new `point()` replaces the old one, whose promise resolves `false`, and `clear()` also resolves `false`. `SC.tutorial.active` is true while one is showing.

## Rules for AI agents

- Show one step at a time and await each `point()`.
- Use the spotlight for menu steps. Turn it off for gameplay gestures.
- Keep hint text to about 6 words, action first ("Tap to jump!").
- Show tutorials only the first time, and save progress.
- For gameplay swipes, point at a large element (character or play area).
