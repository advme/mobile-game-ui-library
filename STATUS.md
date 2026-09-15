# STATUS

**Last updated:** 2026-09-15 · by **A (Claude)** · version **v0.12.0-A**

## Next task
**Convert Toggle (ON / OFF).** A chunky glossy switch for settings (sound, music, vibration). Target API: `<button class="sc-toggle" data-checked>` with a `change` event and `SC.setChecked(el, bool)`. If the owner has a reference, it is in `_archive/references/` (local only, inspiration only). Follow AGENTS.md §4.

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

## Left — components (in this order)
1. Toggle (ON / OFF) ← next
2. Slider
3. Checkbox
4. Tabs (segmented)
5. Bottom Tab Bar
6. Top Bar (avatar, level, resources) 🖼 avatar image needed
7. Level Badge 🖼 badge image needed (placeholder in `super-casual/old-demos/success.html`)
8. Notification Dot 🖼 red "!" image needed
9. Tag Ribbon (NEW, HOT, BEST)
10. Title Banner Ribbon (NEW SKIN!)
11. Tooltip / Hint Bubble
12. Toast Message
13. Item Row (mission, leaderboard)
14. Shop Card 🖼 pack images needed
15. Loading Bar / Screen
16. Tutorial Hand 🖼 hand image needed

## Left — blocks (full screens built ONLY from kit components)
Gameplay HUD · Pause · Success · Fail (old versions exist in `super-casual/old-demos/`; build each block as one `.sc-screen`) · Start · Reward Reveal · Daily Reward · Settings · Shop · Loading

## Left — other
- Docs pages: Introduction, Installation
- Image prompts still owed to the owner: level badge, red "!" dot, tutorial hand, avatar, shop packs, sound/music/home/restart/menu icons
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it

## Links
- Repo is **private** (since v0.10.2-A), so GitHub Pages is off. Preview locally: `python3 tools/serve.py 8765` → http://localhost:8765/super-casual/kit/docs/button.html
