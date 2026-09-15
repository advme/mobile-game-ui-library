# Item Row

A colored card row for lists: missions with a reward and a Claim button, leaderboards, friend lists. It is a layout: you fill it with kit parts (Reward Slot, Progress Bar, Button, Icon Button) plus a few row parts.

## Install

```html
<link rel="stylesheet" href="kit/core.css">
<link rel="stylesheet" href="kit/components/row/row.css">
<!-- plus the parts you use -->
<link rel="stylesheet" href="kit/components/slot/slot.css">
<link rel="stylesheet" href="kit/components/progress/progress.css">
<link rel="stylesheet" href="kit/components/button/button.css">
<script src="kit/sc.js"></script>
```

## Usage

```html
<!-- Mission -->
<div class="sc-row" data-color="yellow">
  <div class="sc-slot" data-icon="coin" data-count="500" data-size="sm" data-color="white"></div>
  <div class="sc-row-body">
    <span class="sc-row-title">Win 3 levels</span>
    <div class="sc-progress" data-value="3" data-max="3" data-label="value" data-color="green"></div>
  </div>
  <button class="sc-button" data-color="orange" data-size="sm">Claim</button>
</div>

<!-- Leaderboard -->
<div class="sc-row" data-variant="leader" data-color="blue">
  <span class="sc-row-rank">4</span>
  <span class="sc-row-avatar" data-icon="avatar"></span>
  <span class="sc-row-title">Player</span>
  <span class="sc-row-score" data-icon="trophy">5154</span>
</div>
```

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `data-color` | `white` `yellow` `blue` `sky` `green` `purple` `red` `dark` | `white` | Titles are plain dark on white/yellow and outlined white on the others. |
| `data-variant` | `leader` | | Shorter row (52px) for rankings. |
| `data-state` | `done` | | Faded (already claimed). |

Row parts (their text becomes kit text automatically):

| Part | Notes |
|---|---|
| `.sc-row-body` | Middle column: title + progress. |
| `.sc-row-title` | Name or mission text; long text is clipped. |
| `.sc-row-rank` | Rank number in a dark badge. |
| `.sc-row-avatar` | Framed square picture, `data-icon`. |
| `.sc-row-score` | Number on the right, optional `data-icon` before it. `SC.setLabel(score, '6000')` updates it. |

## Rules for AI agents

- Mission states:
  - In progress: white row + sky **Go**.
  - Complete: yellow row + orange **Claim**.
  - Claimed: `data-state="done"`, slot `data-state="claimed"` and a disabled dark **Done** button.
- Leaderboard: `data-variant="leader"`. Highlight the player's own row in yellow; the top 3 can be purple or blue.
- Stack rows in a column with 8–10px gaps inside a popup body or screen middle. Only a popup body may scroll, never the page.
- Keep titles short.
- Use the `avatar` or `helmet` icon for player pictures until the game has real ones.
