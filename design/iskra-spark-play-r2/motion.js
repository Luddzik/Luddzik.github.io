(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector('.motion-toggle');
  let paused = false;
  try { paused = localStorage.getItem('iskra-motion-paused') === 'true'; } catch {}
  const enabled = () => !paused && !reduced.matches;
  const active = new Set();
  const animate = (el, frames, options) => {
    if (!enabled() || !el?.animate) return;
    const animation = el.animate(frames, options);
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => active.delete(animation));
  };
  const sync = () => {
    document.body.classList.toggle('paused', !enabled());
    if (!enabled()) { active.forEach(a => a.finish()); resetArt(); }
    if (toggle) {
      toggle.hidden = false;
      toggle.disabled = reduced.matches;
      toggle.textContent = reduced.matches ? 'Reduced motion enabled' : paused ? 'Resume motion' : 'Pause motion';
      toggle.setAttribute('aria-pressed', String(!enabled()));
    }
  };
  const hero = document.querySelector('.hero');
  const crew = hero?.querySelector('.crew');
  let frame = 0, px = 0, py = 0;
  function resetArt() { cancelAnimationFrame(frame); frame = 0; crew?.style.removeProperty('translate'); }
  if (hero && crew) {
    hero.addEventListener('pointermove', e => {
      if (!enabled() || !fine.matches) return;
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left - r.width / 2) / r.width * 12;
      py = (e.clientY - r.top - r.height / 2) / r.height * 10;
      if (!frame) frame = requestAnimationFrame(() => { crew.style.translate = px + 'px ' + py + 'px'; frame = 0; });
    }, {passive:true});
    hero.addEventListener('pointerleave', resetArt);
  }
  toggle?.addEventListener('click', () => { paused = !paused; try { localStorage.setItem('iskra-motion-paused', String(paused)); } catch {} sync(); });
  reduced.addEventListener('change', sync);
  fine.addEventListener('change', resetArt);
  sync();
  const ease = 'cubic-bezier(.16,1,.3,1)';
  animate(document.querySelector('.brand'), [{opacity:0,transform:'translateY(-10px) rotate(-4deg)'},{opacity:1,transform:'none'}], {duration:550,easing:ease});
  animate(document.querySelector('.hero .copy'), [{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'none'}], {duration:650,easing:ease});
  animate(crew, [{opacity:0,transform:'translateY(24px) rotate(-8deg)'},{opacity:1,transform:'rotate(-5deg)'}], {duration:800,easing:ease});
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target, [{opacity:.25,transform:'translateY(24px)'},{opacity:1,transform:'none'}], {duration:650,easing:ease});
      reveal.unobserve(entry.target);
    }), {threshold:.12});
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
    const ticker = document.querySelector('.ticker');
    if (ticker) new IntersectionObserver(entries => entries.forEach(entry => ticker.classList.toggle('offscreen', !entry.isIntersecting))).observe(ticker);
  }
  document.addEventListener('visibilitychange', () => { document.body.classList.toggle('tab-hidden', document.hidden); if (document.hidden) resetArt(); });
  if (!window.HTMLDialogElement) return;
  const links = [...document.querySelectorAll('.image-link')];
  if (!links.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery';
  dialog.setAttribute('aria-label', 'NeuroShift screenshot viewer');
  dialog.innerHTML = '<div class="gallery-tools"><span class="gallery-caption" aria-live="polite"></span><button type="button" class="gallery-close" autofocus aria-label="Close screenshot viewer">Close ×</button></div><img alt=""><div class="gallery-bottom"><button type="button" class="gallery-prev" aria-label="Previous screenshot">← Previous</button><span>Development gameplay</span><button type="button" class="gallery-next" aria-label="Next screenshot">Next →</button></div>';
  document.body.append(dialog);
  let selected = 0;
  const show = i => {
    selected = (i + links.length) % links.length;
    const img = dialog.querySelector('img');
    img.src = links[selected].href;
    img.alt = links[selected].querySelector('img').alt;
    dialog.querySelector('.gallery-caption').textContent = 'NeuroShift / ' + (selected + 1) + ' of ' + links.length;
    animate(img, [{opacity:.3,transform:'scale(.985)'},{opacity:1,transform:'scale(1)'}], {duration:240,easing:'ease-out'});
  };
  links.forEach((link,i) => link.addEventListener('click', e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); show(i); dialog.showModal(); document.body.classList.add('gallery-open');
    animate(dialog, [{opacity:0,transform:'translateY(18px) scale(.98)'},{opacity:1,transform:'none'}], {duration:280,easing:ease});
  }));
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev').addEventListener('click', () => show(selected - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => show(selected + 1));
  dialog.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); show(selected + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); show(selected - 1); } });
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('gallery-open'); links[selected].focus({preventScroll:true}); });
})();