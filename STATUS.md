# STATUS

**Last updated:** 2026-09-15 · by **B (Codex / GPT)** · version **v0.11.0-B**

## Next task
**Convert Screen Shell.** Build the full-page mobile layout (top bar / centered middle / bottom bar), using the inline `fit()` in `super-casual/old-demos/success.html` as a reference. Keep screens scroll-free, with real 12px edge margins. Follow AGENTS.md §4.

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

## Left — components (in this order)
1. Screen Shell ← next (full-page mobile layout: top bar / centered middle / bottom bar, scales to any phone. Exists inline in `super-casual/old-demos/success.html` → `fit()`)
2. Toggle (ON / OFF)
3. Slider
4. Checkbox
5. Tabs (segmented)
6. Bottom Tab Bar
7. Top Bar (avatar, level, resources) 🖼 avatar image needed
8. Level Badge 🖼 badge image needed (placeholder in `super-casual/old-demos/success.html`)
9. Notification Dot 🖼 red "!" image needed
10. Tag Ribbon (NEW, HOT, BEST)
11. Title Banner Ribbon (NEW SKIN!)
12. Tooltip / Hint Bubble
13. Toast Message
14. Item Row (mission, leaderboard)
15. Shop Card 🖼 pack images needed
16. Loading Bar / Screen
17. Tutorial Hand 🖼 hand image needed

## Left — blocks (full screens built ONLY from kit components)
Gameplay HUD · Pause · Success · Fail (old versions exist in `super-casual/*.html`) · Start · Reward Reveal · Daily Reward · Settings · Shop · Loading

## Left — other
- Docs pages: Introduction, Installation
- Image prompts still owed to the owner: level badge, red "!" dot, tutorial hand, avatar, shop packs, sound/music/home/restart/menu icons
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it

## Links
- Repo is **private** (since v0.10.2-A), so GitHub Pages is off. Preview locally: `python3 tools/serve.py 8765` → http://localhost:8765/super-casual/kit/docs/button.html
