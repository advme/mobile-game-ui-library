/*
  Blocks device preview — docs helper, NOT part of the kit (don't copy it into games).
  On a desktop computer a block opens inside preview.html (device frames, rotate).
  On a phone or tablet the block opens directly and fills the real screen.
  Load it as the first script in a block's <head>:  <script src="preview.js"></script>
*/
(function () {
  const embedded = window.top !== window || /[?&]embed=1\b/.test(location.search);
  const desktop = matchMedia('(pointer: fine)').matches && matchMedia('(hover: hover)').matches && Math.max(screen.width, innerWidth) >= 1000;
  if (embedded || !desktop) return;
  const file = location.pathname.split('/').pop();
  location.replace('preview.html?block=' + encodeURIComponent(file) + location.hash);
})();
