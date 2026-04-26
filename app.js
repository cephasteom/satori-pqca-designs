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

// ─── panel minimise / remove ──────────────────────────────────

const workspace     = document.querySelector('.workspace');
const editorPanel   = document.querySelector('.editor-panel');
const consolePanel  = document.querySelector('.console-panel');
const canvasPanel   = document.querySelector('.canvas-panel');
const closedList    = document.getElementById('closed-list');
const sidebarClosed = document.getElementById('sidebar-closed');

function updateWorkspaceLayout() {
  const editorMin   = editorPanel.classList.contains('panel--minimised');
  const editorGone  = editorPanel.classList.contains('panel--removed');
  const consoleMin  = consolePanel.classList.contains('panel--minimised');
  const consoleGone = consolePanel.classList.contains('panel--removed');
  const canvasMin   = canvasPanel.classList.contains('panel--minimised');
  const canvasGone  = canvasPanel.classList.contains('panel--removed');

  const leftEmpty  = editorGone  && consoleGone;
  const leftStrip  = !leftEmpty  && (editorMin  || editorGone)  && (consoleMin  || consoleGone);
  const rightEmpty = canvasGone;
  const rightStrip = !rightEmpty && canvasMin;

  workspace.classList.toggle('workspace--left-empty',     leftEmpty);
  workspace.classList.toggle('workspace--left-collapsed', !leftEmpty && leftStrip);
  workspace.classList.toggle('workspace--right-empty',    rightEmpty);
  workspace.classList.toggle('workspace--right-collapsed', rightStrip && !leftEmpty);
}

document.querySelectorAll('.dot-amber').forEach((dot) => {
  dot.addEventListener('click', () => {
    const panel = dot.closest('.editor-panel, .console-panel, .canvas-panel');
    if (!panel) return;
    panel.classList.toggle('panel--minimised');
    updateWorkspaceLayout();
  });
});

document.querySelectorAll('.dot-red').forEach((dot) => {
  dot.addEventListener('click', () => {
    const panel = dot.closest('.editor-panel, .console-panel, .canvas-panel');
    if (!panel) return;

    panel.classList.remove('panel--minimised', 'panel--fullscreen');
    panel.classList.add('panel--removed');

    const name = panel.querySelector('.panel-title').textContent.trim();
    const btn  = document.createElement('button');
    btn.className   = 'restore-btn';
    btn.textContent = name;
    btn.addEventListener('click', () => {
      panel.classList.remove('panel--removed');
      btn.remove();
      sidebarClosed.classList.toggle('has-items', closedList.children.length > 0);
      updateWorkspaceLayout();
    });

    closedList.appendChild(btn);
    sidebarClosed.classList.add('has-items');
    updateWorkspaceLayout();
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
