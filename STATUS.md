# STATUS

**Last updated:** 2026-09-15 · by **A (Claude)** · version **v0.34.0-A**

## Next task
**Build the Daily Reward block** (`kit/blocks/daily.html`, add a row to `blocks/README.md`). A popup `DAILY REWARD` with a 7-day grid of Reward Slots (days 1–6 small, day 7 big `chest`), each with a "DAY n" label. Claimed days use `data-state="claimed"`, today's slot is highlighted (tag TODAY + Notification Dot), future days are dimmed, plus a Claim button and a countdown pill ("Next reward in" Countdown Timer, `data-format="long"`) after claiming. Update registry `blocks[]`, STATUS "Done — blocks", docs NAV "Blocks" group and CHANGELOG.

## In progress
_Nothing._

## Done — kit components (`super-casual/kit`)
| # | Component | Class | Version |
|---|-----------|-------|---------|
| 1 | Button | `.sc-button` | v0.1.0 |
| 2 | Icon Button | `.sc-icon-button` | v0.2.0 |
| 3 | Resource Counter | `.sc-counter` | v0.3.0 |
| 4 | Reward Slot | `.sc-slot` | v0.4.0 |
| 5 | Popup | `.sc-popup` | v0.5.0 |
| 6 | Progress Bar | `.sc-progress` | v0.6.0 |
| 7 | Screen Title | `.sc-title` | v0.7.0 |
| 8 | Star Rating | `.sc-stars` | v0.8.0 |
| 9 | Countdown Timer | `.sc-timer` | v0.9.0 |
| 10 | Floating Text | `SC.float()` | v0.10.0 |
| 11 | Count Bubble | `.sc-bubble` via `data-badge` | v0.11.0-B |
| 12 | Screen Shell | `.sc-screen` | v0.12.0-A |
| 13 | Toggle | `.sc-toggle` | v0.13.0-B |
| 14 | Slider | `.sc-slider` | v0.14.0-A |
| 15 | Checkbox | `.sc-checkbox` | v0.15.0-A |
| 16 | Tabs | `.sc-tabs` | v0.16.0-A |
| 17 | Bottom Tab Bar | `.sc-tabbar` | v0.17.0-A |
| 18 | Tag Ribbon | `.sc-tag / data-tag` | v0.18.0-A |
| 19 | Title Banner Ribbon | `.sc-banner` | v0.19.0-A |
| 20 | Hint Bubble | `.sc-hint / data-hint` | v0.20.0-A |
| 21 | Toast Message | `SC.toast()` | v0.21.0-A |
| 22 | Item Row | `.sc-row` | v0.22.0-A |
| 23 | Loading Bar | `.sc-loading` | v0.23.0-A |
| 24 | Notification Dot | `data-alert / .sc-alert` | v0.24.0-A |
| 25 | Level Badge | `.sc-level / data-level` | v0.25.0-A |
| 26 | Top Bar | `.sc-topbar` | v0.26.0-A |
| 27 | Shop Card | `.sc-shopcard` | v0.27.0-A |
| 28 | Tutorial Hand | `SC.tutorial` | v0.28.0-A |

## Done — blocks (`super-casual/kit/blocks`)
| # | Block | File | Version |
|---|-------|------|---------|
| 1 | Gameplay HUD | `blocks/hud.html` | v0.29.0-A |
| 2 | Success | `blocks/success.html` | v0.30.0-A |
| 3 | Fail | `blocks/fail.html` | v0.31.0-A |
| 4 | Pause | `blocks/pause.html` | v0.32.0-A |
| 5 | Start | `blocks/start.html` | v0.33.0-A |
| 6 | Reward Reveal | `blocks/reward.html` | v0.34.0-A |

## Left — components (in this order)
_All components done._

## Left — blocks (full screens built ONLY from kit components)
Daily Reward · Settings · Shop · Loading
(Old pre-kit versions of some screens: `super-casual/old-demos/`. Each block = one HTML file in `kit/blocks/` using only kit components + layout glue.)

## Left — other
- Docs pages: Introduction, Installation
- Image prompts: icons4 delivered (home, shop, helmet, play, sound, sound-off, music, music-off, menu, restart, alert, level-badge, hand, avatar, gem-pile, coin-pile). Nothing owed right now.
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it

## Links
- Repo is **private** (since v0.10.2-A), so GitHub Pages is off. Preview locally: `python3 tools/serve.py 8765` → http://localhost:8765/super-casual/kit/docs/button.html
