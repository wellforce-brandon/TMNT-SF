// TMNT: Splintered Fate - Powers Tab
// Type/slot/tier/search filters, card grid, synergy highlights

import { powers } from '../data/powers.js';
import { state, setPowerLevel, setFilter, toggleTypeFilter, on } from '../state.js';
import { checkPrerequisites, getDependentsInBuild, CATEGORY_REQUIRES_LABELS } from '../engine.js';
import { renderUpgradeCard } from './format.js';

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

// ---- Tier Depth (pizza slices) ----
// Compute tier depth from prerequisite chains:
//   Tier 1: initial powers
//   Tier 2: secondary powers whose prerequisite is initial or a generic condition
//   Tier 3: secondary powers whose prerequisite is itself secondary
const powerTierLookup = new Map();
for (const p of powers) powerTierLookup.set(p.name, p.tier);

function getTierDepth(power) {
  if (power.tier === 'initial') return 1;
  if (!power.requires) return 2; // secondary with no requires → tier 2

  // Extract power name from "After [PowerName]" pattern
  const reqName = power.requires.replace(/^After\s+/, '');
  const reqTier = powerTierLookup.get(reqName);

  // If the prerequisite is a known secondary power → tier 3
  if (reqTier === 'secondary') return 3;

  // Otherwise (initial power or generic condition like "Dealing Water Damage") → tier 2
  return 2;
}

const PIZZA_SLICE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 L22 20 Q17 22 12 22 Q7 22 2 20 Z"/><circle cx="10" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="8" r="1" fill="currentColor" stroke="none"/></svg>`;

function tierBadge(power) {
  const depth = getTierDepth(power);
  const cls = depth === 3 ? 'badge-tier-3' : depth === 2 ? 'badge-tier-2' : 'badge-tier-1';
  const slices = PIZZA_SLICE.repeat(depth);
  return `<span class="badge ${cls}" title="Tier ${depth}">${slices}</span>`;
}

// Track discovery state to detect when it toggles (triggers full filter re-render)
let lastDiscovery = false;
function discoveryChanged() {
  if (state.filters.discovery !== lastDiscovery) {
    lastDiscovery = state.filters.discovery;
    return true;
  }
  return false;
}

