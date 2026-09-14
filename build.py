# Inlines assets/ images into a single self-contained HTML file.
import base64, re, sys
src, out = sys.argv[1], sys.argv[2]
html = open(src).read()
def inline(m):
    path = m.group(1); mime = 'image/jpeg' if path.endswith('.jpg') else 'image/png'
    return 'src="data:%s;base64,%s"' % (mime, base64.b64encode(open(path, 'rb').read()).decode())
open(out, 'w').write(re.sub(r'src="(assets/[^"]+)"', inline, html))
