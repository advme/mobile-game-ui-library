# CHANGELOG

Newest first. Format and version rules: see `AGENTS.md` §8 (A = Claude, B = Codex/GPT).

## v0.35.0-A — Daily Reward block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `kit/blocks/daily.html`: a menu calendar button with a Notification Dot opens a `DAILY REWARD` popup (DAY 3 sub-tag). The 7-day grid of Reward Slots is built from a data array: past days claimed, today white with a TODAY tag + alert, future days dimmed, and day 7 a wide chest slot. Claim floats the reward, counts coins up, re-renders today as claimed, starts a "19h 0m" next-reward pill timer and clears the menu alert. Kit fix: `core.css` now makes `[hidden]` always hide any `sc-*` element (component display styles used to override it), and the rule is added to AGENTS.md.
- Tested: Opened at 375×812. The popup fits, the timer is hidden before claiming, Claim adds 250 coins (1200 → 1450), day 3 becomes claimed, the timer shows and the alert clears. All 17 component test pages still pass with the core.css change.
- Notes for next agent: Blocks that render slots from data use `innerHTML`; the runtime upgrades the inserted slots automatically.

## v0.34.0-A — Reward Reveal block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `kit/blocks/reward.html`, a chest-opening reveal on a solid Screen Shell. Closed step: EPIC CHEST banner (drop) and a shaking `chest` with a pulsing glow, plus "Tap the chest to open". Tapping swaps to the NEW SKIN! banner (unfurl, same spot), pops the `helmet` item in, shows the name + EPIC tag and a row of 3 Reward Slots (popIn), floats EPIC!, and reveals Collect.
- Tested: Opened at 375×812. Both steps fit with no scroll, the tap switches the step, the banner/item/rewards animate, and Collect hides the screen.
- Notes for next agent: The glow and shake are block-local layout glue (tiny keyframes). If more blocks need them, promote them to a kit component instead of copying.

## v0.33.0-A — Start block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `kit/blocks/start.html`, the home/start screen. It has a Top Bar (avatar + level 12 + name, coins short format, gems with +), side flat icon-button shortcuts (Daily with Notification Dot, Mail with a red count bubble, Settings, Gift with a FREE tag), a gold title with the level name, and a big yellow PLAY. An always-visible Bottom Tab Bar layer switches Home / Shop / Rank screens via `data-panel` (the Shop alert clears when opened). PLAY hides the menu layers and shows a gameplay layer with a back-home button.
- Tested: Opened at 375×812. The title fits, and the side buttons, top bar and tab bar are inside the edges. Shop tab shows the shop screen and clears its alert, Home returns, PLAY hides menu + nav and shows the play layer, and back-home restores both.
- Notes for next agent: Keep game titles short (about 8 characters at the default Screen Title size) or the title touches the edges.

## v0.32.0-A — Pause block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `kit/blocks/pause.html`, a pause menu over a frozen stand-in game. A HUD pause button opens the `PAUSED` popup (LEVEL 12 sub-tag, static backdrop). It has quick settings in a panel (Sound/Music/Vibration Toggles with the new `sound`/`music` icons, right-aligned) and stacked Resume (lg green) / Restart (restart icon) / Home (home icon). Toggles fire `change` for the game to apply and save.
- Tested: Opened at 375×812. Toggles line up at the same right edge, the Vibration toggle switches ON, and Resume closes the popup and unfreezes the game.
- Notes for next agent: Rows inside `.sc-panel` need `align-self:stretch; width:100%` or they shrink to content.

## v0.31.0-A — Fail block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `kit/blocks/fail.html`, the level-failed screen over the game. It has a dim Screen Shell with a gem counter, `FAILED` red title (shake), empty arc stars, "So close!" with a 78% orange progress bar, and a timed continue offer: "Continue?" + ring timer (8 s, warn at 3). Revive by video or for 20 gems (toast if short), plus Retry (restart icon) and Give up buttons. The offer hides when the timer ends.
- Tested: Opened at 375×812. The layout fits with no scroll, the timer counts down and the offer hides at 0, and the gem check works.
- Notes for next agent: The continue offer uses `visibility:hidden` so the layout doesn't jump when it expires.

