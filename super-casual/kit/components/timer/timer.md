# Countdown Timer

Counts down and tells the game when time is up: continue offers, level clocks, energy refills, limited-time events.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/timer/timer.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<div class="sc-timer" data-seconds="5"></div>
```

The timer builds itself and starts counting as soon as it's on the page.

## Options

| Attribute        | Values | Default | Notes |
|------------------|--------|---------|-------|
| `data-seconds`   | number | — | Required. Duration |
| `data-variant`   | `ring` `pill` | `ring` | Circle or text clock |
| `data-color`     | `yellow` `green` `sky` `blue` `red` `purple` `orange` | `yellow` | Ring color |
| `data-size`      | `sm` `md` `lg` | `md` | Ring 36 / 48 / 72 px |
| `data-format`    | `clock` `long` | `clock` | Pill text: `01:23` or `14d 23h` |
| `data-icon`      | icon name | — | Icon on the left of a pill |
| `data-warn`      | seconds | — | Turns red and pulses when this few seconds are left |
| `data-autostart` | `false` | — | Wait for `SC.timer.start()` |

## Examples

```html
<!-- Continue offer on a fail screen -->
<div class="sc-timer" id="continueTimer" data-seconds="5" data-size="lg" data-warn="3"></div>

<!-- Level time limit in the HUD -->
<div class="sc-timer" data-variant="pill" data-seconds="90" data-warn="10"></div>

<!-- Energy refill -->
<div class="sc-timer" data-variant="pill" data-icon="energy" data-seconds="754"></div>

<!-- Event ending in days -->
<div class="sc-timer" data-variant="pill" data-format="long" data-icon="calendar" data-seconds="1292400"></div>
```

## JavaScript

```js
continueTimer.addEventListener('done', () => showRetry());      // time is up
continueTimer.addEventListener('tick', e => beep(e.detail.left)); // every second
SC.timer.start(t);     // start or resume
SC.timer.pause(t);     // pause
SC.timer.reset(t, 10); // restart (optionally with new seconds)
SC.timer.add(t, 5);    // add bonus time
```

## Rules for AI agents

- **Ring** for short decisions (continue offer, 3–10 s) with `data-warn="3"`.
- **Pill** for level clocks and refills. Use `data-format="long"` for events that last days.
- **Always handle the `done` event:** expire the offer, end the level, or refill.
- **Pause gameplay timers** when the game pauses (`SC.timer.pause`).
- **Level time limits** go top-center in the HUD, next to the score.
