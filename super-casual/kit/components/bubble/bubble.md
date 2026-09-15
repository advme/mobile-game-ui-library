# Count Bubble

A small glossy count on the top-right corner of a Button, Icon Button or Reward Slot. Use for booster stock, unread messages or available rewards.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<!-- Include the styles of each host you use. -->
<link rel="stylesheet" href="kit/components/icon-button/icon-button.css">
<link rel="stylesheet" href="kit/components/bubble/bubble.css">
<script src="kit/sc.js"></script>
```

For `.sc-button`, also load `components/button/button.css`; for `.sc-slot`, load `components/slot/slot.css`.

## Usage

```html
<button class="sc-icon-button" data-icon="key" data-badge="3"
        aria-label="Key booster, 3 available"></button>
```

The runtime builds `.sc-bubble` automatically. Use attributes on the host; do not create the bubble markup yourself.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-badge` | Non-negative safe integer | Hidden | 0 stays visible. Above 99 displays `99+`; the exact count is in the bubble's title. Missing, empty, negative, fractional or invalid values hide it. |
| `data-badge-color` | `sky` `blue` `dark` `green` `yellow` `orange` `red` `purple` `pink` `mint` | `blue` | Independent of the host's `data-color`. |

## Examples

```html
<!-- Blue stock count on a green action button -->
<button class="sc-button" data-color="green" data-badge="2">Claim</button>

<!-- Red unread count on a round icon button -->
<button class="sc-icon-button" data-icon="mail" data-shape="round"
        data-badge="125" data-badge-color="red" aria-label="Mail, 125 unread"></button>

<!-- Reward quantity is bottom-right; available rewards are top-right -->
<div class="sc-slot" data-icon="gift" data-count="100" data-badge="3"
     role="img" aria-label="3 gifts available, 100 per gift"></div>

<!-- Zero remains visible; disabling an action is a separate game decision -->
<button class="sc-icon-button" data-icon="key" data-badge="0" disabled
        aria-label="Key booster, none available"></button>
```

## JavaScript

```js
SC.setBadge(booster, 2);         // set count, keep current badge color
SC.setBadge(booster, 1, 'red');  // set count and color
SC.setBadge(booster, 0);         // show zero (does not disable the button)
SC.setBadge(booster, null);      // remove bubble, keep saved color

booster.dataset.badge = '3';             // direct attribute changes also work
booster.dataset.badgeColor = 'green';
booster.removeAttribute('data-badge');   // hide
booster.removeAttribute('data-badge-color'); // return to blue
```

Newly inserted hosts upgrade automatically. `SC.upgrade(container)` can be used for immediate rendering. `SC.setLabel` and `SC.setIcon` preserve the badge. There are no custom events: taps still go to the host. The game owns the count and decides when to decrement, disable or hide it.

## Rules for AI agents

- Use only on `.sc-button`, `.sc-icon-button` or `.sc-slot`, with both host and bubble CSS loaded.
- One bubble per host; let `sc.js` own its markup. Never replace it with an icon or generated artwork.
- Use blue for ordinary counts, red for attention. Set `data-badge-color`, not the host's `data-color`, to change the bubble.
- Leave at least 8px around the top and right of the host and avoid ancestor `overflow:hidden` clipping. Keep actual screen edge margins at 12px or more, including the bubble.
- The count bubble is top-right; the slot's reward quantity stays bottom-right. Avoid combining long slot tags with a bubble if they overlap.
- Keep meaningful `aria-label` text on icon-only buttons and slots in sync with the exact count; the runtime does not replace your accessible label.
- A zero count is visible. Explicitly remove `data-badge` to hide it, and disable the host separately when the action is unavailable.