## v0.30.0-A — Success block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `kit/blocks/success.html`, the level-complete screen over the game. It has a dim Screen Shell with a coin counter, `CLEAR!` title (drop), an animated arc Star Rating, an XP bar with Level Badge that fills after the stars, a REWARDS divider and 4 Reward Slots popping in (`SC.popIn`), and Claim / x2 Claim (video icon) buttons plus a Home icon button. Claim floats +coins, counts the counter up, marks slots claimed and disables the buttons.
- Tested: Opened at 375×812. The layout matches the old demo, with everything inside the edges and no scroll. x2 Claim adds 1000 coins (1250 → 2250), all slots show claimed, and the buttons disable.
- Notes for next agent: The rewards grid is 4 columns of md slots (fits 400px). Use 3 columns or `data-size="sm"` slots for more rewards.

## v0.29.0-A — Gameplay HUD block
- Agent: A (Claude) · Date: 2026-09-15
- Done: Started Blocks. Added `kit/blocks/hud.html`, a complete in-game HUD built only from kit components over a stand-in canvas. Top row: pause, a star-marker score bar and coins. Second row: lives counter and timer pill. Boosters with count bubbles at the bottom. It also has a Pause popup that pauses/resumes the timer and restarts. Taps score, count coins up, float +10, and pop STAR! at markers. Added `blocks/README.md`, a `blocks` list in `registry.json`, a "Blocks" group in the docs menu, and a "Done — blocks" table in STATUS. AGENTS.md file map now lists `blocks/` and `tools/tests/`.
- Tested: Opened at 375×812. Taps update score/coins with floats, the star marker fires, boosters decrement their badges, Pause opens the popup and pauses the timer (00:58 held), Resume closes it. Nothing scrolls and there are no console errors from the page.
- Notes for next agent: Blocks are pages, not components: no test page, but check each at 375×812. Toasts cover the top bar in HUDs; use `SC.float(..., null, {style:'pop'})` for mid-screen celebrations instead.

## v0.28.0-A — Tutorial Hand component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `SC.tutorial.point(target, {gesture, to, text, spotlight, once})` → Promise and `SC.tutorial.clear()` / `SC.tutorial.active`. It shows the kit `hand` icon with its fingertip placed exactly on the target, a tap ripple, swipe (up/down/left/right) and drag-to-destination animations, and an optional Hint Bubble. The spotlight dims the screen with a rounded hole (box-shadow) and 4 transparent blockers, so only the target is tappable. It follows moving targets. Hint bubbles now render above the spotlight. Added the AI manual, registry item, docs page (live 3-step tutorial, gesture previews) and `tools/tests/tutorial.html`. This completes the component list.
- Tested: `tools/tests/index.html`: all 17 pages pass (adds tutorial 14/14, covering parts, fingertip position, spotlight blocking, target tappable, hint above dim, promise resolve/clear, no-spotlight drag vars, once:false, replacement, invalid target). Live docs tutorial walks through all 3 steps.
- Notes for next agent: The fingertip offset is `TIP = {x:.17, y:.05}` of the 76px hand box (measured from `hand.png`). If the hand image is replaced, re-measure it.

## v0.27.0-A — Shop Card component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-shopcard`: a glossy shop offer card in 8 colors. It has a kit-icon pack picture with a radial glow and an "x500" amount, an optional bonus line, a corner tag (Shop Card is now a Tag host), and a green `.sc-button` price that is real-money text or in-game currency with `data-price-icon`. `data-state="sold"` greys it and disables "SOLD". The `buy` event carries `{price, currency}`. Added the AI manual, registry item, docs page (real/currency prices, colors, sold, live buy-with-coins with toast + float) and `tools/tests/shopcard.html`.
- Tested: `tools/tests/shopcard.html` 10/10 (parts, real vs currency buttons, aria, buy event detail, sold on/off, attribute updates, no duplicates/churn). Live docs demo spends coins and shows the not-enough toast.
- Notes for next agent: The price button is a normal `.sc-button` built by the runtime. Changing `data-price-icon` or `data-state` re-syncs its icon.

