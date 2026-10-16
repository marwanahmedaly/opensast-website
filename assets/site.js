const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('#navigation');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); }
  });
}
const buttons = document.querySelectorAll('[data-cohort]');
buttons.forEach(button => button.addEventListener('click', () => {
  buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  document.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = panel.dataset.panel !== button.dataset.cohort; });
}));

// Documentation enhancements remain usable without JavaScript or external assets.
const docSearch = document.querySelector('#doc-search');
if (docSearch) {
  docSearch.addEventListener('input', () => {
    const query = docSearch.value.trim().toLowerCase();
    let count = 0;
    document.querySelectorAll('[data-doc-topic]').forEach(link => {
      const matches = query.split(/\s+/).every(word => link.dataset.docTopic.includes(word));
      link.hidden = !matches;
      if (matches) count++;
    });
    document.querySelector('#doc-search-status').textContent = query ? `${count} matching guide${count === 1 ? '' : 's'}` : '';
  });
}
document.querySelectorAll('[data-copy-code]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const value = button.parentElement.querySelector('code').textContent;
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        copied = true;
      } else {
        const field = document.createElement('textarea');
        field.value = value;
        field.style.position = 'fixed';
        field.style.left = '-9999px';
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand('copy');
        field.remove();
        button.focus();
      }
    } catch (_) { copied = false; }
    button.textContent = copied ? 'Copied' : 'Select code to copy';
    setTimeout(() => { button.textContent = 'Copy'; }, 2500);
  });
});

// Keep the full guide index out of the way of the first step on small screens.
const guideIndex = document.querySelector('[data-doc-guides]');
if (guideIndex && window.matchMedia('(max-width:750px)').matches) guideIndex.open = false;
