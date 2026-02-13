// TMNT: Splintered Fate - Inspirations Tab
// Character inspirations with level selectors

import { inspirations } from '../data/inspirations.js';
import { state, setInspirationLevel, on } from '../state.js';

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
    container.innerHTML = '<span class="filter-group-label">Select a character to view inspirations</span>';
  } else {
    container.innerHTML = '<span class="filter-group-label">Set inspiration levels for your build</span>';
  }
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  if (!state.character) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Character Selected</div>
        <div class="empty-state-desc">Pick a character from the top bar to see their inspirations</div>
      </div>
    `;
    return;
  }

  const charInspirations = inspirations.filter(i => i.character === state.character);

  if (charInspirations.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Inspirations</div>
        <div class="empty-state-desc">No inspirations found for this character</div>
      </div>
    `;
    return;
  }

  container.innerHTML = charInspirations.map(insp => {
    const currentLevel = state.inspirations[insp.name] || 0;
    const activeLevel = insp.levels.find(l => l.level === currentLevel);
    const isActive = currentLevel > 0;
    const classes = `card ${isActive ? 'in-build' : ''}`;

    return `
      <div class="${classes}" data-inspiration="${insp.name}">
        <div class="card-header">
          <span class="card-name">${insp.name}</span>
        </div>
        <div class="card-effect">${activeLevel ? activeLevel.effect : insp.levels[0].effect}</div>
        <div class="card-meta">
          <div class="level-selector">
            <button class="level-btn ${currentLevel === 0 ? 'active' : ''}" data-insp="${insp.name}" data-level="0">Off</button>
            ${insp.levels.map(l =>
              `<button class="level-btn ${currentLevel === l.level ? 'active' : ''}" data-insp="${insp.name}" data-level="${l.level}">Lv${l.level}</button>`
            ).join('')}
          </div>
        </div>
        <div style="margin-top: var(--sp-2)">
          ${insp.levels.map(l =>
            `<div class="card-prereq ${currentLevel >= l.level ? 'card-prereq-met' : ''}">Lv${l.level}: ${l.effect}</div>`
          ).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Bind level buttons
  container.querySelectorAll('.level-btn[data-insp]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setInspirationLevel(btn.dataset.insp, parseInt(btn.dataset.level));
    });
  });
}