## v0.26.0-A — Top Bar component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-topbar` for home screens. The player block is a button with a framed avatar kit icon, a Level Badge on its corner and the name, and fires `profile`. Resource Counters placed inside (even added later) move to the right group. The name shrinks and fades first so counters always fit. Long titles in Top Bar and Item Row now fade out (`.sc-long` via `markLong`) instead of an ellipsis, which broke the outlined text copy. Added the AI manual, registry item, docs page (home screen with tab bar, variants, live profile/earn) and `tools/tests/topbar.html`.
- Tested: `tools/tests/index.html`: all 15 pages pass (adds topbar 11/11, covering structure, avatar/level/name, button semantics, fit at 376px, long-name fade, profile event, attribute updates/removal, late counters, no duplicates/churn).
- Notes for next agent: Don't use `text-overflow: ellipsis` on `.sc-text`: its `::before` outline copy isn't truncated and leaves a black smudge. Use the `.sc-long` fade pattern. The Resource Counter's "+" button overhangs its box by ~2px.

## v0.25.0-A — Level Badge component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-level`: the `level-badge` shield with an outlined number, 3 sizes, and `aria-label` "Level N". `SC.setValue(level, n)` pops on change. Progress Bar now accepts `data-level` to put the badge on its left end (XP bar, min 30px on thin bars). Added the AI manual, registry item, docs page (sizes, XP bars, live gain-XP level-up) and `tools/tests/level.html`.
- Tested: `tools/tests/level.html` 13/13 (image/number/aria, size and centering, badge on bar + overlap + minimum size, setValue pop only on change, data-level change/removal, progress setValue keeps badge, inserted badge, no duplicates/churn). Visual check of docs.
- Notes for next agent: `upgradeProgress` now builds `.sc-level` from `data-level`. Don't combine it with the progress `data-icon`.

## v0.24.0-A — Notification Dot component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added the Notification Dot, a "something new" marker. `data-alert` on buttons, icon buttons, slots, tabs and tab bar items shows the red `alert` icon (bare) or a small plain dot (`dot`) on the top-right corner, with pop-in + gentle pulse; on tab bar items it sits on the icon corner. Standalone `.sc-alert` works inline. `SC.setAlert(el, true|false|'dot')`. Coexists with tags and badges. Added the AI manual, registry item, docs page (hosts, tab bar, live clear-on-open) and `tools/tests/alert.html`.
- Tested: `tools/tests/index.html`: 13 pages pass (adds alert 13/13, covering icon vs dot, coexistence with tag/badge, tabs, position, standalone, setAlert switching/removal, attribute changes, no duplicates/churn).
- Notes for next agent: Not supported on `.sc-row-avatar` (it has overflow:hidden). Geometry checks must wait ~450ms for the pop-in scale animation.

## v0.23.0-A — Loading Bar component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-loading` for the start/loading screen: a large glossy progress bar with "Loading… 42%", an optional bouncing kit icon and rotating tips (`data-tips="a|b"`, every 3 s). It has `data-color`/`data-label`, progressbar semantics, and `SC.loading.set(el, pct)` (clamped; fires `done` once at 100). `SC.loading.done(el)` fills it and hides its Screen Shell. Added the AI manual, registry item, docs page (hero + live simulated load that switches to a play screen) and `tools/tests/loading.html`. STATUS image notes now point to the new icons.
- Tested: `tools/tests/loading.html` 12/12 (parts built once, label, bar value/color, aria, tips rotate, clamp both ways, done once, attribute re-render, done() hides shell). Live docs demo loads and reveals PLAYING!. All other test pages still pass.
- Notes for next agent: `upgradeLoading` owns a tip interval per element (`el._scTips`); it stops when the element leaves the page.

