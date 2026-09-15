# Super Casual UI Kit — AI guide (for Pixelfork and any AI)

Chunky, glossy mobile game UI for hyper-casual / casual 2D and 3D web games. Plain HTML + CSS + one script, floating over the game canvas (any engine).
**No install.** Add 2 lines, write HTML tags, call `SC.*`.

## 1. Add the kit (2 lines)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/advme/mobile-game-ui-library@v0.42.0-A/super-casual/dist/kit.css">
<script src="https://cdn.jsdelivr.net/gh/advme/mobile-game-ui-library@v0.42.0-A/super-casual/dist/kit.js"></script>
```
Icons load automatically from the same place. (Offline/own copy: download `super-casual/dist/` and point the 2 lines at it.)

## 2. Game page pattern

```html
<canvas id="game"></canvas>                         <!-- your engine draws here -->

<div class="sc-screen" id="menu" data-backdrop="dim"> <!-- a full-page UI layer that fits any phone -->
  <div class="sc-screen-top">…</div>
  <div class="sc-screen-middle">…</div>
  <div class="sc-screen-bottom">…</div>
</div>

<div class="sc-screen" id="hud" hidden>              <!-- HUD: no backdrop, taps reach the game -->
  <div class="sc-screen-top">…</div>
</div>

<div class="sc-popup" id="pause" data-title="PAUSED" hidden>…</div>   <!-- popups outside screens -->
```
- Switch screens: `SC.screen.show('hud')`, `SC.screen.hide('menu')`. Popups: `SC.popup.open('pause')`, `SC.popup.close('pause')`.
- Update UI from the game: `SC.setValue(el, 120)` (counters, progress, stars, slots, level), `SC.float('+10', event)`, `SC.toast('Not enough coins!', {kind:'error'})`.
- Listen to the UI: normal `click`, plus `change` (toggle, slider, checkbox, tabs), `buy` (shop card), `done` (timer, loading), `star` (progress), `profile` (top bar).
- Design size is 400×870 portrait. Screens and popups scale to any phone or tablet automatically (tested 320×568 up to iPad Pro and desktop); small text never drops below a readable size. Never make the page scroll; keep text short. Landscape works but is small — the kit is made for portrait games.

## 3. Complete minimal game (copy, then replace the stand-in game)

A working example: https://advme.github.io/mobile-game-ui-library/templates/cdn-game.html
Source: `templates/cdn-game.html` in this repo.

## 4. Components (write the tag, the runtime builds the rest)

| Component | Use for | HTML | Events / JS |
|---|---|---|---|
| **Button** | Any action the player taps: play, retry, claim, buy, confirm, cancel. | `<button class="sc-button" data-color="green">Play</button>` | js: SC.setLabel(el, text) · SC.setIcon(el, name) · SC.setBadge(el, count, color?) |
| **Icon Button** | Pause, close, settings, back/next arrows, menu shortcuts (Daily, Mail, Shop). | `<button class="sc-icon-button" data-icon="pause" aria-label="Pause"></button>` | js: SC.setIcon(el, name) · SC.setBadge(el, count, color?) |
| **Resource Counter** | Showing coins, gems, energy, lives, tickets — usually top-right of the HUD or home screen. | `<div class="sc-counter" data-icon="coin" data-value="350"></div>` | events: plus js: SC.setValue(el, value, { animate }) · SC.format(n, "short") |
| **Reward Slot** | Rewards, prizes, loot, shop contents, level requirements. | `<div class="sc-slot" data-icon="gem" data-count="300" data-color="purple"></div>` | js: SC.setValue(el, count) · SC.popIn(elements, { stagger, delay }) · SC.setBadge(el, count, color?) |
| **Popup** | Confirmations, level start info, pause menu, downloads, purchase confirm, any modal over the game. | `<div class="sc-popup" id="exit" data-color="purple" data-title="Exit Game" hidden> <p class="sc-popup-message">Do you really want to exit the game?</p> <div class="sc-popup-actions"> <button class="sc-button" data-col…` | events: open, close js: SC.popup.open(id) · SC.popup.close(id) · SC.popup.toggle(id) |
| **Progress Bar** | XP, level score, health, energy, loading, timers. | `<div class="sc-progress" data-value="72" data-color="green" data-label="percent"></div>` | events: star js: SC.setValue(el, value) |
| **Screen Title** | Result and event screens: CLEAR!, FAILED, LEVEL UP, NEW RECORD, PAUSED. | `<h1 class="sc-title" data-color="gold" data-animate="drop">CLEAR!</h1>` | js: SC.setLabel(el, text) · SC.replay(el) |
| **Star Rating** | Level results, level select buttons, item quality, ratings. | `<div class="sc-stars" data-value="2" data-layout="arc" data-size="lg" data-animate></div>` | events: star js: SC.setValue(el, value) |
| **Countdown Timer** | Continue offers, level time limits, energy refills, limited-time events. | `<div class="sc-timer" data-seconds="5" data-warn="3"></div>` | events: tick, done js: SC.timer.start(el) · SC.timer.pause(el) · SC.timer.reset(el, seconds?) |
| **Floating Text** | Points, coins, damage, healing, XP, combos — anywhere the player needs instant feedback. | `canvas.addEventListener('pointerdown', e => SC.float('+50', e));` | js: SC.float(text, target, { color, size, icon, style }) |
| **Count Bubble** | Booster stock, unread messages or available rewards on an existing component. | `<button class="sc-icon-button" data-icon="key" data-badge="3" aria-label="Key booster, 3 available"></button>` | js: SC.setBadge(el, count, color?) |
| **Screen Shell** | The root of every full-page UI: gameplay HUD, start, pause, success, fail, shop, settings, loading. | `<div class="sc-screen" data-backdrop="dim" id="win" hidden> <div class="sc-screen-top">…</div> <div class="sc-screen-middle">…</div> <div class="sc-screen-bottom">…</div> </div>` | events: show, hide js: SC.screen.show(el|id) · SC.screen.hide(el|id) · SC.screen.fit() |
| **Toggle** | Binary settings that take effect immediately, such as sound, music and vibration. | `<button class="sc-toggle" data-checked aria-label="Sound"></button>` | js: SC.setChecked(el, boolean, {emit?}) · SC.toggle.get(el) · SC.toggle.set(el, boolean, {emit?}) |
| **Slider** | Sound/music volume, sensitivity, brightness, difficulty levels. | `<div class="sc-slider" data-value="70" data-label="percent" aria-label="Music"></div>` | events: input, change js: SC.slider.get(el) · SC.slider.set(el, value, {emit?}) |
| **Checkbox** | Choices listed together or confirmed later: don't show again, terms, mission checklists. | `<button class="sc-checkbox" data-checked>Don't show again</button>` | events: change js: SC.checkbox.get(el) · SC.checkbox.set(el, boolean, {emit?}) · SC.checkbox.toggle(el, {emit?}) |
| **Tabs** | Switching lists inside a popup or screen: Daily/Weekly, Coins/Gems, Friends/Global, Skins/Items. | `<div class="sc-tabs" data-value="daily"> <button data-value="daily">Daily</button> <button data-value="weekly">Weekly</button> </div>` | events: change js: SC.tabs.get(el) · SC.tabs.set(el, value, {emit?}) |
| **Bottom Tab Bar** | Main navigation between home-level screens (Shop, Chests, Play, Rank, Settings). Never during gameplay. | `<div class="sc-screen-bottom"> <nav class="sc-tabbar" data-value="play"> <button data-value="shop" data-icon="cash">Shop</button> <button data-value="play" data-icon="star">Play</button> <button data-value="rank" data…` | events: change js: SC.tabbar.get(el) · SC.tabbar.set(el, value, {emit?}) |
| **Tag Ribbon** | Highlight a new, hot, discounted or boosted item. | `<button class="sc-button" data-color="yellow" data-tag="HOT">Shop</button>` | js: el.dataset.tag = 'SALE' |
| **Title Banner Ribbon** | NEW SKIN!, SEASON RESULT, LEVEL UP, BIG WIN above a reveal or result. | `<div class="sc-banner" data-color="pink" data-animate="unfurl">NEW SKIN!</div>` | js: SC.setLabel(el, text) · SC.replay(el) |
| **Hint Bubble** | Info explanations, item effects, tutorial steps. | `<button class="sc-icon-button" data-icon="info" data-hint="Win 3 levels to unlock" aria-label="Info"></button>` | js: SC.hint.show(target, text, {pos, duration}) · SC.hint.hide(target?) |
| **Toast Message** | Feedback for an action: not enough coins, saved, purchase complete, +1 life. | `SC.toast('Not enough coins!', { kind: 'error', icon: 'coin' });` | js: SC.toast(text, {kind, icon, duration, pos}) |
| **Item Row** | Lists: daily missions, achievements, leaderboards, friends, inbox. | `<div class="sc-row" data-color="yellow"> <div class="sc-slot" data-icon="coin" data-count="500" data-size="sm" data-color="white"></div> <div class="sc-row-body"> <span class="sc-row-title">Win 3 levels</span> <div cl…` | js: SC.setLabel(part, text) |
| **Loading Bar** | Game start while assets load. | `<div class="sc-screen" data-backdrop="solid" id="loadingScreen"> <div class="sc-screen-middle"><h1 class="sc-title" data-color="gold">MY GAME</h1></div> <div class="sc-screen-bottom"><div class="sc-loading" id="loader…` | events: done js: SC.loading.set(el, pct) · SC.loading.done(el) |
| **Notification Dot** | New mail, free reward available, unlocked item, unseen tab. | `<button class="sc-icon-button" data-icon="mail" data-alert aria-label="Mail, new"></button>` | js: SC.setAlert(el, true|false|'dot') |
| **Level Badge** | Player level, hero/item level, XP bars. | `<span class="sc-level" data-value="5"></span>` | js: SC.setValue(level, n) |
| **Top Bar** | Top of home/menu screens. | `<div class="sc-topbar" data-name="Player" data-level="12"> <div class="sc-counter" data-icon="coin" data-value="349810" data-format="short" data-size="sm"></div> <div class="sc-counter" data-icon="gem" data-value="120…` | events: profile js: topbar.dataset.level = '13' · topbar.dataset.name = 'X' |
| **Shop Card** | Shop screens and offer popups: currency packs, lives, chests, boosters. | `<div class="sc-shopcard" data-icon="gem-pile" data-amount="500" data-price="$4.99" data-color="purple" data-tag="BEST"></div>` | events: buy js: card.dataset.state = 'sold' |
| **Tutorial Hand** | First-time tutorials and gameplay gesture hints. | `await SC.tutorial.point(playBtn, { text: 'Tap Play!' }); await SC.tutorial.point(gift, { text: 'Open your gift' });` | js: await SC.tutorial.point(target, {gesture, to, text, spotlight, once}) · SC.tutorial.clear() · SC.tutorial.active |

