// Keyboard nav: press 'g' then a section letter to jump.
// Shortcuts mirror data-key attrs in the nav.
(() => {
  const links = document.querySelectorAll('[data-key]');
  const map = new Map();
  links.forEach(a => map.set(a.dataset.key, a));

  let pending = false;
  let timer = null;

  document.addEventListener('keydown', (e) => {
    // Ignore when typing in inputs / contenteditable
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (!pending && e.key.toLowerCase() === 'g') {
      pending = true;
      clearTimeout(timer);
      timer = setTimeout(() => { pending = false; }, 900);
      return;
    }

    if (pending) {
      const target = map.get(e.key.toLowerCase());
      pending = false;
      clearTimeout(timer);
      if (target) {
        e.preventDefault();
        if (target.getAttribute('target') === '_blank') {
          window.open(target.href, '_blank', 'noopener');
        } else {
          target.click();
        }
      }
    }
  });
})();
