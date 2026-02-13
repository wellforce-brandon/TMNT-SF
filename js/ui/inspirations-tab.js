// TMNT: Splintered Fate - Inspirations Tab
// All 12 inspirations grouped by character — controls permanent HQ upgrade levels

import { inspirations } from '../data/inspirations.js';
import { characters } from '../data/characters.js';
import { state, setInspirationUpgradeLevel, getInspirationUpgradeLevel, isStartingInspiration, on } from '../state.js';

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
  on('character-changed', () => {
    if (state.activeTab === 'inspirations') render();
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

  let html = '';
  for (const group of grouped) {
    const isSelectedChar = state.character && group.charId === state.character;
    html += `<div class="inspiration-group-header" style="grid-column: 1 / -1">
      <span class="filter-group-label">${group.charName}${isSelectedChar ? ' (Starting)' : ''}</span>
    </div>`;

    for (const insp of group.inspirations) {
      html += renderInspirationCard(insp);
    }
  }

  container.innerHTML = html;

  // Bind level buttons
  container.querySelectorAll('.level-btn[data-insp]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setInspirationUpgradeLevel(btn.dataset.insp, parseInt(btn.dataset.level));
    });
  });

  // Bind edge zone +/- for inspirations
  container.querySelectorAll('.card-edge-zone[data-insp-dec]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.inspDec;
      const current = getInspirationUpgradeLevel(name);
      if (current > 1) setInspirationUpgradeLevel(name, current - 1);
    });
  });
  container.querySelectorAll('.card-edge-zone[data-insp-inc]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.inspInc;
      const max = parseInt(zone.dataset.max);
      const current = getInspirationUpgradeLevel(name);
      if (current < max) setInspirationUpgradeLevel(name, current + 1);
    });
  });
}

function getGroupedInspirations() {
  const groups = [];

  // Selected character first (if any), then the rest
  const order = state.character
    ? [state.character, ...CHAR_ORDER.filter(id => id !== state.character)]
    : CHAR_ORDER;

  for (const charId of order) {
    const charInsps = inspirations.filter(i => i.character === charId);
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

function renderInspirationCard(insp) {
  const currentLevel = getInspirationUpgradeLevel(insp.name);
  const activeLevel = insp.levels.find(l => l.level === currentLevel) || insp.levels[0];
  const isStarter = isStartingInspiration(insp.name);
  const maxLevel = insp.levels.length;

  let classes = 'card upgrade-card';
  if (isStarter) classes += ' in-build starting-inspiration';

  const levelButtons = insp.levels.map(l =>
    `<button class="level-btn ${currentLevel === l.level ? 'active' : ''}" data-insp="${insp.name}" data-level="${l.level}">Lv${l.level}</button>`
  ).join('');

  return `
    <div class="${classes}" data-inspiration="${insp.name}">
      <div class="card-edge-zone card-edge-dec" data-insp-dec="${insp.name}">&minus;</div>
      <div class="card-edge-zone card-edge-inc" data-insp-inc="${insp.name}" data-max="${maxLevel}">+</div>
      <div class="card-header">
        <span class="card-name">${insp.name}</span>
        ${isStarter ? '<span class="badge badge-starting">Starting</span>' : ''}
        <span class="badge badge-slot">Lv${currentLevel}/${maxLevel}</span>
      </div>
      <div class="card-effect">${activeLevel.effect}</div>
      <div class="card-meta">
        <div class="level-selector">
          ${levelButtons}
        </div>
      </div>
      <div style="margin-top: var(--sp-2)">
        ${insp.levels.map(l =>
          `<div class="card-prereq ${currentLevel >= l.level ? 'card-prereq-met' : ''}">Lv${l.level}: ${l.effect}</div>`
        ).join('')}
      </div>
    </div>
  `;
}
