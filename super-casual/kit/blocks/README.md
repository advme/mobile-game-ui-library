# Blocks

Blocks are **complete, copy-paste game screens** built only from kit components, like shadcn "blocks".
AI agents should start a screen by copying the closest block, then change texts, icons, numbers and the game code.

Rules for every block:
- One HTML file that works on its own: it loads `core.css`, the needed component CSS and `sc.js`.
- Uses only kit components plus a few lines of layout glue CSS. No new visual styles.
- Built on the Screen Shell (`.sc-screen`), so it fits any phone and never scrolls.
- Uses a stand-in canvas "game" where needed, marked "replace with your engine".
- Shows how the UI talks to the game (events and `SC.*` calls) in a short script.

| Block | File | Use for |
|---|---|---|
| Gameplay HUD | `hud.html` | In-game overlay: pause, score/stars, coins, lives, timer, boosters + pause popup |
| Success | `success.html` | Level complete: CLEAR! title, stars, XP bar with level, rewards, Claim / x2 Claim, Home |
| Fail | `fail.html` | Level failed: FAILED title, "So close" progress, timed continue offer (video / gems), Retry, Give up |
