// TMNT: Splintered Fate - Powers Tab
// Type/slot/tier/search filters, card grid, synergy highlights

import { powers } from '../data/powers.js';
import { state, togglePower, setFilter, toggleTypeFilter, on } from '../state.js';
import { checkPrerequisites } from '../engine.js';

const TYPE_ORDER = ['water', 'flame', 'ooze', 'utrom', 'ninja', 'light', 'dark', 'robotics', 'legendary'];
const TYPE_LABELS = {
  water: 'Water', flame: 'Flame', ooze: 'Ooze', utrom: 'Utrom',
  ninja: 'Ninja', light: 'Light', dark: 'Dark', robotics: 'Robotics', legendary: 'Legendary'
};
const SLOT_LABELS = {
  all: 'All', strike: 'Strike', dash: 'Dash', ability: 'Ability', passive: 'Passive', special: 'Special'
};

// Build a combo lookup for legendaries
const comboLookup = new Map();
for (const p of powers) {
  if (p.combo) comboLookup.set(p.name, p.combo);
}

export function initPowersTab() {
  on('tab-changed', (tab) => {
    if (tab === 'powers') render();
  });
  on('filter-changed', () => {
    if (state.activeTab === 'powers') renderGrid();
  });
  on('build-changed', () => {
    if (state.activeTab === 'powers') renderGrid();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;

  const activeTypes = state.filters.types;
  const allSelected = activeTypes.size === 0;

  let html = '<div class="filter-group">';
  html += '<span class="filter-group-label">Type</span>';
  html += `<button class="filter-pill ${allSelected ? 'active' : ''}" data-filter="all">All</button>`;

  for (const type of TYPE_ORDER) {
    const isActive = activeTypes.has(type);
    html += `<button class="filter-pill ${isActive ? 'active' : ''}" data-type="${type}" data-filter="type">${TYPE_LABELS[type]}</button>`;
  }
  html += '</div>';

  html += '<div class="filter-sep"></div>';

  html += '<div class="filter-group">';
  html += '<span class="filter-group-label">Slot</span>';
  for (const [key, label] of Object.entries(SLOT_LABELS)) {
    html += `<button class="filter-pill ${state.filters.slot === key ? 'active' : ''}" data-filter="slot" data-slot="${key}">${label}</button>`;
  }
  html += '</div>';

  html += '<div class="filter-sep"></div>';

  html += '<div class="filter-group">';
  html += '<span class="filter-group-label">Tier</span>';
  html += `<button class="filter-pill ${state.filters.tier === 'all' ? 'active' : ''}" data-filter="tier" data-tier="all">All</button>`;
  html += `<button class="filter-pill ${state.filters.tier === 'initial' ? 'active' : ''}" data-filter="tier" data-tier="initial">Initial</button>`;
  html += `<button class="filter-pill ${state.filters.tier === 'secondary' ? 'active' : ''}" data-filter="tier" data-tier="secondary">Secondary</button>`;
  html += '</div>';

  html += '<div class="filter-sep"></div>';

  html += `<input type="text" class="search-input" placeholder="Search powers..." value="${state.filters.search}" id="power-search">`;

  container.innerHTML = html;

  // Bind filter events
  container.querySelectorAll('[data-filter="all"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter('types', new Set());
    });
  });

  container.querySelectorAll('[data-filter="type"]').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleTypeFilter(btn.dataset.type);
    });
  });

  container.querySelectorAll('[data-filter="slot"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter('slot', btn.dataset.slot);
    });
  });

  container.querySelectorAll('[data-filter="tier"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter('tier', btn.dataset.tier);
    });
  });

  const searchInput = document.getElementById('power-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      setFilter('search', e.target.value);
    });
  }
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  const filtered = getFilteredPowers();
  const { available } = checkPrerequisites(state.powers);
  const availableNames = new Set(available.map(p => p.name));
  const inBuild = new Set(state.powers);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Powers Found</div>
        <div class="empty-state-desc">Try adjusting your filters</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(power => {
    const isInBuild = inBuild.has(power.name);
    const isAvailable = availableNames.has(power.name);
    const isLocked = power.tier === 'secondary' && !isAvailable && !isInBuild;

    let classes = 'card';
    if (isInBuild) classes += ' in-build';
    if (isAvailable && !isInBuild) classes += ' available-highlight';
    if (isLocked) classes += ' locked';

    let badges = '';
    if (power.type === 'legendary' && power.combo) {
      badges += `<div class="legendary-combo" data-type="legendary">`;
      badges += power.combo.map(el =>
        `<span class="badge badge-type" data-type="${el}">${TYPE_LABELS[el]}</span>`
      ).join('<span class="legendary-combo-plus">+</span>');
      badges += `</div>`;
    }

    let prereqHtml = '';
    if (power.requires) {
      const met = isAvailable || isInBuild;
      prereqHtml = `<div class="card-prereq ${met ? 'card-prereq-met' : ''}">${power.requires}</div>`;
    }
    if (power.requiredPowers) {
      const met = isAvailable || isInBuild;
      prereqHtml = `<div class="card-prereq ${met ? 'card-prereq-met' : ''}">Requires: ${power.requiredPowers.join(' + ')}</div>`;
    }

    let availBadge = '';
    if (isAvailable && !isInBuild) {
      availBadge = '<span class="badge badge-available">Available</span>';
    }

    return `
      <div class="${classes}" data-type="${power.type}" data-power="${power.name}">
        <div class="card-header">
          <span class="card-name">${power.name}</span>
          <span class="card-type-dot"></span>
        </div>
        <div class="card-effect">${power.effect}</div>
        ${prereqHtml}
        <div class="card-meta">
          <span class="badge badge-type" data-type="${power.type}">${TYPE_LABELS[power.type]}</span>
          <span class="badge badge-slot">${power.slot}</span>
          <span class="badge ${power.tier === 'secondary' ? 'badge-tier-secondary' : 'badge-tier'}">${power.tier}</span>
          ${availBadge}
          ${badges}
        </div>
      </div>
    `;
  }).join('');

  // Bind click events
  container.querySelectorAll('.card[data-power]').forEach(card => {
    card.addEventListener('click', () => {
      const powerName = card.dataset.power;
      if (!card.classList.contains('locked')) {
        togglePower(powerName);
      }
    });
  });
}

function getFilteredPowers() {
  const { types, slot, tier, search } = state.filters;
  const allSelected = types.size === 0;
  const searchLower = search.toLowerCase();

  return powers.filter(power => {
    // Search filter
    if (searchLower && !power.name.toLowerCase().includes(searchLower) &&
        !power.effect.toLowerCase().includes(searchLower)) {
      return false;
    }

    // Slot filter
    if (slot !== 'all' && power.slot !== slot) return false;

    // Tier filter
    if (tier !== 'all' && power.tier !== tier) return false;

    // Type filter
    if (allSelected) return true;

    if (power.type === 'legendary') {
      return filterLegendary(power, types);
    }

    return types.has(power.type);
  });
}

function filterLegendary(power, activeTypes) {
  const legendaryOn = activeTypes.has('legendary');
  const elementTypes = TYPE_ORDER.filter(t => t !== 'legendary' && activeTypes.has(t));

  // Legendary explicitly selected, no element types
  if (legendaryOn && elementTypes.length === 0) return true;

  // Check combo match
  const combo = power.combo;
  if (!combo) return legendaryOn;

  if (legendaryOn) {
    // When legendary is toggled on, show if ANY combo element matches
    return combo.some(el => activeTypes.has(el));
  } else {
    // When legendary is NOT toggled, show if ALL combo elements match
    return combo.every(el => activeTypes.has(el));
  }
}
