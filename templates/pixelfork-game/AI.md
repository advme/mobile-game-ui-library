# Pixelfork game template: instructions for the AI

This folder is the starting point for every new Pixelfork game. It is a complete, working mobile web game with the whole UI already wired.
**Copy it, then change it. Don't build UI from scratch.**

## 0. Set up
1. Copy `templates/pixelfork-game/` to the new game folder.
2. Copy `super-casual/dist/` into it as `kit/` (the template loads `kit/kit.css` and `kit/kit.js`).
   In this repo, `python3 tools/build_kit.py` does that for the template automatically.
3. Open `index.html` on a phone-size screen (375×812). It must load, show Start, and play.

## 1. What's inside `index.html`
| Part | What it is | What you change |
|---|---|---|
| Screens | Loading → Start → HUD → Success / Fail, plus Pause and Settings popups (kit components) | Texts, colors, icons; add/remove screens by copying from `super-casual/kit/blocks/` |
| **A. CONFIG** | Title, player name, level time, target score, rewards, image re-theming | Always |
| **B. Save data** | `localStorage` save (level, coins, sound, music) | Replace with the platform save API if there is one |
| **C. UI controller** | `UI.show`, `UI.onScore`, `UI.onWin`, `UI.onLose`, button wiring | Only if the game flow is different |
| **D. Stand-in game** | Tap-the-balls demo | **Replace with the real game**, keeping the interface below |
| **E. Boot** | Loading progress → Start | Report real asset loading progress |

## 2. The contract between the game and the UI
The real game must provide:
```js
Game.start(level)   Game.pause()   Game.resume()   Game.stop()   Game.setAudio(sound, music)   Game.score
```
and call back:
```js
UI.onScore(score, x, y)   // every point (x, y = screen position for the floating +1, optional)
UI.onWin(secondsLeft)     // level complete → stars + rewards + Success screen
UI.onLose(score)          // level failed → Fail screen
```
The UI already handles pause, time limit, stars, coins, saving, settings and screen switching.

## 3. Making it fit the game
- **Texts:** `CONFIG.title` (≈8 letters max), button labels, loading tips (`data-tips="tip|tip"`).
- **Colors:** `data-color` on components (see `kit/registry.json`). Keep one main color per game.
- **Icons:** use a kit icon name (`data-icon="gem"`). For the game's own picture use a path (`data-icon="images/fox.png"`).
- **Re-theme kit pictures:** `CONFIG.images = { coin: 'images/shell.png', avatar: 'images/fox-face.png' }`.
- **New pictures:** generate them with `kit/assets/IMAGE-PROMPTS.md` (always include the style block), save them to `images/`, and never draw them in code.
- **More screens** (Shop, Daily Reward, Reward Reveal…): copy the markup + script from `super-casual/kit/blocks/<name>.html` (leave out its docs-only `preview.js` line).
- **Component details:** `kit/registry.json`, or the manuals in `super-casual/kit/components/<name>/<name>.md`.

## 4. Rules
- Only kit components plus layout glue CSS. No new visual styles, no custom buttons.
- Every full-page UI is a `.sc-screen`. Popups go outside screens. Nothing may scroll.
- The HUD uses no backdrop, so taps reach the game.
- Keep the `Game`/`UI` contract names so the flow keeps working.
- Before finishing, check at 375×812: Loading → Start → Play → Pause/Resume → Win → Next → Lose → Home, with no overlaps and no console errors.
