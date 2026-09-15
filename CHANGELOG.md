# CHANGELOG

Newest first. Format and version rules: see `AGENTS.md` §8 (A = Claude, B = Codex/GPT).

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
