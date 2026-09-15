/*
  Docs site renderer (not part of the kit itself).
  Each component page calls SCDocs.page({...}) with its content.
*/
(function () {
  const NAV = [
    { group: 'Getting started', items: [['Introduction', null], ['Installation', null]] },
    { group: 'Components', items: [
      ['Button', 'button.html'], ['Icon Button', 'icon-button.html'], ['Resource Counter', 'counter.html'],
      ['Reward Slot', 'slot.html'], ['Popup', 'popup.html'], ['Progress Bar', 'progress.html'], ['Screen Title', 'title.html'], ['Star Rating', 'stars.html'], ['Countdown Timer', 'timer.html'], ['Floating Text', 'float.html'], ['Count Bubble', 'bubble.html'], ['Screen Shell', 'screen.html'], ['Toggle', 'toggle.html'] ] },
    { group: 'Examples', items: [['Button on a game canvas', '../examples/button-on-canvas.html'], ['Screens on a game canvas', '../examples/screen-on-canvas.html']] },
  ];
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const here = location.pathname.split('/').pop();

  function nav() {
    return `<div class="brand">Super Casual UI Kit<small>v0.13 · for mobile web games</small></div>` +
      NAV.map(g => `<div class="nav-group"><h4>${g.group}</h4>${g.items.map(([label, href]) =>
        href ? `<a href="${href}" class="${href === here ? 'active' : ''}">${label}</a>` : `<a class="soon">${label}</a>`
      ).join('')}</div>`).join('');
  }

  function demo({ title, desc, html, narrow }, hero) {
    const preview = html.replaceAll('src="assets/', `src="${window.SC ? SC.assets : '../assets/'}`);
    return `${hero ? '' : `<h3>${title}</h3><p class="desc">${esc(desc || '')}</p>`}
      <div class="demo">
        <div class="tabs"><button class="on" data-tab="preview">Preview</button><button data-tab="code">Code</button></div>
        <div class="preview ${narrow ? 'narrow' : ''}">${narrow ? `<div class="frame">${preview}</div>` : preview}</div>
        <div class="code"><button class="copy">Copy</button><pre>${esc(html)}</pre></div>
      </div>`;
  }
  const codeBlock = text => `<div class="block-code"><div class="code"><button class="copy">Copy</button><pre>${esc(text)}</pre></div></div>`;

  window.SCDocs = {
    page(c) {
      document.body.innerHTML = `<div class="layout"><aside>${nav()}</aside><main>
        <div class="crumbs">Components › ${c.title}</div>
        <h1>${c.title}</h1>
        <p class="lead">${c.lead}</p>
        ${demo({ html: c.hero }, true)}
        <h2>Installation</h2>
        <p class="desc">Add the core styles, the component styles and the runtime script once per page.</p>
        ${codeBlock(['<link rel="stylesheet" href="kit/core.css">', ...c.css.map(f => `<link rel="stylesheet" href="kit/${f}">`), '<script src="kit/sc.js"></script>'].join('\n'))}
        <h2>Usage</h2>
        <p class="desc">${c.usageNote || ''}</p>
        ${codeBlock(c.usage)}
        <h2>Examples</h2>
        ${c.examples.map((ex, i) => `<div data-example="${i}">${demo(ex)}</div>`).join('')}
        <h2>API Reference</h2>
        <div class="table-wrap"><table><thead><tr><th>Attribute</th><th>Values</th><th>Default</th><th>Description</th></tr></thead><tbody>
          ${c.api.map(([a, v, d, desc]) => `<tr><td><code>${esc(a)}</code></td><td>${v.split(' ').map(x => `<code>${esc(x)}</code>`).join(' ')}</td><td>${d ? `<code>${esc(d)}</code>` : '—'}</td><td>${desc}</td></tr>`).join('')}
        </tbody></table></div>
        ${c.js ? `<h3>JavaScript</h3>${codeBlock(c.js)}` : ''}
        <h2>Rules for AI agents</h2>
        <ul class="rules">${c.rules.map(r => `<li>${r}</li>`).join('')}</ul>
      </main></div>`;
      document.title = `${c.title} — Super Casual UI Kit`;
      c.examples.forEach((ex, i) => ex.setup && ex.setup(document.querySelector(`[data-example="${i}"] .preview`)));
    },
  };

  document.addEventListener('click', e => {
    const tab = e.target.closest('.tabs button');
    if (tab) {
      const d = tab.closest('.demo');
      d.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b === tab));
      d.classList.toggle('show-code', tab.dataset.tab === 'code');
    }
    const copy = e.target.closest('.copy');
    if (copy) {
      navigator.clipboard?.writeText(copy.nextElementSibling.textContent);
      copy.textContent = 'Copied'; setTimeout(() => (copy.textContent = 'Copy'), 1200);
    }
  });
})();
