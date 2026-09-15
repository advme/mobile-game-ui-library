# Blocks

Blocks are **complete, copy-paste game screens** built only from kit components, like shadcn "blocks".
AI agents should start a screen by copying the closest block, then change texts, icons, numbers and the game code.

**Device preview:** on a desktop computer, opening any block shows it inside `preview.html` with device frames (iPhone 17 Pro / Pro Max, Google Pixel 10 Pro, Samsung Galaxy S26 / S26 Ultra, iPhone SE, iPad Air, iPad Pro, Galaxy Tab S10), Rotate, and simulated notch / home-bar safe areas. On a phone or tablet the block opens directly and fills the real screen. The `<script src="preview.js">` line in each block is docs-only; **remove it when copying a block into a game.**

Rules for every block:
- One HTML file that works on its own: it loads `core.css`, the needed component CSS and `sc.js`.
- Uses only kit components plus a few lines of layout glue CSS. No new visual styles.
- Built on the Screen Shell (`.sc-screen`), so it fits any phone and never scrolls.
- Uses a stand-in canvas "game" where needed, marked "replace with your engine".
- Shows how the UI talks to the game (events and `SC.*` calls) in a short script.
- If you hide your own layout wrappers with `hidden`, add `[hidden] { display:none !important; }` to the glue (kit elements already respect `hidden`).

| Block | File | Use for |
|---|---|---|
| Gameplay HUD | `hud.html` | In-game overlay: pause, score/stars, coins, lives, timer, boosters + pause popup |
| Success | `success.html` | Level complete: CLEAR! title, stars, XP bar with level, rewards, Claim / x2 Claim, Home |
| Fail | `fail.html` | Level failed: FAILED title, "So close" progress, timed continue offer (video / gems), Retry, Give up |
| Pause | `pause.html` | Pause popup over the game: Sound / Music / Vibration toggles, Resume, Restart, Home |
| Start | `start.html` | Home screen: Top Bar, side shortcuts (daily, mail, settings, gift), title + PLAY, Bottom Tab Bar switching screens |
| Reward Reveal | `reward.html` | Chest opening: banner, shaking chest → new item pop with glow, rarity tag, reward slots, Collect |
| Daily Reward | `daily.html` | 7-day reward popup: claimed / TODAY / future days, big day-7 chest, Claim, next-reward countdown |
| Settings | `settings.html` | Settings popup: sound/music toggles + volume sliders, vibration, language tabs, notifications checkbox, support/privacy/restore |
| Shop | `shop.html` | Shop screen: wallet, timed starter offer row, Gems / Coins / Items tabs with Shop Card grids, buy handling |
| Loading | `loading.html` | Start-up: title + loading bar with tips → PLAY / tap to start → game HUD |
