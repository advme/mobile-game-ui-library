# Image prompts: Super Casual style

Use these templates when a game needs a picture the kit doesn't have (a new item, character, currency, pack…).
Fill in the `{…}` parts, generate with an image model (e.g. GPT Image), then follow **After generating** below.

Never draw pictures with code (CSS/SVG/canvas). Always generate an image.

---

## 1. Style block (always include it word for word)

```
Style: chunky super-casual mobile game GUI icon, glossy candy colors, thick dark navy-black outline (about 4% of the icon size),
soft white highlight on the top-left, slightly darker shading at the bottom, rounded friendly shapes, simple readable silhouette,
front view with a slight 3/4 tilt, flat studio lighting, no text, no letters, no numbers, no watermark, no drop shadow on the ground,
plain fully transparent background.
```

## 2. One icon

Size 1:1 (1024×1024).

```
A single mobile game UI icon of {subject — e.g. "a red fox head with big ears"}, {main colors — e.g. "orange and cream"},
centered with generous empty space around it (the object fills about 80% of the image).
{STYLE BLOCK}
```

## 3. A sheet of several icons (cheaper, and all match each other)

Size 1:1 (1024×1024) for up to 16 icons.

```
A {cols}×{rows} grid sprite sheet of {count} separate mobile game UI icons, evenly spaced with generous empty space between them,
no grid lines, no labels, each icon centered in its own cell.
Row 1: {icon 1}, {icon 2}, {icon 3}, {icon 4}.
Row 2: {…}.
{STYLE BLOCK}
```

## 4. Ready-made subjects

Put these into template 2 or 3 as `{subject}`:

| Need | Subject text |
|---|---|
| Currency | "a shiny {color} {object} coin/gem/shell with a small sparkle" |
| Currency pack (shop) | "a big pile of {currency} spilling out of a small {chest/bag/bowl}" |
| Booster / power-up | "a {object} with a glowing {color} aura, clearly readable as a power-up" |
| Character avatar | "a cute round {character} face, looking at the viewer, happy expression, head and shoulders only" |
| Skin / costume item | "a {item} for a {character}, shown alone as a collectible item" |
| Chest / reward box | "a {rarity color} treasure chest with gold trim, closed" (and a second one "open with light rays") |
| Key / unlock | "a chunky {color} key with a round handle" |
| Energy / life | "a {color} {lightning bolt/heart} with a soft glow" |
| Settings-type symbol | "a simple white {symbol} with a dark outline" (for menu/sound/restart-style icons) |

Keep the same `{main colors}` palette for a whole game so everything matches.

---

## After generating

1. **Transparent background:** check the PNG really is transparent. Regenerate if it has a white or checkered background.
2. **Cut a sheet into icons:**
   `python3 tools/crop_sheet.py SHEET.png COLS ROWS OUT_FOLDER name1 name2 …`
   Names are short kebab-case words in reading order: `fox-head`, `shell-coin`, …
3. **Put the files where the game loads them:**
   - In the kit (shared by all games): `super-casual/kit/assets/<name>.png`. Then run `python3 tools/icon_offsets.py super-casual/kit/assets super-casual/kit/assets/offsets.css` and add the name to `registry.json → icons.names`.
   - Only for one game: any folder in that game, e.g. `images/fox-head.png`.
4. **Use it:**
   - Kit asset: `data-icon="fox-head"`
   - Game file: `data-icon="images/fox-head.png"` (paths and web addresses work everywhere the kit shows a picture)
   - Replace a kit picture for the whole game: `SC.setImage('coin', 'images/shell-coin.png')`
