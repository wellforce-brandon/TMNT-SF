// TMNT: Splintered Fate - Inspirations Tab
// All 12 inspirations grouped by character, starting inspirations locked

import { inspirations } from '../data/inspirations.js';
import { characters } from '../data/characters.js';
import { state, setInspirationLevel, isStartingInspiration, on } from '../state.js';

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
  on('build-changed', () => {
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
    container.innerHTML = '<span class="filter-group-label">Select a character to see starting inspirations</span>';
  } else {
    const charName = charNameMap.get(state.character) || state.character;
    container.innerHTML = `<span class="filter-group-label">${charName}'s starting inspirations are locked in. Pick up others during your run.</span>`;
  }
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  if (!state.character) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Character Selected</div>
        <div class="empty-state-desc">Pick a character from the top bar to see inspirations</div>
      </div>
    `;
    return;
  }

  // Group inspirations by character, selected character first
  const grouped = getGroupedInspirations();

  let html = '';
  for (const group of grouped) {
    const isSelectedChar = group.charId === state.character;
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
      setInspirationLevel(btn.dataset.insp, parseInt(btn.dataset.level));
    });
  });
}

function getGroupedInspirations() {
  const groups = [];

  // Selected character first
  const selectedFirst = [state.character, ...CHAR_ORDER.filter(id => id !== state.character)];

  for (const charId of selectedFirst) {
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
  const currentLevel = state.inspirations[insp.name] || 0;
  const activeLevel = insp.levels.find(l => l.level === currentLevel);
  const isActive = currentLevel > 0;
  const isStarter = isStartingInspiration(insp.name);

  let classes = 'card';
  if (isActive) classes += ' in-build';
  if (isStarter) classes += ' starting-inspiration';

  let levelButtons = '';
  if (isStarter) {
    // No Off button for starters, just Lv1/Lv2/Lv3
    levelButtons = insp.levels.map(l =>
      `<button class="level-btn ${currentLevel === l.level ? 'active' : ''}" data-insp="${insp.name}" data-level="${l.level}">Lv${l.level}</button>`
    ).join('');
  } else {
    // Normal: Off + Lv1/Lv2/Lv3
    levelButtons = `<button class="level-btn ${currentLevel === 0 ? 'active' : ''}" data-insp="${insp.name}" data-level="0">Off</button>`;
    levelButtons += insp.levels.map(l =>
      `<button class="level-btn ${currentLevel === l.level ? 'active' : ''}" data-insp="${insp.name}" data-level="${l.level}">Lv${l.level}</button>`
    ).join('');
  }

  const ownerName = charNameMap.get(insp.character) || insp.character;

  return `
    <div class="${classes}" data-inspiration="${insp.name}">
      <div class="card-header">
        <span class="card-name">${insp.name}</span>
        ${isStarter ? '<span class="badge badge-starting">Starting</span>' : ''}
      </div>
      <div class="card-effect">${activeLevel ? activeLevel.effect : insp.levels[0].effect}</div>
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
