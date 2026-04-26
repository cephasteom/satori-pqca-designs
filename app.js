// ─── modal ────────────────────────────────────────────────────

const modalOverlay = document.getElementById('modal-overlay');

document.getElementById('about-btn').addEventListener('click', () => {
  modalOverlay.classList.remove('hidden');
});

document.getElementById('modal-close').addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  modalOverlay.classList.add('hidden');
  document.querySelectorAll('.panel--fullscreen')
    .forEach((p) => p.classList.remove('panel--fullscreen'));
});

// ─── preset buttons ───────────────────────────────────────────

const presetBtns = document.querySelectorAll('.preset-btn');

presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ─── panel fullscreen ─────────────────────────────────────────

document.querySelectorAll('.dot-green').forEach((dot) => {
  dot.addEventListener('click', () => {
    const panel = dot.closest('.editor-panel, .console-panel, .canvas-panel');
    if (panel) panel.classList.toggle('panel--fullscreen');
  });
});

// ─── canvas resize ────────────────────────────────────────────

const canvas = document.getElementById('viz-canvas');

function resizeCanvas() {
  const parent = canvas.parentElement;
  const titlebar = parent.querySelector('.panel-titlebar');
  canvas.width  = parent.clientWidth;
  canvas.height = parent.clientHeight - titlebar.clientHeight;
}

const resizeObserver = new ResizeObserver(resizeCanvas);
resizeObserver.observe(canvas.parentElement);
resizeCanvas();