Colors: `data-color` = sky, blue, dark, green, yellow, orange, red, purple, pink, mint. Sizes: `data-size` = sm, md, lg.
Attach to buttons/slots/tabs: `data-badge="3"` (count), `data-alert` (red "!"), `data-tag="NEW"` (sticker).

## 5. Ready screens to copy (view on desktop with phone frames)

| Block | Use for | Live page (view source to copy) |
|---|---|---|
| Gameplay HUD | Any level-based or score-based game while playing. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/hud.html |
| Success | After the player wins a level. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/success.html |
| Fail | When the player loses a level. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/fail.html |
| Pause | When the player pauses during a level. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/pause.html |
| Start | Main menu of casual games with meta features. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/start.html |
| Reward Reveal | Opening chests, unlocking skins/characters, big rewards. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/reward.html |
| Daily Reward | Retention: daily login rewards. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/daily.html |
| Settings | Game settings from the menu or pause screen. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/settings.html |
| Shop | In-game store for currency packs and items. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/shop.html |
| Loading | Game start while assets load. | https://advme.github.io/mobile-game-ui-library/super-casual/kit/blocks/loading.html |

## 6. Icons and your own pictures

Kit icons by name (`data-icon="coin"`): arrow-right, back, calendar, cash, chat, check, chest, close, clover, coin, crown, crystal-ball, energy, gem, gift, heart, heart-empty, info, key, lock, mail, medal, pause, ruby, search, settings, star, star-empty, ticket, trophy, video, arrow-left, home, shop, helmet, play, sound, sound-off, music, music-off, menu, restart, alert, level-badge, hand, avatar, gem-pile, coin-pile.
Your own picture: `data-icon="https://…/fox.png"` or a relative path. Re-theme a kit picture everywhere: `SC.setImage('coin', 'shell.png')`.
New pictures must be generated (never drawn in code) with the style prompt in `super-casual/kit/assets/IMAGE-PROMPTS.md`.

## 7. Rules for AI agents
1. Use only kit components + small layout CSS. No custom-styled buttons, panels or text.
2. Every full-page UI is one `.sc-screen`; one menu screen visible at a time; HUD has no backdrop.
3. Button labels 1–2 words; titles ≈8 letters; the page never scrolls.
4. Always wire: Play → hide menu, show HUD, start game · Pause → pause game, open popup · win → Success screen · lose → Fail screen.
5. Full details per component: https://advme.github.io/mobile-game-ui-library/super-casual/kit/docs/introduction.html · machine-readable: `https://cdn.jsdelivr.net/gh/advme/mobile-game-ui-library@v0.42.0-A/super-casual/dist/registry.json`
