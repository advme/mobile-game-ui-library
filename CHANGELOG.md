# CHANGELOG

Newest first. Format and version rules: see `AGENTS.md` §8 (A = Claude, B = Codex/GPT).

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
