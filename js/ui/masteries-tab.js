// TMNT: Splintered Fate - Masteries Tab
// Character/element toggle views, on/off toggles

import { masteries } from '../data/masteries.js';
import { state, toggleMastery, setMasteryView, on } from '../state.js';

const TYPE_LABELS = {
  water: 'Water', flame: 'Flame', ooze: 'Ooze', utrom: 'Utrom',
  ninja: 'Ninja', light: 'Light', dark: 'Dark', robotics: 'Robotics',
  elemental: 'Elemental', boss: 'Boss', barrier: 'Barrier', crit: 'Crit',
  dash: 'Dash', special: 'Special', attack: 'Attack', speed: 'Speed',
  defense: 'Defense', astral: 'Astral', shuriken: 'Shuriken', tool: 'Tool',
  health: 'Health', general: 'General'
};

export function initMasteriesTab() {
  on('tab-changed', (tab) => {
    if (tab === 'masteries') render();
  });
  on('build-changed', () => {
    if (state.activeTab === 'masteries') render();
  });
  on('character-changed', () => {
    if (state.activeTab === 'masteries') render();
  });
  on('mastery-view-changed', () => {
    if (state.activeTab === 'masteries') render();
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
    container.innerHTML = '<span class="filter-group-label">Select a character to view masteries</span>';
    return;
  }

  container.innerHTML = `
    <span class="filter-group-label">View</span>
    <div class="view-toggle">
      <button class="view-toggle-btn ${state.masteryView === 'character' ? 'active' : ''}" data-view="character">By Character</button>
      <button class="view-toggle-btn ${state.masteryView === 'element' ? 'active' : ''}" data-view="element">By Element</button>
    </div>
  `;

  container.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setMasteryView(btn.dataset.view);
    });
  });
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  if (!state.character) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Character Selected</div>
        <div class="empty-state-desc">Pick a character from the top bar to see their masteries</div>
      </div>
    `;
    return;
  }

  const charMasteries = masteries.filter(m => m.character === state.character);
  const activeSet = new Set(state.masteries);

  if (state.masteryView === 'element') {
    renderByElement(container, charMasteries, activeSet);
  } else {
    renderByCharacter(container, charMasteries, activeSet);
  }
}

function renderByCharacter(container, charMasteries, activeSet) {
  container.innerHTML = charMasteries.map(mastery => {
    const isActive = activeSet.has(mastery.name);
    const classes = `card ${isActive ? 'in-build' : ''}`;
    const primaryTag = mastery.tags[0] || '';

    return `
      <div class="${classes}" ${primaryTag ? `data-type="${primaryTag}"` : ''} data-mastery="${mastery.name}">
        <div class="card-header">
          <span class="card-name">${mastery.effect}</span>
        </div>
        <div class="card-meta">
          ${mastery.tags.map(tag =>
            `<span class="badge badge-type" data-type="${tag}">${TYPE_LABELS[tag] || tag}</span>`
          ).join('')}
        </div>
      </div>
    `;
  }).join('');

  bindMasteryClicks(container);
}

function renderByElement(container, charMasteries, activeSet) {
  // Group by primary tag
  const groups = new Map();
  for (const m of charMasteries) {
    const tag = m.tags[0] || 'general';
    if (!groups.has(tag)) groups.set(tag, []);
    groups.get(tag).push(m);
  }

  let html = '';
  for (const [tag, group] of groups) {
    html += `<div style="grid-column: 1 / -1"><div class="sidebar-section-title" data-type="${tag}">${TYPE_LABELS[tag] || tag}</div></div>`;
    for (const mastery of group) {
      const isActive = activeSet.has(mastery.name);
      const classes = `card ${isActive ? 'in-build' : ''}`;

      html += `
        <div class="${classes}" data-type="${tag}" data-mastery="${mastery.name}">
          <div class="card-header">
            <span class="card-name">${mastery.effect}</span>
          </div>
          <div class="card-meta">
            ${mastery.tags.map(t =>
              `<span class="badge badge-type" data-type="${t}">${TYPE_LABELS[t] || t}</span>`
            ).join('')}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
  bindMasteryClicks(container);
}

function bindMasteryClicks(container) {
  container.querySelectorAll('.card[data-mastery]').forEach(card => {
    card.addEventListener('click', () => {
      toggleMastery(card.dataset.mastery);
    });
  });
}
