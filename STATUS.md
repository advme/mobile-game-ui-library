# STATUS

**Last updated:** 2026-09-15 · by **A (Claude)** · version **v0.38.1-A**

## Next task
**Final check: build a new screen with a fresh AI agent using only the kit.** Open a new AI session (Codex or Claude) with no history. Ask it to read `super-casual/kit/docs/introduction.html` + `registry.json` and build a small new screen (for example a "Level Select" map with locked levels and stars) in `kit/blocks/levels.html`. Write down everything that confused it, then fix the docs, manuals or registry. Also good next: a Level Select block and a Profile block.

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
| 7 | Daily Reward | `blocks/daily.html` | v0.35.0-A |
| 8 | Settings | `blocks/settings.html` | v0.36.0-A |
| 9 | Shop | `blocks/shop.html` | v0.37.0-A |
| 10 | Loading | `blocks/loading.html` | v0.38.0-A |

## Left — components (in this order)
_All components done._

## Left — blocks (full screens built ONLY from kit components)
_All blocks done._

## Left — other
- Image prompts: icons4 delivered (home, shop, helmet, play, sound, sound-off, music, music-off, menu, restart, alert, level-badge, hand, avatar, gem-pile, coin-pile). Nothing owed right now.
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it ← next
- Ideas after that: Level Select block (map of levels with stars/locks), Profile block, Leaderboard block, Settings inside Pause

## Links
- Repo is **private** (since v0.10.2-A), so GitHub Pages is off. Preview locally: `python3 tools/serve.py 8765` → http://localhost:8765/super-casual/kit/docs/button.html
