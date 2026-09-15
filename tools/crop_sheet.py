"""
Cut a sprite sheet (icons in a grid on a transparent background) into separate PNGs.

Each visible shape is assigned to the grid cell its center falls in, so icons that
cross grid lines or have separate parts (e.g. the two pause bars) are cut correctly.
Soft glows are dropped by only keeping strongly opaque pixels.

Usage:
  python3 tools/crop_sheet.py SHEET COLS ROWS OUT_DIR name1 name2 ... [--size 160] [--alpha 200]
"""
import argparse
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('sheet'); ap.add_argument('cols', type=int); ap.add_argument('rows', type=int)
ap.add_argument('out'); ap.add_argument('names', nargs='+')
ap.add_argument('--size', type=int, default=160, help='max output size in px')
ap.add_argument('--alpha', type=int, default=200, help='opacity threshold that counts as solid')
a = ap.parse_args()

im = Image.open(a.sheet).convert('RGBA'); arr = np.array(im)
S = 2  # label on a half-size mask for speed
mask = arr[::S, ::S, 3] > a.alpha
h, w = mask.shape
lab = np.zeros((h, w), np.int32); comps = []
for y in range(h):
    for x in range(w):
        if mask[y, x] and not lab[y, x]:
            cid = len(comps) + 1; q = deque([(y, x)]); lab[y, x] = cid; n = sy = sx = 0
            while q:
                cy, cx = q.popleft(); n += 1; sy += cy; sx += cx
                for ny, nx in ((cy+1, cx), (cy-1, cx), (cy, cx+1), (cy, cx-1)):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = cid; q.append((ny, nx))
            comps.append((cid, n, sy / n * S, sx / n * S))

cw, ch = im.width / a.cols, im.height / a.rows
for i, name in enumerate(a.names):
    r, c = divmod(i, a.cols)
    ids = [cid for cid, n, cy, cx in comps if n > 40 and int(cy // ch) == r and int(cx // cw) == c]
    keep = np.kron(np.isin(lab, ids), np.ones((S, S), bool))[:arr.shape[0], :arr.shape[1]]
    keep = np.array(Image.fromarray((keep * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5)))
    out = arr.copy(); out[..., 3] = np.minimum(out[..., 3], keep)
    img = Image.fromarray(out)
    img = img.crop(img.split()[-1].point(lambda v: 255 if v > 8 else 0).getbbox())
    img.thumbnail((a.size, a.size), Image.LANCZOS)
    img.save(f'{a.out}/{name}.png', optimize=True)
    print(f'{name:14} parts={len(ids)} size={img.size}')
