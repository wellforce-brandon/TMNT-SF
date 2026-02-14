// TMNT: Splintered Fate - Inspirations Tab
// All 12 inspirations grouped by character — controls permanent HQ upgrade levels

import { inspirations } from '../data/inspirations.js';
import { characters } from '../data/characters.js';
import { state, setInspirationLevel, setInspirationUpgradeLevel, getInspirationUpgradeLevel, isStartingInspiration, on } from '../state.js';
import { matchesInspiration } from './search.js';
import { renderUpgradeCard } from './format.js';

// Build a character name lookup
const charNameMap = new Map();
for (const c of characters) {
  charNameMap.set(c.id, c.name);
}

// Character display order
const CHAR_ORDER = ['michelangelo', 'leonardo', 'raphael', 'donatello', 'casey', 'metalhead'];

export function initInspirationsTab() {
  on('tab-changed', (tab) => {
    if (tab === 'inspirations') render();
  });
  on('inspiration-upgrades-changed', () => {
    if (state.activeTab === 'inspirations') render();
  });
  on('build-changed', () => {
    if (state.activeTab === 'inspirations') renderGrid();
  });
  on('character-changed', () => {
    if (state.activeTab === 'inspirations') render();
  });
  on('filter-changed', () => {
    if (state.activeTab === 'inspirations') renderGrid();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;

  if (!state.character) {
    container.innerHTML = '<span class="filter-group-label">Set your permanent inspiration levels. Select a character to see starting inspirations.</span>';
  } else {
    const charName = charNameMap.get(state.character) || state.character;
    container.innerHTML = `<span class="filter-group-label">Set permanent inspiration levels. ${charName}'s starting inspirations are highlighted.</span>`;
  }
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  // Group inspirations by character, selected character first (if any)
  const grouped = getGroupedInspirations();

  if (grouped.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Inspirations Found</div>
        <div class="empty-state-desc">Try adjusting your search</div>
      </div>
    `;
    return;
  }

  let html = '';
  for (const group of grouped) {
    const isSelectedChar = state.character && group.charId === state.character;
    html += `<div class="inspiration-group-header" style="grid-column: 1 / -1">
      <span class="filter-group-label">${group.charName}${isSelectedChar ? ' (Starting)' : ''}</span>
    </div>`;

    for (const insp of group.inspirations) {
      const currentLevel = getInspirationUpgradeLevel(insp.name);
      const isStarter = isStartingInspiration(insp.name);
      const inBuild = !!(state.inspirations[insp.name] && state.inspirations[insp.name] > 0);

      html += renderUpgradeCard({
        name: insp.name,
        effect: insp.effect,
        level: currentLevel,
        maxLevel: insp.maxLevel,
        isInBuild: inBuild,
        alwaysShowControls: true,
        extraClasses: isStarter ? 'starting-inspiration' : '',
        dataAttr: `data-inspiration="${insp.name}"`,
        headerExtra: isStarter ? '<span class="badge badge-starting">Starting</span>' : '',
      });
    }
  }

  container.innerHTML = html;

  // Card body click — toggle inspiration in/out of run build
  container.querySelectorAll('.card[data-inspiration]').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.inspiration;
      const isStarter = isStartingInspiration(name);
      if (isStarter) return; // Starting inspirations can't be toggled off
      const active = state.inspirations[name] && state.inspirations[name] > 0;
      if (active) {
        setInspirationLevel(name, 0);
      } else {
        // Add at permanent upgrade level (minimum 1)
        const level = getInspirationUpgradeLevel(name);
        setInspirationLevel(name, Math.max(level, 1));
      }
    });
  });

  // Bind level buttons
  container.querySelectorAll('.level-selector[data-level-inspiration] .level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.closest('.level-selector').dataset.levelInspiration;
      setInspirationUpgradeLevel(name, parseInt(btn.dataset.level));
    });
  });

  // Edge zone decrease
  container.querySelectorAll('.card-edge-zone[data-dec-inspiration]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.decInspiration;
      const current = getInspirationUpgradeLevel(name);
      if (current > 1) setInspirationUpgradeLevel(name, current - 1);
    });
  });

  // Edge zone increase
  container.querySelectorAll('.card-edge-zone[data-inc-inspiration]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.incInspiration;
      const max = parseInt(zone.dataset.max);
      const current = getInspirationUpgradeLevel(name);
      if (current < max) setInspirationUpgradeLevel(name, current + 1);
    });
  });
}

function getGroupedInspirations() {
  const groups = [];
  const searchLower = state.filters.search.toLowerCase();

  // Selected character first (if any), then the rest
  const order = state.character
    ? [state.character, ...CHAR_ORDER.filter(id => id !== state.character)]
    : CHAR_ORDER;

  for (const charId of order) {
    let charInsps = inspirations.filter(i => i.character === charId);
    if (searchLower) {
      charInsps = charInsps.filter(i => matchesInspiration(i, searchLower));
    }
    if (charInsps.length > 0) {
      groups.push({
        charId,
        charName: charNameMap.get(charId) || charId,
        inspirations: charInsps
      });
    }
  }

  return groups;
}