## v0.22.0-A — Item Row component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-row`, a colored card row layout matching the reference mission and leaderboard rows. It has 8 colors (plain dark titles on white/yellow, outlined white on the others), a `leader` variant (rank badge + framed avatar + title + trophy score), a `done` state, and row parts `.sc-row-body/-title/-rank/-avatar/-score` that auto-build kit text and icons. Kit parts inside (slot, progress, button) work as usual. Also relabelled the Tab Bar's home item as Home. Added the AI manual, registry item, docs page (missions, leaderboard, friend row, live claim) and `tools/tests/row.html`.
- Tested: `tools/tests/index.html`: 11 pages pass (adds row 11/11, covering text/icons, plain vs outlined titles, long title doesn't widen the row, nested parts, leader size, score alignment, setLabel/icon swap, inserted rows, no churn). Visual comparison with the reference sheet.
- Notes for next agent: `.sc-row-title/-rank/-score` are in TEXT_COMPONENTS and `.sc-row-avatar/-score[data-icon]` in ICON_COMPONENTS, so they use the generic text/icon upgrade path. The row needs `min-width:0` or long titles stretch it inside grid/flex parents.

## v0.21.1-A — 16 new icons (icons4 sheet)
- Agent: A (Claude) · Date: 2026-09-15
- Done: Cropped the owner's `icons/icons4.png` into `kit/assets`: home, shop, helmet, play, sound, sound-off, music, music-off, menu, restart, alert, level-badge, hand, avatar, gem-pile, coin-pile. Regenerated `offsets.css`, added the names to `registry.json → icons`, and switched the Tab Bar docs to the real home/shop icons. The prompt is saved in `icons/PROMPT-icons4.md`.
- Tested: Visual contact sheet of all 16 crops (each one clean, single icon). All test pages still pass.
- Notes for next agent: Top Bar, Level Badge (`level-badge`), Notification Dot (`alert`), Shop Card (`gem-pile`, `coin-pile`) and Tutorial Hand (`hand`) are no longer blocked. Use sound/music icons in settings examples.

## v0.21.0-A — Toast Message component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `SC.toast(text, {kind, icon, duration, pos})`: a glossy pill message (info dark / success green / error red / reward gold) with outlined kit text and an optional kit icon. It slides in at the top or bottom (12px + safe area) and removes itself. Separate queues for top and bottom show one at a time, with at most 3 waiting and repeated text dropped. It never blocks taps and uses an aria-live polite layer. Added the AI manual, registry item, docs page and `tools/tests/toast.html`.
- Tested: `tools/tests/index.html`: 10 pages pass (adds toast 12/12, covering show, kind/icon, live region, 12px layer offset, queue order, duplicate drop, cap, parallel bottom queue, drain). Live docs demo queues error → reward with a separate bottom toast.
- Notes for next agent: Measure the fixed `.sc-toast-layer`, not the toast, in tests: the toast is mid slide-in animation.

## v0.20.0-A — Hint Bubble component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added the Hint Bubble: a white speech bubble with an outlined border and a rounded rotated-square pointer (no polygons) in 4 directions, 2 sizes. `data-hint` on any element shows it on tap (auto-hides after 2.5 s, on a second tap or a tap elsewhere). `SC.hint.show(target, text, {pos, duration})` / `SC.hint.hide(target?)` handle tutorials (`duration: 0` stays). Floating bubbles are placed next to the target, clamped 12px inside the screen with the pointer still aiming at the target, scale with the target's Screen Shell, reposition on resize/scroll, and never block taps. Added the AI manual, registry item, docs page, `tools/tests/hint.html` and `icons/PROMPT-icons4.md` (owed image prompt).
- Tested: `tools/tests/index.html`: 9 pages pass (adds hint 15/15, covering static pointer, tap show/hide, positions, pointer aim, edge clamp, code hints vs outside taps, replace, duration, hide all). Visual check of all pointer directions and tap demos.
- Notes for next agent: Bubble geometry tests must wait ~300ms for the pop-in `scale` animation before measuring rects.

## v0.19.0-A — Title Banner Ribbon component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-banner`, a ribbon banner with a glossy band (outlined kit text) and darker folded tails behind both ends, built from skewed rounded pseudo-elements (no polygons). It has 10 colors, 3 sizes and `unfurl`/`drop` entrance animations. The runtime wraps the text in `.sc-banner-band` so the tails render behind the band. Works with `SC.setLabel` and `SC.replay`. Added the AI manual, registry item, docs page and `tools/tests/banner.html`.
- Tested: `tools/tests/index.html`: 8 pages pass (adds banner 9/9). Visual check of hero, sizes, colors and the live rename/replay demo.
- Notes for next agent: Tails use z-index:-1 inside an isolated `.sc-banner`, so the band must be its own element (z-index 1). Otherwise the tails paint over the band background.

## v0.18.0-A — Tag Ribbon component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-tag`, small glossy sticker labels (NEW, HOT, BEST, SALE, -50%, x2) in all 10 kit colors, 3 sizes, with optional tilt. Buttons, icon buttons and tabs accept `data-tag` + `data-tag-color` + `data-tag-pos` (top-left/top-right tilted, or top centered). The runtime builds and updates the sticker, and it pops in. Reward Slot keeps its own tag. Added the AI manual, registry item, docs page and `tools/tests/tag.html`.
- Tested: `tools/tests/index.html`: 7 pages pass (bubble 60, toggle 39, slider 30, checkbox 20, tabs 24, tabbar 13, tag 15). Visual check of all docs examples.
- Notes for next agent: `data-tag*` attribute changes on slots still go to `upgradeSlot` (the tag branch only handles TAG_HOSTS). Standalone tags are matched as `.sc-tag:not(.sc-tag-attached)`.

## v0.17.0-A — Bottom Tab Bar component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-tabbar`, the bottom navigation bar for home screens, matching the reference. It's a dark navy bar. The selected item rises on a glossy indigo block with rounded free top corners and sharp attached bottom corners, a bigger icon and an uppercase label. It has count badges on icons, 9 block colors, disabled items and `data-panel` to switch screens. Inside `.sc-screen-bottom` it bleeds to the phone edges and pads the home-bar safe area. It shares the Tabs runtime (`SC.tabbar === SC.tabs`). Also added `tools/tests/index.html`, which runs every component test page at once (AGENTS.md §4 updated). `setSpan` and the bubble title now only write when the value changes.
- Tested: `tools/tests/index.html`: all 6 pages pass (bubble 60, toggle 39, slider 30, checkbox 20, tabs 24, tabbar 13). Tab bar checks cover item class, selection, labels only on selected, badges, panels, edge bleed inside a scaled shell, click/disabled/keys and no attribute churn. Live docs demo switches 4 screens and clears the Chests badge.
- Notes for next agent: The tab bar has no home/shop icons yet (uses cash/chest/star/trophy/settings). Swap in real ones after `icons4.png` arrives. Tabs and tab bar share `upgradeTabs`; the item class depends on the parent (`sc-tab` vs `sc-tabbar-item`).

## v0.16.0-A — Tabs component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-tabs`, a segmented row of 2–4 tabs matching the reference: glossy blue selected tab and muted dark purple unselected tabs with a thin light top edge. Supports optional kit icons, 9 selected colors, 3 sizes, `data-badge` on tabs (Count Bubble now accepts `.sc-tab` hosts), disabled tabs, and `data-panel` to auto show/hide content. It has full tab semantics (tablist/tab, aria-selected, roving tabindex, aria-controls), Left/Right/Home/End keys, a `change` event and `SC.tabs.get/set`. Added the AI manual, registry item, docs page and `tools/tests/tabs.html`.
- Tested: `tools/tests/tabs.html` 24/24 passed, covering initial/fallback selection, roles, icons, panels, click/disabled/no form submit, keyboard wrap, silent set/emit, attribute change, badges, appended tabs, repeated upgrades, equal widths and no observer loop. Visual check in the docs against the reference sheet. Checkbox 20/20, Slider 30/30, Toggle 39/39 and Bubble 60/60 still pass.
- Notes for next agent: `sc.js` has a shared `setAttr(el, k, v)` helper that only writes real changes; use it in new builders to avoid MutationObserver loops. In tests, use `:scope >` when counting `.sc-text`, because a badge bubble contains its own `.sc-text`.

## v0.15.0-A — Checkbox component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-checkbox`, a chunky tick box. Unchecked is a dark inset box. Checked is a glossy colored box with the kit `check` icon, which pops in. It has an optional outlined text label, 10 colors, 3 sizes and native disabled. Uses `role=checkbox` + `aria-checked` and one `change` event per tap/Space/Enter. API: `SC.checkbox.get/set/toggle` (silent unless `{emit:true}`, boolean-only like Toggle). Added the AI manual, registry item, docs page and `tools/tests/checkbox.html`.
- Tested: `tools/tests/checkbox.html` 20/20 passed, covering states, click, disabled, no form submit, silent set/emit/throw, attribute re-sync, setLabel, dynamic insert and no observer loop. Real clicks checked in the docs. Slider 30/30, Toggle 39/39 and Bubble 60/60 still pass.
- Notes for next agent: Never reuse a CSS variable name inside its own definition (`--fs:var(--fs)` breaks the label size). Checkbox uses `--cb-fs`. Checkbox patterns mirror Toggle.

## v0.14.0-A — Slider component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-slider`, a glossy track with a round white thumb (same thumb style as Toggle). It supports drag, tap-to-jump, arrows, Page Up/Down, Home and End. Options: `data-min/max/step` (decimals ok), `data-label` percent/value, 9 fill colors, 3 sizes (touch area ≥ 44px), an optional left icon, and `disabled` (also inside a disabled fieldset). Events: `input` while moving and `change` on release. API: `SC.slider.get/set` (silent unless `{emit:true}`, invalid values ignored). Added the AI manual, registry item, docs page and `tools/tests/slider.html`.
- Tested: `tools/tests/slider.html` 30/30 passed, covering keyboard, pointer drag/clamp/release, API, attribute re-render, labels, disabled, dynamic insert, pointer math inside a scaled `.sc-screen`, and no observer loop. Real mouse drag and keys checked in the docs. Phone size 375×812 has no horizontal overflow. Codex's Toggle 39/39 and Bubble 60/60 still pass.
- Notes for next agent: `sc.js` now observes `disabled`, `data-min` and `data-step`. Inside `upgradeSlider`, only set attributes when they really change, or the MutationObserver loops. Sound/music icons are still missing (owed image prompt).

## v0.13.0-B — Toggle component
- Agent: B (Codex / GPT) · Date: 2026-09-15
- Done: Added a glossy ON/OFF settings switch with a sliding circular thumb, three sizes, kit ON colors, disabled states, keyboard focus and reduced-motion support. Bare `data-checked` or `data-checked="true"` turns it ON; missing/false turns it OFF. Added `SC.setChecked`, `SC.toggle.get/set/toggle`, and one bubbling `change` event per user activation. Includes the AI manual, registry and live docs.
- Tested: Docs in a browser at 375×812 and 1280×900, with no horizontal overflow. Checked state, sizes, colors, disabled examples, code tabs, keyboard focus, tap/Space/Enter, silent restore, lock/unlock and dynamically added options. All 39 Toggle regression checks and all 60 Count Bubble checks passed. Existing Screen Shell demo still starts, pauses and resumes. JavaScript syntax, registry paths/version consistency and `git diff --check` passed; no browser warnings/errors in the checked pages.
- Notes for next agent: Screen Shell was completed by Claude while Toggle was being built; Toggle was developed separately, then integrated after v0.12.0-A. Use a native button and a stable accessible name. Runtime owns `aria-checked`; the game owns saving and side effects. Helpers are silent unless `{ emit: true }` is passed, and `SC.setChecked` requires a boolean. Native disabled fieldsets now suppress press feedback too. Regression page: `/tools/tests/toggle.html`. Next: Slider.

## v0.12.0-A — Screen Shell component
- Agent: A (Claude) · Date: 2026-09-15
- Done: Added `.sc-screen`, the full-page layout every game screen starts from. It has top / middle / bottom regions and scales a 400×870 design to any phone shape. It never scrolls, keeps 12 real px + safe-area margins, and offers `data-backdrop` none/dim/solid (none lets taps reach the game), `data-enter` fade/pop, `data-fit="parent"` for previews, and `SC.screen.show/hide/fit` with `show`/`hide` events. Added the AI manual, registry item, docs page and a full example `examples/screen-on-canvas.html` (start → HUD → pause over a tappable canvas).
- Tested: Browser, docs at desktop width and the example at 375×812. Edge gaps measured exactly 12px on top/left/right/bottom. No page scroll. A tap on empty HUD space hits the canvas. Tall/wide/short frames all keep bars at the edges. Pause/resume switching works. Title/stars entrance animations replay when a hidden screen is shown. Codex's `tools/tests/bubble.html` still passes 60/60 after the `sc.js` change.
- Notes for next agent: the shell uses `transform: scale()`, so a `position:fixed` child is positioned relative to the shell. Keep popups outside screens. Bottom region has `margin-top:auto`, so it stays at the bottom even without a middle.

## v0.11.0-B — Count Bubble component
- Agent: B (Codex / GPT) · Date: 2026-09-15
- Done: Added glossy corner counts to Button, Icon Button and Reward Slot through `data-badge`, optional `data-badge-color`, and `SC.setBadge()`. Counts update automatically, including on newly inserted components. Zero stays visible; counts above 99 display as 99+; missing or invalid counts hide. Added the AI manual, registry entries and live docs. Kept icon buttons round and label updates separate from badge text.
- Tested: Browser preview at 375×812 and normal desktop width; all examples, palette colors, images, live use/refill/hide/add controls, and code tabs. 60 browser regression checks passed in `tools/tests/bubble.html`, covering all hosts, attribute and API updates, invalid values, removal, repeated upgrades, label/icon preservation, round sizes/variants, and press feedback. JavaScript syntax, registry links/version consistency and `git diff --check` passed.
- Notes for next agent: Count Bubble sits top-right to avoid the slot quantity at bottom-right. Load bubble CSS plus the selected host CSS. Leave 8px outside the host and keep the whole badge inside screen margins. Avoid overlapping long slot tags. Accessible labels remain game-owned. Preview regression checks at `/tools/tests/bubble.html`. Next: Screen Shell.

## v0.10.2-A — Repo made private
- Agent: A (Claude) · Date: 2026-09-15
- Done: GitHub repo switched to private at the owner's request. GitHub Pages (live docs site) is therefore offline. Removed live-site links from README, AGENTS.md, STATUS.md.
- Tested: `gh repo view` reports PRIVATE.
- Notes for next agent: preview only locally with `tools/serve.py`.

## v0.10.1-A — Clean up project folder
- Agent: A (Claude) · Date: 2026-09-15
- Done: Moved early experiments (home screen, blueprint button, fonts tests, loose images) and all reference screenshots into `_archive/` (local only, gitignored). Moved old pre-kit demo pages into `super-casual/old-demos/`. Rewrote README, updated links in `index.html`, AGENTS.md and STATUS.md.
- Tested: local server: index, kit docs, kit icons, old demo pages and their images all return 200.
- Notes for next agent: `_archive/` exists only on the owner's Mac. Never commit it. Old demos are at `super-casual/old-demos/`.

## v0.10.0-A — Super Casual kit: 10 components + multi-agent handoff system
- Agent: A (Claude) · Date: 2026-09-15
- Done:
  - Built the shadcn-style kit in `super-casual/kit`: `core.css`, `sc.js` runtime, `registry.json`, per-component CSS + AI manual + docs page.
  - Components: Button, Icon Button, Resource Counter, Reward Slot, Popup, Progress Bar, Screen Title, Star Rating, Countdown Timer, Floating Text.
  - 31 icons in `kit/assets` with automatic optical centering (`tools/icon_offsets.py`).
  - Old demo screens (`super-casual/success.html`, `fail.html`, `pause.html`, `hud.html`) kept as reference for future Blocks.
  - Added `AGENTS.md`, `CLAUDE.md`, `STATUS.md`, `CHANGELOG.md` so Claude and Codex can take turns.
- Tested: every docs page was checked in a browser. Examples render, icons load, and live demos work (star earn/lose pops one by one, timer start/pause/+5s/done, counter count-up, popup open/close).
- Notes for next agent:
  - Star Rating: when stars turn off, the pop animation class must be cleared, or they stay visually filled.
  - Popup docs show inline copies with class `.inline`; real popups are full-screen.
  - Use `tools/serve.py` for previews (no caching).
