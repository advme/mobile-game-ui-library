# STATUS

**Last updated:** 2026-09-15 · by **A (Claude)** · version **v0.18.0-A**

## Next task
**Build Title Banner Ribbon.** The wide ribbon banner above a character or reward ("NEW SKIN!", "SEASON RESULT", "LEVEL UP"): a glossy colored band with folded tails on both ends, in outlined kit text. Code-made shape. Rounded free corners, no `clip-path: polygon()`; build tails from rounded, skewed pseudo-elements. Target API: `<div class="sc-banner" data-color="pink">NEW SKIN!</div>`, sizes and an entrance animation. Follow AGENTS.md §4.

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

## Left — components (in this order)
1. Title Banner Ribbon (NEW SKIN!) ← next
2. Tooltip / Hint Bubble
3. Toast Message
4. Item Row (mission, leaderboard)
5. Loading Bar / Screen
6. Top Bar (avatar, level, resources) 🖼 avatar image needed — waiting for `icons/icons4.png`
7. Level Badge 🖼 badge image needed (placeholder in `super-casual/old-demos/success.html`) — waiting for `icons/icons4.png`
8. Notification Dot 🖼 red "!" image needed — waiting for `icons/icons4.png`
9. Shop Card 🖼 pack images needed — waiting for `icons/icons4.png`
10. Tutorial Hand 🖼 hand image needed — waiting for `icons/icons4.png`

## Left — blocks (full screens built ONLY from kit components)
Gameplay HUD · Pause · Success · Fail (old versions exist in `super-casual/old-demos/`; build each block as one `.sc-screen`) · Start · Reward Reveal · Daily Reward · Settings · Shop · Loading

## Left — other
- Docs pages: Introduction, Installation
- Image prompts still owed to the owner: level badge, red "!" dot, tutorial hand, avatar, shop packs, sound/music/home/restart/menu icons
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it

## Links
- Repo is **private** (since v0.10.2-A), so GitHub Pages is off. Preview locally: `python3 tools/serve.py 8765` → http://localhost:8765/super-casual/kit/docs/button.html
