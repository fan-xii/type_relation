let selectedTypeId = null;
let particles = [];
let particleAnimId = null;

function init() {
  initTheme();
  renderTypeGrid();
  initParticles();
}

/* ========================
   THEME
   ======================== */
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  updateThemeIcon(saved);

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  document.getElementById('theme-toggle').querySelector('.toggle-icon').textContent =
    theme === 'dark' ? '☾' : '☀';
}

/* ========================
   PARTICLES
   ======================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  const count = Math.min(60, Math.floor(window.innerWidth * window.innerHeight / 20000));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 140, 248, ${currentOpacity})`;
      ctx.fill();

      // Subtle glow
      if (p.size > 1.2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${currentOpacity * 0.08})`;
        ctx.fill();
      }
    });

    particleAnimId = requestAnimationFrame(animate);
  }

  animate();
}

/* ========================
   TYPE GRID
   ======================== */
function renderTypeGrid() {
  const grid = document.getElementById('type-grid');
  grid.innerHTML = '';

  TYPE_DATA.forEach(type => {
    const card = document.createElement('div');
    card.className = 'type-card';
    card.dataset.typeId = type.id;
    card.style.setProperty('--card-glow', hexToRgba(type.color, 0.2));
    card.style.setProperty('--card-border', hexToRgba(type.color, 0.5));
    card.addEventListener('click', () => onTypeClick(type.id));

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'type-icon-wrapper';
    iconWrapper.style.color = type.color;

    const iconImg = document.createElement('img');
    iconImg.src = type.icon;
    iconImg.alt = type.name;
    iconImg.draggable = false;
    iconWrapper.appendChild(iconImg);

    const name = document.createElement('span');
    name.className = 'type-name';
    name.textContent = type.name;

    const check = document.createElement('span');
    check.className = 'type-check';
    check.textContent = '✓';

    card.appendChild(iconWrapper);
    card.appendChild(name);
    card.appendChild(check);
    grid.appendChild(card);
  });
}

/* ========================
   TYPE SELECTION
   ======================== */
function onTypeClick(typeId) {
  if (selectedTypeId === typeId) {
    selectedTypeId = null;
    updateSelectionUI();
    showEmptyState();
    return;
  }
  selectedTypeId = typeId;
  updateSelectionUI();
  showDetail();
}

function updateSelectionUI() {
  document.querySelectorAll('.type-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.typeId === selectedTypeId);
  });
}

function showEmptyState() {
  document.getElementById('empty-state').style.display = 'flex';
  document.getElementById('detail-content').style.display = 'none';
}

function showDetail() {
  document.getElementById('empty-state').style.display = 'none';
  const detail = document.getElementById('detail-content');
  detail.style.display = 'block';

  const selectedType = getTypeById(selectedTypeId);

  // Glow behind badge
  const glow = document.querySelector('.selected-glow');
  if (glow) {
    glow.style.backgroundColor = selectedType.color;
  }

  // Badge
  const badge = document.getElementById('selected-type-badge');
  badge.style.backgroundColor = hexToRgba(selectedType.color, 0.25);
  badge.style.color = selectedType.color;
  badge.style.borderColor = hexToRgba(selectedType.color, 0.3);
  const badgeIcon = document.createElement('img');
  badgeIcon.src = selectedType.icon;
  badgeIcon.alt = '';
  badgeIcon.className = 'badge-icon';
  badgeIcon.draggable = false;
  badge.innerHTML = '';
  badge.appendChild(badgeIcon);
  badge.appendChild(document.createTextNode(selectedType.name + '系'));

  // Compute relations
  const superEffective = [];
  const weakAgainst = [];
  const resisted = [];
  const resistantTo = [];
  const immune = [];

  TYPE_DATA.forEach(defType => {
    const asAttacker = getRelation(selectedTypeId, defType.id);
    const asDefender = getRelation(defType.id, selectedTypeId);

    if (asAttacker === 2) superEffective.push(defType);
    if (asAttacker === 0) immune.push(defType);
    if (asAttacker === 0.5) resisted.push(defType);
    if (asDefender === 2) weakAgainst.push(defType);
    if (asDefender === 0.5) resistantTo.push(defType);
  });

  renderRelationList('super-effective-list', superEffective);
  renderRelationList('weak-against-list', weakAgainst);
  renderRelationList('resisted-list', resisted);
  renderRelationList('resistant-to-list', resistantTo);

  const immuneBlock = document.getElementById('immune-block');
  if (immune.length > 0) {
    immuneBlock.style.display = '';
    renderRelationList('immune-list', immune);
  } else {
    immuneBlock.style.display = 'none';
  }

  // Re-trigger block animations
  document.querySelectorAll('.relation-block').forEach((block, i) => {
    block.style.animation = 'none';
    block.offsetHeight; // force reflow
    block.style.animation = `blockSlide 0.5s ease-out ${i * 0.05}s backwards`;
  });
}

/* ========================
   RELATION LIST
   ======================== */
function renderRelationList(listId, types) {
  const list = document.getElementById(listId);
  list.innerHTML = '';

  if (types.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'empty-relation';
    empty.textContent = '无';
    list.appendChild(empty);
    return;
  }

  types.forEach((type, index) => {
    const item = document.createElement('span');
    item.className = 'relation-item';
    item.style.setProperty('--item-glow', hexToRgba(type.color, 0.25));
    item.style.setProperty('--item-border', hexToRgba(type.color, 0.4));
    item.style.animationDelay = `${index * 0.04}s`;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      onTypeClick(type.id);
    });

    const dot = document.createElement('span');
    dot.className = 'item-color-dot';
    dot.style.backgroundColor = type.color;

    const iconImg = document.createElement('img');
    iconImg.src = type.icon;
    iconImg.alt = '';
    iconImg.className = 'item-icon';
    iconImg.draggable = false;
    item.appendChild(dot);
    item.appendChild(iconImg);
    item.appendChild(document.createTextNode(type.name));
    list.appendChild(item);
  });
}

/* ========================
   UTILITY
   ======================== */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

document.addEventListener('DOMContentLoaded', init);
