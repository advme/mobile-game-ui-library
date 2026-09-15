# CHANGELOG

Newest first. Format and version rules: see `AGENTS.md` §8 (A = Claude, B = Codex/GPT).

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
