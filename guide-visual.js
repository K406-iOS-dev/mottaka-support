/* Standard image links and disclosure elements still work without JavaScript. */
(() => {
  const dialog = document.getElementById('guide-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const caption = document.getElementById('lightbox-caption');
  let opener;
  document.querySelectorAll('.guide-zoom').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = image.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); if (opener) opener.focus(); });
  // Links into detailed copy reveal the containing disclosure before scrolling.
  function revealAnchor() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target.parentElement;
    while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; }
    target.scrollIntoView();
  }
  window.addEventListener('hashchange', revealAnchor);
  if (location.hash) revealAnchor();
})();
