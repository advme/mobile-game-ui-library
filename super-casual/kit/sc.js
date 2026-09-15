/*
  Super Casual UI Kit — runtime (sc.js)
  Load once per page: <script src="kit/sc.js"></script>

  What it does automatically:
  - Builds the outlined 3D text inside components (so you only write plain labels)
  - Inserts icons from kit/assets by name: data-icon="pause"
  - Builds composite components from attributes (e.g. counters from data-value)
  - Keeps everything in sync when you change text or attributes later
  - Press feedback on phones (iOS Safari ignores :active without this)
  - Works for elements added later (e.g. UI created by game code)

  Icons load from the "assets" folder next to this script.
  To use a different folder: <script src="kit/sc.js" data-assets="my/icons/"></script>
*/
(function () {
  const TEXT_COMPONENTS = '.sc-button, .sc-icon-button';
  const ICON_COMPONENTS = '.sc-button[data-icon], .sc-icon-button[data-icon]';
  const COUNTERS = '.sc-counter';
  const SLOTS = '.sc-slot';
  const POPUPS = '.sc-popup';
  const PROGRESS = '.sc-progress';
  const TITLES = '.sc-title';
  const STARS = '.sc-stars';
  const TIMERS = '.sc-timer';
  const TOGGLES = 'button.sc-toggle';
  const SLIDERS = '.sc-slider';
  const CHECKBOXES = 'button.sc-checkbox';
  const TABS = '.sc-tabs';
  const BADGE_HOSTS = '.sc-button, .sc-icon-button, .sc-slot, .sc-tab';
  const MESSAGES = '.sc-popup-message, .sc-popup-value';
  const SCREENS = '.sc-screen';
  const ALL = `${TEXT_COMPONENTS}, ${COUNTERS}, ${SLOTS}, ${POPUPS}, ${MESSAGES}, ${PROGRESS}, ${TITLES}, ${STARS}, ${TIMERS}, ${SCREENS}, ${TOGGLES}, ${SLIDERS}, ${CHECKBOXES}, ${TABS}`;
  const PRESSABLE = `.sc-button, .sc-icon-button, .sc-counter-plus, ${TOGGLES}, ${CHECKBOXES}, .sc-tabs > button`;

  const script = document.currentScript;
  const ASSETS = script && script.dataset.assets
    ? new URL(script.dataset.assets, location.href).href
    : new URL('assets/', script ? script.src : location.href).href;

  // Icons that are drawn by mirroring another icon
  const ALIASES = { 'arrow-left': { name: 'arrow-right', flip: true } };

  // Load optical-centering nudges for the icon set once
  if (!document.querySelector('link[data-sc-offsets]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = ASSETS + 'offsets.css'; link.dataset.scOffsets = '';
    document.head.appendChild(link);
  }

  /* ---------- helpers ---------- */
  function textSpan(text) {
    const span = document.createElement('span');
    span.className = 'sc-text'; span.textContent = text; span.dataset.text = text;
    return span;
  }
  function setSpan(span, text) { if (span.textContent !== text) span.textContent = text; span.dataset.text = text; }

  // Wrap plain text labels in <span class="sc-text" data-text="…">
  function upgradeText(el) {
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.replaceWith(textSpan(node.textContent.trim()));
    });
  }

  // Insert / update an <img> for data-icon
  function upgradeIcon(el) {
    const name = el.dataset.icon;
    if (!name) return;
    const alias = ALIASES[name] || { name, flip: false };
    let img = el.querySelector(':scope > img[data-sc-icon]');
    if (!img) {
      img = document.createElement('img');
      img.alt = ''; img.dataset.scIcon = ''; img.draggable = false;
      el.prepend(img);
    }
    const src = ASSETS + alias.name + '.png';
    if (img.src !== src) img.src = src;
    img.toggleAttribute('data-flip', alias.flip);
  }

  /* ---------- Count Bubble (attachment on buttons and slots) ---------- */
  function upgradeBubble(el) {
    const raw = el.getAttribute('data-badge');
    const count = Number(raw);
    let bubble = el.querySelector(':scope > .sc-bubble');
    if (raw == null || raw.trim() === '' || !Number.isSafeInteger(count) || count < 0) {
      bubble?.remove();
      return;
    }
    if (!bubble) {
      bubble = document.createElement('span'); bubble.className = 'sc-bubble';
      bubble.append(textSpan('')); el.append(bubble);
    }
    setSpan(bubble.firstElementChild, count > 99 ? '99+' : String(count));
    const color = el.dataset.badgeColor || 'blue';
    if (bubble.dataset.color !== color) bubble.dataset.color = color;
    bubble.title = String(count);
  }

  /* ---------- Toggle ---------- */
  function upgradeToggle(el) {
    const checked = toggle.get(el);
    el.type = 'button';
    el.setAttribute('role', 'switch');
    el.setAttribute('aria-checked', String(checked));
    let label = el.querySelector(':scope > .sc-toggle-label');
    if (!label) {
      label = document.createElement('span'); label.className = 'sc-toggle-label';
      label.setAttribute('aria-hidden', 'true'); label.append(textSpan('')); el.append(label);
    }
    setSpan(label.firstElementChild, checked ? 'ON' : 'OFF');
    if (!el.querySelector(':scope > .sc-toggle-thumb')) {
      const thumb = document.createElement('span'); thumb.className = 'sc-toggle-thumb';
      thumb.setAttribute('aria-hidden', 'true'); el.append(thumb);
    }
  }
  const toggle = {
    get(el) { return el.dataset.checked === '' || el.dataset.checked === 'true'; },
    set(el, checked, { emit = false } = {}) {
      // Require booleans so the string "false" cannot accidentally turn a setting on.
      if (typeof checked !== 'boolean') throw new TypeError('SC.toggle.set expects a boolean');
      const changed = toggle.get(el) !== checked;
      el.dataset.checked = String(checked); upgradeToggle(el);
      if (changed && emit) el.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { checked } }));
    },
    toggle(el, options) { toggle.set(el, !toggle.get(el), options); },
  };
  // Native buttons already activate once for touch, Enter and Space.
  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest(TOGGLES);
    if (!el || el.matches(':disabled')) return;
    toggle.toggle(el, { emit: true });
  });

  /* ---------- Checkbox ---------- */
  function upgradeCheckbox(el) {
    const checked = checkbox.get(el);
    if (el.type !== 'button') el.type = 'button';
    if (el.getAttribute('role') !== 'checkbox') el.setAttribute('role', 'checkbox');
    if (el.getAttribute('aria-checked') !== String(checked)) el.setAttribute('aria-checked', String(checked));
    upgradeText(el);
    let box = el.querySelector(':scope > .sc-checkbox-box');
    if (!box) {
      box = document.createElement('span'); box.className = 'sc-checkbox-box'; box.setAttribute('aria-hidden', 'true');
      const img = document.createElement('img'); img.alt = ''; img.draggable = false; img.src = ASSETS + 'check.png';
      box.append(img); el.prepend(box);
    }
  }
  const checkbox = {
    get(el) { return el.dataset.checked === '' || el.dataset.checked === 'true'; },
    set(el, checked, { emit = false } = {}) {
      if (typeof checked !== 'boolean') throw new TypeError('SC.checkbox.set expects a boolean');
      const changed = checkbox.get(el) !== checked;
      el.dataset.checked = String(checked); upgradeCheckbox(el);
      if (changed && emit) el.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { checked } }));
    },
    toggle(el, options) { checkbox.set(el, !checkbox.get(el), options); },
  };
  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest(CHECKBOXES);
    if (!el || el.matches(':disabled')) return;
    checkbox.toggle(el, { emit: true });
  });

  /* ---------- Tabs ---------- */
  const setAttr = (el, k, v) => { if (el.getAttribute(k) !== String(v)) el.setAttribute(k, v); };   // only real changes (no observer loops)
  const tabList = el => [...el.children].filter(c => c.tagName === 'BUTTON');
  function upgradeTabs(el) {
    const list = tabList(el);
    setAttr(el, 'role', 'tablist');
    let value = el.dataset.value;
    const pick = list.find(t => t.dataset.value === value && !t.disabled) || list.find(t => !t.disabled);
    if (pick && pick.dataset.value !== value) { value = pick.dataset.value; el.dataset.value = value; }
    list.forEach(t => {
      if (!t.classList.contains('sc-tab')) t.classList.add('sc-tab');
      if (t.type !== 'button') t.type = 'button';
      upgradeText(t); upgradeIcon(t); upgradeBubble(t);
      const on = t === pick;
      setAttr(t, 'role', 'tab'); setAttr(t, 'aria-selected', on); setAttr(t, 'tabindex', on ? 0 : -1);
      const panel = t.dataset.panel && document.getElementById(t.dataset.panel);
      if (panel) {
        setAttr(t, 'aria-controls', t.dataset.panel); setAttr(panel, 'role', 'tabpanel');
        if (panel.hidden === on) panel.hidden = !on;
      }
    });
  }
  const tabs = {
    get(el) { const t = tabList(el).find(b => b.getAttribute('aria-selected') === 'true'); return t ? t.dataset.value : null; },
    set(el, value, { emit = false } = {}) {
      const t = tabList(el).find(b => b.dataset.value === String(value));
      if (!t || t.disabled) return false;
      const changed = tabs.get(el) !== t.dataset.value;
      el.dataset.value = t.dataset.value; upgradeTabs(el);
      if (changed && emit) el.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: t.dataset.value } }));
      return true;
    },
  };
  document.addEventListener('click', e => {
    const t = e.target.closest && e.target.closest('.sc-tabs > button');
    if (!t || t.disabled) return;
    tabs.set(t.parentElement, t.dataset.value, { emit: true });
  });
  document.addEventListener('keydown', e => {
    const t = e.target.closest && e.target.closest('.sc-tabs > button');
    if (!t || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const list = tabList(t.parentElement).filter(b => !b.disabled), i = list.indexOf(t);
    const next = { ArrowLeft: list[(i - 1 + list.length) % list.length], ArrowRight: list[(i + 1) % list.length], Home: list[0], End: list[list.length - 1] }[e.key];
    if (!next) return;
    e.preventDefault();
    tabs.set(t.parentElement, next.dataset.value, { emit: true }); next.focus();
  });

  /* ---------- Slider ---------- */
  const num = (v, d) => (v == null || v === '' || !Number.isFinite(Number(v)) ? d : Number(v));
  function sliderRange(el) {
    const min = num(el.dataset.min, 0), max = Math.max(num(el.dataset.max, 100), min), step = Math.abs(num(el.dataset.step, 1)) || 1;
    return { min, max, step };
  }
  function sliderClamp(el, v) {
    const { min, max, step } = sliderRange(el);
    v = Math.min(max, Math.max(min, num(v, min)));
    v = min + Math.round((v - min) / step) * step;
    const decimals = (String(step).split('.')[1] || '').length;
    return Number(Math.min(max, v).toFixed(decimals));
  }
  const sliderDisabled = el => el.hasAttribute('disabled') || !!el.closest('fieldset:disabled');
  function upgradeSlider(el) {
    const { min, max } = sliderRange(el);
    const value = sliderClamp(el, el.dataset.value);
    if (el.dataset.value !== String(value)) el.dataset.value = String(value);   // re-enters via observer once, then stable
    const attr = (k, v) => { if (el.getAttribute(k) !== String(v)) el.setAttribute(k, v); };   // only real changes (avoids observer loops)
    attr('role', 'slider');
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    attr('aria-valuemin', min); attr('aria-valuemax', max); attr('aria-valuenow', value); attr('aria-disabled', sliderDisabled(el));
    upgradeIcon(el);
    let bar = el.querySelector(':scope > .sc-slider-bar');
    if (!bar) {
      bar = document.createElement('span'); bar.className = 'sc-slider-bar'; bar.setAttribute('aria-hidden', 'true');
      bar.innerHTML = '<span class="sc-slider-track"><span class="sc-slider-fill"></span></span><span class="sc-slider-thumb"></span>';
      el.append(bar);
    }
    el.style.setProperty('--p', max > min ? (value - min) / (max - min) : 0);
    const mode = el.dataset.label;
    let label = el.querySelector(':scope > .sc-slider-value');
    if (mode === 'percent' || mode === 'value') {
      if (!label) { label = document.createElement('span'); label.className = 'sc-slider-value'; label.setAttribute('aria-hidden', 'true'); label.append(textSpan('')); el.append(label); }
      const text = mode === 'percent' ? Math.round(max > min ? (value - min) / (max - min) * 100 : 0) + '%' : String(value);
      setSpan(label.firstElementChild, text);
      attr('aria-valuetext', text);
    } else { label?.remove(); if (el.hasAttribute('aria-valuetext')) el.removeAttribute('aria-valuetext'); }
  }
  const slider = {
    get(el) { return sliderClamp(el, el.dataset.value); },
    set(el, value, { emit = false } = {}) {
      if (value === null || value === '' || !Number.isFinite(Number(value))) return;   // ignore invalid values instead of jumping to min
      const before = slider.get(el), next = sliderClamp(el, value);
      el.dataset.value = String(next); upgradeSlider(el);
      if (emit && next !== before) {
        el.dispatchEvent(new CustomEvent('input', { bubbles: true, detail: { value: next } }));
        el.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: next } }));
      }
    },
  };
  function sliderFromPointer(el, e) {
    const r = el.querySelector(':scope > .sc-slider-bar').getBoundingClientRect();
    const { min, max } = sliderRange(el);
    const p = r.width ? Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) : 0;
    return sliderClamp(el, min + p * (max - min));
  }
  function sliderMove(el, value) {
    if (value === slider.get(el)) return false;
    el.dataset.value = String(value); upgradeSlider(el);
    el.dispatchEvent(new CustomEvent('input', { bubbles: true, detail: { value } }));
    return true;
  }
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest(SLIDERS);
    if (!el || sliderDisabled(el) || e.button > 0) return;
    e.preventDefault(); el.focus({ preventScroll: true });
    const start = slider.get(el);
    el.classList.add('sc-dragging');
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    sliderMove(el, sliderFromPointer(el, e));
    const move = ev => { if (ev.pointerId === e.pointerId) sliderMove(el, sliderFromPointer(el, ev)); };
    const end = ev => {
      if (ev.pointerId !== e.pointerId) return;
      el.classList.remove('sc-dragging');
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', end); el.removeEventListener('pointercancel', end);
      const value = slider.get(el);
      if (value !== start) el.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value } }));
    };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  });
  document.addEventListener('keydown', e => {
    const el = e.target.closest && e.target.closest(SLIDERS);
    if (!el || sliderDisabled(el)) return;
    const { min, max, step } = sliderRange(el), v = slider.get(el), big = Math.max(step, (max - min) / 10);
    const next = { ArrowRight: v + step, ArrowUp: v + step, ArrowLeft: v - step, ArrowDown: v - step,
                   PageUp: v + big, PageDown: v - big, Home: min, End: max }[e.key];
    if (next == null) return;
    e.preventDefault();
    if (sliderMove(el, sliderClamp(el, next))) el.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: slider.get(el) } }));
  });

  /* ---------- Counter ---------- */
  function formatNumber(n, format) {
    n = Math.round(Number(n) || 0);
    if (format !== 'short' || Math.abs(n) < 10000) return String(n);
    const units = [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']];
    for (const [v, u] of units) if (Math.abs(n) >= v) return (n / v).toFixed(n / v < 100 ? 1 : 0).replace(/\.0$/, '') + u;
    return String(n);
  }
  function counterText(el, value) {
    const v = formatNumber(value ?? el.dataset.value, el.dataset.format);
    return el.dataset.max != null ? `${v}/${formatNumber(el.dataset.max, el.dataset.format)}` : v;
  }
  const PLUS_SVG = '<svg viewBox="0 0 20 20" aria-hidden="true"><path class="o" d="M10 4v12M4 10h12" transform="translate(0 1.6)"/><path class="o" d="M10 4v12M4 10h12"/><path class="f" d="M10 4v12M4 10h12"/></svg>';

  function upgradeCounter(el) {
    upgradeIcon(el);
    let pill = el.querySelector(':scope > .sc-counter-pill');
    if (!pill) {
      pill = document.createElement('div'); pill.className = 'sc-counter-pill';
      const value = document.createElement('span'); value.className = 'sc-counter-value';
      value.append(textSpan(''));
      pill.append(value); el.append(pill);
    }
    if (!el._scAnimating) setSpan(pill.querySelector('.sc-text'), counterText(el));

    let plus = pill.querySelector('.sc-counter-plus');
    if (el.dataset.plus) {
      if (!plus) {
        plus = document.createElement('button');
        plus.className = 'sc-counter-plus'; plus.type = 'button';
        plus.setAttribute('aria-label', 'Add ' + (el.dataset.icon || ''));
        plus.innerHTML = PLUS_SVG;
        plus.addEventListener('click', e => { e.stopPropagation(); el.dispatchEvent(new CustomEvent('plus', { bubbles: true })); });
        pill.append(plus);
      }
      plus.dataset.color = el.dataset.plus;
    } else if (plus) plus.remove();
  }

  function setValue(el, value, { animate = true, duration = 450 } = {}) {
    if (el.matches(STARS)) { el.dataset.value = value; upgradeStars(el); return; }
    const kind = el.matches(SLOTS) ? 'slot' : el.matches(PROGRESS) ? 'progress' : 'counter';
    const key = kind === 'slot' ? 'count' : 'value';
    const render = { slot: v => formatNumber(v, el.dataset.format), progress: v => progressLabel(el, v), counter: v => counterText(el, v) }[kind];
    const refresh = () => ({ slot: upgradeSlot, progress: upgradeProgress, counter: upgradeCounter }[kind](el));
    const spanSel = { slot: '.sc-slot-count .sc-text', progress: '.sc-progress-label .sc-text', counter: '.sc-counter-value .sc-text' }[kind];
    const from = Number(el.dataset[key]) || 0, to = Number(value) || 0;
    const bump = () => { el.classList.remove('sc-bump'); void el.offsetWidth; el.classList.add('sc-bump'); };
    el._scAnimating = true;
    el.dataset[key] = to;                                   // progress fill animates via CSS transition
    const span = el.querySelector(spanSel);
    if (!animate || !span || from === to) { el._scAnimating = false; refresh(); if (from !== to && kind !== 'progress') bump(); return; }
    const start = performance.now();
    (function frame(now) {
      const t = Math.min((now - start) / duration, 1), eased = 1 - Math.pow(1 - t, 3);
      setSpan(span, render(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(frame);
      else { el._scAnimating = false; refresh(); if (kind !== 'progress') bump(); }
    })(start);
  }

  /* ---------- Reward Slot ---------- */
  function upgradeSlot(el) {
    upgradeIcon(el);
    const part = (cls, make) => {
      let node = el.querySelector(`:scope > .${cls}`);
      if (!node && make) { node = document.createElement('span'); node.className = cls; node.append(textSpan('')); el.append(node); }
      return node;
    };
    // count
    if (el.dataset.count != null && el.dataset.count !== '') {
      const count = part('sc-slot-count', true);
      if (!el._scAnimating) setSpan(count.querySelector('.sc-text'), formatNumber(el.dataset.count, el.dataset.format));
    } else part('sc-slot-count')?.remove();
    // tag
    if (el.dataset.tag) setSpan(part('sc-slot-tag', true).querySelector('.sc-text'), el.dataset.tag);
    else part('sc-slot-tag')?.remove();
    // state badge
    let badge = el.querySelector(':scope > .sc-slot-state');
    const stateIcon = { claimed: 'check', locked: 'lock' }[el.dataset.state];
    if (stateIcon) {
      if (!badge) { badge = document.createElement('img'); badge.className = 'sc-slot-state'; badge.alt = ''; el.append(badge); }
      const url = ASSETS + stateIcon + '.png';
      if (badge.src !== url) badge.src = url;
    } else badge?.remove();
  }

  /* ---------- Progress Bar ---------- */
  function progressLabel(el, value) {
    const max = Number(el.dataset.max) || 100, v = value ?? (Number(el.dataset.value) || 0), mode = el.dataset.label;
    if (mode === 'percent') return Math.round(Math.max(0, Math.min(v / max, 1)) * 100) + '%';
    if (mode === 'value') return `${formatNumber(v, el.dataset.format)} / ${formatNumber(max, el.dataset.format)}`;
    return mode || '';
  }
  function upgradeProgress(el) {
    upgradeIcon(el);
    let bar = el.querySelector(':scope > .sc-progress-bar');
    if (!bar) {
      bar = document.createElement('div'); bar.className = 'sc-progress-bar';
      bar.innerHTML = '<div class="sc-progress-track"><div class="sc-progress-fill"></div></div>';
      el.append(bar);
      el.setAttribute('role', 'progressbar');
    }
    const max = Number(el.dataset.max) || 100, value = Number(el.dataset.value) || 0;
    const pct = Math.max(0, Math.min(value / max, 1)) * 100;
    el.style.setProperty('--pct', pct + '%');
    el.setAttribute('aria-valuenow', value); el.setAttribute('aria-valuemax', max);

    // label
    const track = bar.querySelector('.sc-progress-track');
    let label = track.querySelector('.sc-progress-label');
    if (el.dataset.label) {
      if (!label) { label = document.createElement('span'); label.className = 'sc-progress-label'; label.append(textSpan('')); track.append(label); }
      if (!el._scAnimating) setSpan(label.firstChild, progressLabel(el));
    } else label?.remove();

    // star markers
    const stars = (el.dataset.stars || '').split(',').map(Number).filter(n => n > 0);
    let markers = [...bar.querySelectorAll('.sc-progress-marker')];
    if (markers.length !== stars.length) {
      markers.forEach(m => m.remove());
      markers = stars.map(at => {
        const m = document.createElement('div'); m.className = 'sc-progress-marker';
        m.innerHTML = `<img src="${ASSETS}star-empty.png" alt=""><img src="${ASSETS}star.png" alt="">`;
        bar.append(m); return m;
      });
    }
    markers.forEach((m, i) => {
      m.style.setProperty('--at', Math.min(stars[i], 97) + '%');
      const lit = pct >= stars[i];
      if (lit && !m.classList.contains('sc-lit') && el._scReady) el.dispatchEvent(new CustomEvent('star', { bubbles: true, detail: { index: i } }));
      m.classList.toggle('sc-lit', lit);
    });
    el._scReady = true;
  }

  /* ---------- Screen Title ---------- */
  function upgradeTitle(el) {
    let span = el.querySelector(':scope > span');
    if (!span) {
      const text = el.textContent.trim();
      el.textContent = '';
      span = document.createElement('span'); span.textContent = text; el.append(span);
    }
    el.dataset.text = span.textContent;
  }

  /* ---------- Star Rating ---------- */
  const STAR_STEP = 0.28;   // seconds between stars when popping in
  function upgradeStars(el) {
    const max = Math.max(1, Math.min(5, Number(el.dataset.max) || 3));
    const value = Math.max(0, Math.min(max, Math.round(Number(el.dataset.value) || 0)));
    let stars = [...el.querySelectorAll(':scope > .sc-star')];
    if (stars.length !== max) {
      el.textContent = '';
      stars = Array.from({ length: max }, () => {
        const s = document.createElement('span'); s.className = 'sc-star';
        s.innerHTML = `<img class="sc-star-empty" src="${ASSETS}star-empty.png" alt=""><img class="sc-star-full" src="${ASSETS}star.png" alt="">`;
        el.append(s); return s;
      });
      el.setAttribute('role', 'img');
    }
    el.setAttribute('aria-label', `${value} of ${max} stars`);

    const first = !el._scStarsReady, animate = el.hasAttribute('data-animate');
    const prev = first ? (animate ? 0 : value) : el._scStarsValue;
    let n = 0;
    stars.forEach((s, i) => {
      const on = i < value, newlyOn = on && i >= prev;
      if (newlyOn || (animate && first)) s.style.setProperty('--d', (animate && first ? i : n) * STAR_STEP + 's');   // only new stars get a delay, so repeat updates don't reset the stagger
      if (newlyOn) {
        s.classList.remove('sc-pop'); void s.offsetWidth; s.classList.add('sc-pop');
        const delay = (animate && first ? i : n) * STAR_STEP * 1000 + 200;
        setTimeout(() => el.dispatchEvent(new CustomEvent('star', { bubbles: true, detail: { index: i } })), delay);
        n++;
      }
      if (!on) s.classList.remove('sc-pop');   // clear the finished pop so the star can go back to empty
      s.classList.toggle('sc-on', on);
    });
    el._scStarsValue = value;
    el._scStarsReady = true;
  }

  /* ---------- Countdown Timer ---------- */
  const RING_C = 2 * Math.PI * 19;   // ring circumference (r = 19 in a 48 viewBox)
  const running = new Set();
  function timerText(el, left) {
    const t = Math.ceil(left), pill = el.dataset.variant === 'pill';
    const d = Math.floor(t / 86400), h = Math.floor(t % 86400 / 3600), m = Math.floor(t % 3600 / 60), sec = t % 60;
    const pad = n => String(n).padStart(2, '0');
    if (pill && el.dataset.format === 'long') return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m ${pad(sec)}s`;
    if (!pill && t < 60) return String(t);
    return h || d ? `${h + d * 24}:${pad(m)}:${pad(sec)}` : `${pill ? pad(m) : m}:${pad(sec)}`;
  }
  function renderTimer(el) {
    const left = el._scLeft, total = el._scTotal || 1;
    const span = el.querySelector('.sc-text');
    setSpan(span, timerText(el, left));
    const ring = el.querySelector('.sc-timer-ring');
    if (ring) ring.style.strokeDashoffset = RING_C * (1 - left / total);
    const warn = el.dataset.warn != null && left > 0 && Math.ceil(left) <= Number(el.dataset.warn);
    el.classList.toggle('sc-warn', warn);
    el.classList.toggle('sc-done', left <= 0);
  }
  function timerLoop() {
    const now = performance.now();
    running.forEach(el => {
      if (!el.isConnected) { running.delete(el); return; }
      const before = Math.ceil(el._scLeft);
      el._scLeft = Math.max(0, (el._scEnd - now) / 1000);
      renderTimer(el);
      const after = Math.ceil(el._scLeft);
      if (after !== before) el.dispatchEvent(new CustomEvent('tick', { bubbles: true, detail: { left: after } }));
      if (el._scLeft <= 0) { running.delete(el); el.dispatchEvent(new CustomEvent('done', { bubbles: true })); }
    });
    if (running.size) requestAnimationFrame(timerLoop);
  }
  const timer = {
    start(el) {
      if (el._scLeft <= 0) return;
      el._scEnd = performance.now() + el._scLeft * 1000;
      const wasIdle = !running.size; running.add(el);
      if (wasIdle) requestAnimationFrame(timerLoop);
    },
    pause(el) { running.delete(el); },
    reset(el, seconds) {
      if (seconds != null) el.dataset.seconds = seconds;
      el._scTotal = el._scLeft = Math.max(0, Number(el.dataset.seconds) || 0);
      renderTimer(el);
      if (running.has(el)) timer.start(el);
    },
    add(el, seconds) {
      el._scLeft = Math.max(0, el._scLeft + seconds);
      el._scTotal = Math.max(el._scTotal, el._scLeft);
      if (running.has(el)) el._scEnd = performance.now() + el._scLeft * 1000;
      renderTimer(el);
    },
  };
  function upgradeTimer(el) {
    const pill = el.dataset.variant === 'pill';
    if (!el._scTimerBuilt || el._scTimerPill !== pill) {
      el.textContent = '';
      if (pill) upgradeIcon(el);
      else el.innerHTML = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="sc-timer-bg" cx="24" cy="24" r="22.5"/><circle class="sc-timer-track" cx="24" cy="24" r="19"/><circle class="sc-timer-ring" cx="24" cy="24" r="19" stroke-dasharray="${RING_C}"/></svg>`;
      el.append(textSpan(''));
      el.setAttribute('role', 'timer');
      el._scTimerBuilt = true; el._scTimerPill = pill;
      el._scTotal = el._scLeft = Math.max(0, Number(el.dataset.seconds) || 0);
      renderTimer(el);
      if (el.dataset.autostart !== 'false') timer.start(el);
    } else if (pill) upgradeIcon(el);
  }

  /* ---------- Floating Text ---------- */
  function float(text, target, { color, size, icon, style } = {}) {
    let x = innerWidth / 2, y = innerHeight / 2;
    if (target && 'clientX' in target) { x = target.clientX; y = target.clientY; }
    else if (target instanceof Element) { const r = target.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
    else if (target && 'x' in target) { x = target.x; y = target.y; }

    const el = document.createElement('div');
    el.className = 'sc-float';
    if (color) el.dataset.color = color;
    if (size) el.dataset.size = size;
    if (style) el.dataset.style = style;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.style.setProperty('--dx', (Math.random() * 30 - 15).toFixed(1) + 'px');
    el.style.setProperty('--rot', (Math.random() * 12 - 6).toFixed(1) + 'deg');
    if (icon) { const img = document.createElement('img'); img.src = ASSETS + icon + '.png'; img.alt = ''; el.append(img); }
    el.append(textSpan(String(text)));
    el.setAttribute('aria-hidden', 'true');
    document.body.append(el);
    el.addEventListener('animationend', () => el.remove());
    setTimeout(() => el.remove(), 1500);   // safety net
    return el;
  }

  /* ---------- Popup ---------- */
  function upgradePopup(el) {
    let box = el.querySelector(':scope > .sc-popup-box');
    if (!box) {
      box = document.createElement('div'); box.className = 'sc-popup-box';
      box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
      const header = document.createElement('div'); header.className = 'sc-popup-header';
      const body = document.createElement('div'); body.className = 'sc-popup-body';
      body.append(...el.childNodes);                // move the author's content into the body
      box.append(header, body); el.append(box);
    }
    const header = box.querySelector(':scope > .sc-popup-header');
    // title
    let title = header.querySelector(':scope > .sc-text');
    if (!title) { title = textSpan(''); header.prepend(title); }
    setSpan(title, el.dataset.title || '');
    box.setAttribute('aria-label', el.dataset.title || '');
    // sub tag
    let sub = header.querySelector(':scope > .sc-popup-sub');
    if (el.dataset.sub) { if (!sub) { sub = document.createElement('span'); sub.className = 'sc-popup-sub'; header.append(sub); } sub.textContent = el.dataset.sub; }
    else sub?.remove();
    // close button
    let x = header.querySelector(':scope > .sc-icon-button');
    if (el.dataset.closable !== 'false') {
      if (!x) {
        x = document.createElement('button');
        x.className = 'sc-icon-button'; x.type = 'button';
        Object.assign(x.dataset, { color: 'red', icon: 'close', close: '' });
        x.setAttribute('aria-label', 'Close');
        header.append(x); upgradeIcon(x);
      }
    } else x?.remove();
  }

  const popup = {
    get(target) { return typeof target === 'string' ? document.getElementById(target) : target; },
    open(target) {
      const el = popup.get(target); if (!el) return;
      el.classList.remove('sc-closing'); el.hidden = false;
      el.dispatchEvent(new CustomEvent('open', { bubbles: true }));
    },
    close(target) {
      const el = popup.get(target); if (!el || el.hidden || el.classList.contains('sc-closing')) return;
      el.classList.add('sc-closing');
      setTimeout(() => { el.hidden = true; el.classList.remove('sc-closing'); el.dispatchEvent(new CustomEvent('close', { bubbles: true })); }, 160);
    },
    toggle(target) { const el = popup.get(target); el && (el.hidden ? popup.open(el) : popup.close(el)); },
  };
  // Close on [data-close], on the dark backdrop (unless data-backdrop="static"), and on Escape
  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest(POPUPS);
    if (!el) return;
    if (e.target.closest('[data-close]') || (e.target === el && el.dataset.backdrop !== 'static')) popup.close(el);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = [...document.querySelectorAll(POPUPS)].filter(p => !p.hidden);
    const top = open[open.length - 1];
    if (top && top.dataset.backdrop !== 'static') popup.close(top);
  });

  /* ---------- Screen Shell ---------- */
  // Scale the design (default 400×870) to fit, and stretch the shell to the real screen shape.
  const parentWatch = typeof ResizeObserver === 'function' ? new ResizeObserver(() => screen.fit()) : null;
  function upgradeScreen(el) {
    const W = Number(el.dataset.width) || 400, H = Number(el.dataset.height) || 870;
    const inParent = el.dataset.fit === 'parent' && el.parentElement;
    let vw = innerWidth, vh = innerHeight;
    if (inParent) {
      const p = el.parentElement;
      if (parentWatch && !p.__scWatched) { p.__scWatched = true; parentWatch.observe(p); }
      vw = p.clientWidth; vh = p.clientHeight;
    }
    if (!vw || !vh) return;
    const s = Math.min(vw / W, vh / H);
    el.style.setProperty('--sc-s', s);
    el.style.setProperty('--sc-w', vw / s + 'px');
    el.style.setProperty('--sc-h', vh / s + 'px');
  }
  const screen = {
    get(target) { return typeof target === 'string' ? document.getElementById(target) : target; },
    show(target) {
      const el = screen.get(target); if (!el) return;
      el.classList.remove('sc-closing'); upgradeScreen(el); el.hidden = false;
      el.dispatchEvent(new CustomEvent('show', { bubbles: true }));
    },
    hide(target) {
      const el = screen.get(target); if (!el || el.hidden || el.classList.contains('sc-closing')) return;
      el.classList.add('sc-closing');
      setTimeout(() => { el.hidden = true; el.classList.remove('sc-closing'); el.dispatchEvent(new CustomEvent('hide', { bubbles: true })); }, 160);
    },
    fit() { document.querySelectorAll(SCREENS).forEach(upgradeScreen); },
  };
  addEventListener('resize', () => screen.fit());
  addEventListener('orientationchange', () => setTimeout(screen.fit, 100));

  /* ---------- upgrade pipeline ---------- */
  function upgradeOne(el) {
    if (el.matches(BADGE_HOSTS)) upgradeBubble(el);
    if (el.matches(COUNTERS)) return upgradeCounter(el);
    if (el.matches(SLOTS)) return upgradeSlot(el);
    if (el.matches(POPUPS)) return upgradePopup(el);
    if (el.matches(PROGRESS)) return upgradeProgress(el);
    if (el.matches(TITLES)) return upgradeTitle(el);
    if (el.matches(STARS)) return upgradeStars(el);
    if (el.matches(TIMERS)) return upgradeTimer(el);
    if (el.matches(TOGGLES)) return upgradeToggle(el);
    if (el.matches(SLIDERS)) return upgradeSlider(el);
    if (el.matches(CHECKBOXES)) return upgradeCheckbox(el);
    if (el.matches(TABS)) return upgradeTabs(el);
    if (el.matches(SCREENS)) return upgradeScreen(el);
    if (el.matches(MESSAGES)) return upgradeText(el);
    upgradeText(el);
    if (el.matches(ICON_COMPONENTS)) upgradeIcon(el);
  }
  function upgrade(root = document) {
    if (root.matches && root.matches(ALL)) upgradeOne(root);
    root.querySelectorAll && root.querySelectorAll(ALL).forEach(upgradeOne);
  }

  // Watch for new components, label changes and attribute changes
  new MutationObserver(records => {
    for (const r of records) {
      if (r.type === 'characterData') {
        const span = r.target.parentElement;
        if (span && span.classList.contains('sc-text')) span.dataset.text = span.textContent;
        else if (span && span.parentElement && span.parentElement.matches(TITLES)) span.parentElement.dataset.text = span.textContent;
      } else if (r.type === 'attributes') {
        if (r.attributeName === 'data-badge' || r.attributeName === 'data-badge-color') {
          if (r.target.matches(BADGE_HOSTS)) upgradeBubble(r.target);
        }
        else if (r.target.matches(COUNTERS)) upgradeCounter(r.target);
        else if (r.target.matches(SLOTS)) upgradeSlot(r.target);
        else if (r.target.matches(POPUPS)) upgradePopup(r.target);
        else if (r.target.matches(PROGRESS)) upgradeProgress(r.target);
        else if (r.target.matches(STARS)) upgradeStars(r.target);
        else if (r.target.matches(SCREENS)) upgradeScreen(r.target);
        else if (r.target.matches(TIMERS)) { if (r.attributeName === 'data-seconds') timer.reset(r.target); else upgradeTimer(r.target); }
        else if (r.target.matches(TOGGLES)) upgradeToggle(r.target);
        else if (r.target.matches(SLIDERS)) upgradeSlider(r.target);
        else if (r.target.matches(CHECKBOXES)) upgradeCheckbox(r.target);
        else if (r.target.matches(TABS)) upgradeTabs(r.target);
        else if (r.target.matches('.sc-tabs > button')) upgradeTabs(r.target.parentElement);
        else if (r.target.matches(ICON_COMPONENTS)) upgradeIcon(r.target);
      } else {
        r.addedNodes.forEach(n => n.nodeType === Node.ELEMENT_NODE && upgrade(n));
        if (r.target.matches && r.target.matches(`${TEXT_COMPONENTS}, ${MESSAGES}`)) upgradeText(r.target);
        if (r.target.matches && r.target.matches(BADGE_HOSTS)) upgradeBubble(r.target);
        if (r.target.matches && r.target.matches(TOGGLES)) upgradeToggle(r.target);
        if (r.target.matches && r.target.matches(CHECKBOXES)) upgradeCheckbox(r.target);
        if (r.target.matches && r.target.matches(TABS)) upgradeTabs(r.target);
        if (r.target.matches && r.target.matches('.sc-tabs > button')) upgradeTabs(r.target.parentElement);
      }
    }
  }).observe(document.documentElement, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ['data-icon', 'data-value', 'data-max', 'data-plus', 'data-format', 'data-count', 'data-tag', 'data-state', 'data-title', 'data-sub', 'data-closable', 'data-label', 'data-stars', 'data-seconds', 'data-variant', 'data-badge', 'data-badge-color', 'data-checked', 'data-min', 'data-step', 'disabled', 'data-panel', 'data-width', 'data-height', 'data-fit'],
  });

  // Press feedback (delegated, so it works for dynamically added components)
  let pressed = null;
  const release = () => { if (pressed) pressed.classList.remove('sc-pressed'); pressed = null; };
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest(PRESSABLE);
    if (!el || el.matches(':disabled')) return;
    pressed = el; el.classList.add('sc-pressed');
  });
  ['pointerup', 'pointercancel'].forEach(t => document.addEventListener(t, release));
  document.addEventListener('pointerleave', release, true);
  document.addEventListener('touchstart', () => {}, { passive: true });

  /* ---------- Public API ---------- */
  window.SC = Object.assign(window.SC || {}, {
    version: '0.16.0',
    assets: ASSETS,
    upgrade,
    /** Change a component's label: SC.setLabel(el, 'Claimed') */
    setLabel(el, text) {
      if (el.matches(TITLES)) { upgradeTitle(el); el.firstElementChild.textContent = text; el.dataset.text = text; return; }
      const span = el.querySelector(el.matches(TEXT_COMPONENTS) ? ':scope > .sc-text' : '.sc-text');
      if (span) setSpan(span, text); else { el.append(text); upgradeText(el); }
    },
    /** Change a component's icon: SC.setIcon(el, 'check') */
    setIcon(el, name) { el.dataset.icon = name; upgradeIcon(el); },
    /** Set a corner count; null removes it. Color is optional and otherwise preserved. */
    setBadge(el, count, color) {
      if (!el.matches(BADGE_HOSTS)) return;
      if (count == null) el.removeAttribute('data-badge'); else el.dataset.badge = count;
      if (color != null) el.dataset.badgeColor = color;
      upgradeBubble(el);
    },
    /** Change a counter's value or a slot's count with a count animation: SC.setValue(el, 350000) */
    setValue,
    /** Play an element's entrance animation again: SC.replay(title) */
    replay(el) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; },
    /** Pop elements in one after another: SC.popIn(container.children, { stagger: 0.07 }) */
    popIn(elements, { stagger = 0.07, delay = 0 } = {}) {
      [...elements].forEach((el, i) => {
        el.classList.remove('sc-pop-in'); void el.offsetWidth;
        el.style.setProperty('--sc-delay', (delay + i * stagger) + 's');
        el.classList.add('sc-pop-in');
      });
    },
    /** Format a number like counters do: SC.format(12500, 'short') → "12.5K" */
    format: formatNumber,
    /** Popups: SC.popup.open('id') · SC.popup.close('id') · SC.popup.toggle('id') */
    popup,
    /** Full-page screens: SC.screen.show('win') · SC.screen.hide('win') · SC.screen.fit() */
    screen,
    /** Timers: SC.timer.start(el) · pause(el) · reset(el, seconds?) · add(el, seconds) */
    timer,
    /** Settings switches: SC.toggle.get(el) · set(el, boolean, {emit?}) · toggle(el, {emit?}) */
    toggle,
    /** Set a settings switch; alias of SC.toggle.set. */
    setChecked: toggle.set,
    /** Volume-style sliders: SC.slider.get(el) · SC.slider.set(el, 70, {emit?}) */
    slider,
    /** Checkboxes: SC.checkbox.get(el) · set(el, boolean, {emit?}) · toggle(el, {emit?}) */
    checkbox,
    /** Segmented tabs: SC.tabs.get(el) · SC.tabs.set(el, value, {emit?}) */
    tabs,
    /** Floating feedback text: SC.float('+50', event | element | {x, y}, { color, size, icon, style }) */
    float,
    /** URL of an icon in the kit: SC.icon('coin') */
    icon(name) { return ASSETS + name + '.png'; },
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => upgrade());
  else upgrade();
})();
