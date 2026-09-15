# STATUS

**Last updated:** 2026-09-15 · by **A (Claude)** · version **v0.10.1-A**

## Next task
**Convert Count Bubble.** It's the small round number badge on the corner of buttons and slots (e.g. "2" on booster buttons in `super-casual/old-demos/hud.html`). Target API: `data-badge="3"` on any `.sc-button`, `.sc-icon-button` or `.sc-slot` shows the bubble (blue by default, `data-badge-color="red"` optional). Follow AGENTS.md §4.

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

## Left — components (in this order)
1. Count Bubble ← next
2. Screen Shell (full-page mobile layout: top bar / centered middle / bottom bar, scales to any phone. Exists inline in `super-casual/old-demos/success.html` → `fit()`)
3. Toggle (ON / OFF)
4. Slider
5. Checkbox
6. Tabs (segmented)
7. Bottom Tab Bar
8. Top Bar (avatar, level, resources) 🖼 avatar image needed
9. Level Badge 🖼 badge image needed (placeholder in `super-casual/old-demos/success.html`)
10. Notification Dot 🖼 red "!" image needed
11. Tag Ribbon (NEW, HOT, BEST)
12. Title Banner Ribbon (NEW SKIN!)
13. Tooltip / Hint Bubble
14. Toast Message
15. Item Row (mission, leaderboard)
16. Shop Card 🖼 pack images needed
17. Loading Bar / Screen
18. Tutorial Hand 🖼 hand image needed

## Left — blocks (full screens built ONLY from kit components)
Gameplay HUD · Pause · Success · Fail (old versions exist in `super-casual/*.html`) · Start · Reward Reveal · Daily Reward · Settings · Shop · Loading

## Left — other
- Docs pages: Introduction, Installation
- Image prompts still owed to the owner: level badge, red "!" dot, tutorial hand, avatar, shop packs, sound/music/home/restart/menu icons
- Final: let a fresh AI agent build a screen using only the kit, then fix what confuses it

## Links
- Live site: https://advme.github.io/mobile-game-ui-library/
- Kit docs: https://advme.github.io/mobile-game-ui-library/super-casual/kit/docs/button.html
