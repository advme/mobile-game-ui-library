# STATUS

**Last updated:** 2026-09-15 · by **A (Claude)** · version **v0.17.0-A**

## Next task
**Build Tag Ribbon.** Small labels that stick to a card/button/slot corner: NEW, HOT, BEST, SALE, -50%, x2. Code-made rounded label (like the slot BONUS tag: tight margins, attached corner sharp, free corners rounded) in kit colors, optional slight tilt. Target API: `data-tag="NEW"` + `data-tag-color` on buttons/slots/tabs, or standalone `<span class="sc-tag" data-color="red">HOT</span>`. The starburst BEST/HOT badges in the reference are image assets. Do not draw them; if wanted, add an image prompt to STATUS. Follow AGENTS.md §4. Skip Top Bar, Level Badge and Notification Dot until the owner delivers `icons/icons4.png` (prompt was given 2026-09-15: home, shop, helmet, play, sound on/off, music on/off, menu, restart, red ! dot, level shield, tutorial hand, avatar, gem pile, coin pile).

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

## Left — components (in this order)
1. Tag Ribbon (NEW, HOT, BEST) ← next
2. Title Banner Ribbon (NEW SKIN!)
3. Tooltip / Hint Bubble
4. Toast Message
5. Item Row (mission, leaderboard)
6. Loading Bar / Screen
7. Top Bar (avatar, level, resources) 🖼 avatar image needed — waiting for `icons/icons4.png`
8. Level Badge 🖼 badge image needed (placeholder in `super-casual/old-demos/success.html`) — waiting for `icons/icons4.png`
9. Notification Dot 🖼 red "!" image needed — waiting for `icons/icons4.png`
10. Shop Card 🖼 pack images needed — waiting for `icons/icons4.png`
11. Tutorial Hand 🖼 hand image needed — waiting for `icons/icons4.png`

## Left — blocks (full screens built ONLY from kit components)
Gameplay HUD · Pause · Success · Fail (old versions exist in `super-casual/old-demos/`; build each block as one `.sc-screen`) · Start · Reward Reveal · Daily Reward · Settings · Shop · Loading

## Left — other
- Docs pages: Introduction, Installation
- Image prompts still owed to the owner: level badge, red "!" dot, tutorial hand, avatar, shop packs, sound/music/home/restart/menu icons
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it

## Links
- Repo is **private** (since v0.10.2-A), so GitHub Pages is off. Preview locally: `python3 tools/serve.py 8765` → http://localhost:8765/super-casual/kit/docs/button.html