export function initPowersTab() {
  on('tab-changed', (tab) => {
    if (tab === 'powers') render();
  });
  on('filter-changed', () => {
    if (state.activeTab === 'powers') {
      // Re-render full filters when discovery changes (Tier pills need disabled state update)
      if (discoveryChanged()) {
        renderFilters();
      } else {
        updateFilterPills();
      }
      renderGrid();
    }
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

  html += `<div class="filter-group ${state.filters.discovery ? 'discovery-disabled' : ''}">`;
  html += '<span class="filter-group-label">Tier</span>';
  html += `<button class="filter-pill ${state.filters.tier === 'all' ? 'active' : ''}" data-filter="tier" data-tier="all" ${state.filters.discovery ? 'disabled' : ''}>All</button>`;
  html += `<button class="filter-pill ${state.filters.tier === 'initial' ? 'active' : ''}" data-filter="tier" data-tier="initial" ${state.filters.discovery ? 'disabled' : ''}>Initial</button>`;
  html += `<button class="filter-pill ${state.filters.tier === 'secondary' ? 'active' : ''}" data-filter="tier" data-tier="secondary" ${state.filters.discovery ? 'disabled' : ''}>Secondary</button>`;
  html += '</div>';

  html += '<div class="filter-sep"></div>';

  html += '<div class="filter-group">';
  html += '<span class="filter-group-label">View</span>';
  html += `<button class="filter-pill ${state.filters.discovery ? 'active' : ''}" data-filter="discovery">Discovery</button>`;
  html += '</div>';

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

  container.querySelectorAll('[data-filter="discovery"]').forEach(btn => {
    btn.addEventListener('click', () => {
      setFilter('discovery', !state.filters.discovery);
    });
  });

}

function updateFilterPills() {
  const container = document.getElementById('filter-bar');
  if (!container) return;

  const activeTypes = state.filters.types;
  const allSelected = activeTypes.size === 0;

  // Update type pills
  container.querySelectorAll('[data-filter="all"]').forEach(btn => {
    btn.classList.toggle('active', allSelected);
  });
  container.querySelectorAll('[data-filter="type"]').forEach(btn => {
    btn.classList.toggle('active', activeTypes.has(btn.dataset.type));
  });

  // Update slot pills
  container.querySelectorAll('[data-filter="slot"]').forEach(btn => {
    btn.classList.toggle('active', state.filters.slot === btn.dataset.slot);
  });

  // Update tier pills
  container.querySelectorAll('[data-filter="tier"]').forEach(btn => {
    btn.classList.toggle('active', state.filters.tier === btn.dataset.tier);
  });

  // Update discovery pill
  container.querySelectorAll('[data-filter="discovery"]').forEach(btn => {
    btn.classList.toggle('active', state.filters.discovery);
  });
}

// Brief shake + tooltip when trying to deselect a prerequisite with active dependents
function showDependencyWarning(cardEl, dependentNames) {
  cardEl.classList.add('shake');
  setTimeout(() => cardEl.classList.remove('shake'), 400);

  // Show tooltip with dependent names
  let tooltip = cardEl.querySelector('.dep-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'dep-tooltip';
    cardEl.appendChild(tooltip);
  }
  tooltip.textContent = `Required by: ${dependentNames.join(', ')}`;
  tooltip.classList.add('visible');
  setTimeout(() => tooltip.classList.remove('visible'), 2500);
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  const filtered = getFilteredPowers();
  const { available } = checkPrerequisites(state.powers);
  const availableNames = new Set(available.map(p => p.name));
  const inBuild = new Set(state.powers);

  if (filtered.length === 0) {
    const desc = state.filters.discovery
      ? 'Add initial powers to your build to discover more'
      : 'Try adjusting your filters';
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Powers Found</div>
        <div class="empty-state-desc">${desc}</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(power => {
    const isInBuild = inBuild.has(power.name);
    const isAvailable = availableNames.has(power.name);
    const isLocked = power.tier === 'secondary' && !isAvailable && !isInBuild;
    const level = isInBuild ? (state.powerLevels[power.name] || 1) : 0;

    // Build extra classes
    let extra = '';
    if (isAvailable && !isInBuild) extra += 'available-highlight';
    if (isLocked) extra += (extra ? ' ' : '') + 'locked';

    // Discovery mode: visual treatment for legendaries
    if (state.filters.discovery && power.type === 'legendary' && !isInBuild) {
      if (isAvailable) {
        extra += (extra ? ' ' : '') + 'discovery-unlocked';
      } else {
        extra += (extra ? ' ' : '') + 'discovery-locked-legendary';
      }
    }

    // Legendary combo badges
    let comboBadges = '';
    if (power.type === 'legendary' && power.combo) {
      comboBadges += `<div class="legendary-combo" data-type="legendary">`;
      comboBadges += power.combo.map(el =>
        `<span class="badge badge-type" data-type="${el}">${TYPE_LABELS[el]}</span>`
      ).join('<span class="legendary-combo-plus">+</span>');
      comboBadges += `</div>`;
    }

    // Prerequisite display
    let prereqHtml = '';
    if (power.requires) {
      const met = isAvailable || isInBuild;
      const displayRequires = CATEGORY_REQUIRES_LABELS[power.requires] || power.requires;
      prereqHtml = `<div class="card-prereq ${met ? 'card-prereq-met' : ''}">${displayRequires}</div>`;
    }
    if (power.requiredPowers) {
      const met = isAvailable || isInBuild;
      prereqHtml = `<div class="card-prereq ${met ? 'card-prereq-met' : ''}">Requires: ${power.requiredPowers.join(' + ')}</div>`;
    }

    return renderUpgradeCard({
      name: power.name,
      effect: power.effect,
      level,
      maxLevel: 3,
      isInBuild,
      extraClasses: extra,
      dataAttr: `data-power="${power.name}"`,
      typeAttr: `data-type="${power.type}"`,
      badges: `<span class="badge badge-type" data-type="${power.type}">${TYPE_LABELS[power.type]}</span>`
        + `<span class="badge badge-slot">${power.slot}</span>`
        + tierBadge(power)
        + comboBadges,
      prereqHtml,
    });
  }).join('');

  // Edge zone decrease (left side)
  container.querySelectorAll('.card-edge-zone[data-dec-power]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.decPower;
      const current = state.powerLevels[name] || 0;
      if (current - 1 <= 0) {
        const deps = getDependentsInBuild(name, state.powers);
        if (deps.length > 0) {
          const card = zone.closest('.card');
          if (card) showDependencyWarning(card, deps);
          return;
        }
      }
      setPowerLevel(name, current - 1);
    });
  });

  // Edge zone increase (right side)
  container.querySelectorAll('.card-edge-zone[data-inc-power]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.incPower;
      const current = state.powerLevels[name] || 0;
      setPowerLevel(name, current + 1);
    });
  });

  // Level buttons
  container.querySelectorAll('.level-selector[data-level-power] .level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.closest('.level-selector').dataset.levelPower;
      setPowerLevel(name, parseInt(btn.dataset.level));
    });
  });

  // Card body click: toggle add/remove
  container.querySelectorAll('.card[data-power]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-edge-zone') || e.target.closest('.level-selector')) return;
      const powerName = card.dataset.power;
      if (card.classList.contains('locked')) return;
      const current = state.powerLevels[powerName] || 0;
      if (current > 0) {
        // Check if any selected powers depend on this one
        const deps = getDependentsInBuild(powerName, state.powers);
        if (deps.length > 0) {
          showDependencyWarning(card, deps);
          return;
        }
        setPowerLevel(powerName, 0);
      } else {
        setPowerLevel(powerName, 1);
      }
    });
  });
}

function getFilteredPowers() {
  const { types, slot, tier, search, discovery } = state.filters;
  const allSelected = types.size === 0;
  const searchLower = search.toLowerCase();

  // Pre-compute discovery visibility if active
  let discoveryAvailable = null;
  if (discovery) {
    const { available } = checkPrerequisites(state.powers);
    discoveryAvailable = new Set(available.map(p => p.name));
  }
  const inBuild = new Set(state.powers);

  return powers.filter(power => {
    // Search filter
    if (searchLower && !power.name.toLowerCase().includes(searchLower) &&
        !power.effect.toLowerCase().includes(searchLower)) {
      return false;
    }

    // Slot filter
    if (slot !== 'all' && power.slot !== slot) return false;

    // Tier filter (skipped when discovery is active — discovery controls visibility)
    if (!discovery && tier !== 'all' && power.tier !== tier) return false;

    // Type filter
    if (!allSelected) {
      if (power.type === 'legendary') {
        if (!filterLegendary(power, types)) return false;
      } else if (!types.has(power.type)) return false;
    }

    // Discovery mode filtering
    if (discovery && power.tier === 'secondary') {
      // Legendaries always show in discovery mode
      if (power.type === 'legendary') return true;
      // Non-legendary secondaries: only show if available (prereqs met) or already in build
      return discoveryAvailable.has(power.name) || inBuild.has(power.name);
    }

    return true;
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
