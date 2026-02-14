// TMNT: Splintered Fate - Masteries Tab
// All-character overview (no char selected) or filtered single-char view
// Optional "Group by Tag" toggle

import { masteries } from '../data/masteries.js';
import { characters } from '../data/characters.js';
import { state, toggleMastery, on } from '../state.js';
import { matchesMastery } from './search.js';

const TYPE_LABELS = {
  water: 'Water', flame: 'Flame', ooze: 'Ooze', utrom: 'Utrom',
  ninja: 'Ninja', light: 'Light', dark: 'Dark', robotics: 'Robotics',
  elemental: 'Elemental', boss: 'Boss', barrier: 'Barrier', crit: 'Crit',
  dash: 'Dash', special: 'Special', attack: 'Attack', speed: 'Speed',
  defense: 'Defense', astral: 'Astral', shuriken: 'Shuriken', tool: 'Tool',
  health: 'Health', general: 'General'
};

// Character theme primary colors (from themes.css --primary values)
const CHAR_COLORS = {
  michelangelo: 'hsl(16, 100%, 58%)',
  leonardo: 'hsl(215, 80%, 55%)',
  raphael: 'hsl(2, 76%, 56%)',
  donatello: 'hsl(270, 55%, 58%)',
  casey: 'hsl(180, 70%, 48%)',
  metalhead: 'hsl(50, 85%, 55%)'
};

let groupByTag = false;

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
  on('filter-changed', () => {
    if (state.activeTab === 'masteries') renderGrid();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;

  container.innerHTML = `
    <div class="card-header" style="width: 100%; padding: 0;">
      <span class="filter-group-label">Group by Tag</span>
      <label class="toggle-switch">
        <input type="checkbox" id="mastery-group-tag" ${groupByTag ? 'checked' : ''}>
        <span class="toggle-track"></span>
      </label>
    </div>
  `;

  const toggle = document.getElementById('mastery-group-tag');
  if (toggle) {
    toggle.addEventListener('change', () => {
      groupByTag = toggle.checked;
      renderGrid();
    });
  }
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  const activeSet = new Set(state.masteries);
  const searchLower = state.filters.search.toLowerCase();
  const filtered = searchLower
    ? masteries.filter(m => matchesMastery(m, searchLower))
    : masteries;

  if (state.character) {
    // Single character selected — filter
    const charMasteries = filtered.filter(m => m.character === state.character);
    if (groupByTag) {
      renderByTag(container, charMasteries, activeSet);
    } else {
      renderCharMasteries(container, charMasteries, activeSet);
    }
  } else {
    // No character — show all
    if (groupByTag) {
      renderByTag(container, filtered, activeSet);
    } else {
      renderAllByCharacter(container, activeSet, filtered);
    }
  }
}

// ---- All masteries grouped by character ----

function renderAllByCharacter(container, activeSet, list) {
  let html = '';

  for (const char of characters) {
    const charMasteries = list.filter(m => m.character === char.id);
    if (charMasteries.length === 0) continue;

    const color = CHAR_COLORS[char.id] || 'var(--primary)';

    html += `
      <div class="mastery-char-header" style="border-color: ${color}">
        <img src="assets/faces/${char.id}.png" alt="${char.name}">
        <span>${char.name}</span>
        <span class="mastery-char-count">${charMasteries.length}</span>
      </div>
    `;

    for (const mastery of charMasteries) {
      html += renderMasteryCard(mastery, activeSet, mastery.tags[0] || '', color);
    }
  }

  container.innerHTML = html;
  bindMasteryClicks(container);
}

// ---- Single character flat list ----

function renderCharMasteries(container, charMasteries, activeSet) {
  const color = CHAR_COLORS[state.character] || '';
  container.innerHTML = charMasteries.map(mastery => {
    return renderMasteryCard(mastery, activeSet, mastery.tags[0] || '', color);
  }).join('');

  bindMasteryClicks(container);
}

// ---- Grouped by primary tag ----

function renderByTag(container, list, activeSet) {
  const groups = new Map();
  for (const m of list) {
    const tag = m.tags[0] || 'general';
    if (!groups.has(tag)) groups.set(tag, []);
    groups.get(tag).push(m);
  }

  let html = '';
  for (const [tag, group] of groups) {
    html += `<div style="grid-column: 1 / -1"><div class="sidebar-section-title" data-type="${tag}">${TYPE_LABELS[tag] || tag}</div></div>`;
    for (const mastery of group) {
      const color = CHAR_COLORS[mastery.character] || '';
      html += renderMasteryCard(mastery, activeSet, tag, color);
    }
  }

  container.innerHTML = html;
  bindMasteryClicks(container);
}

// ---- Shared card renderer ----

function renderMasteryCard(mastery, activeSet, primaryTag, charColor) {
  const isActive = activeSet.has(mastery.name);
  const classes = `card ${isActive ? 'in-build' : ''}`;
  const borderStyle = charColor ? `style="border-left: 3px solid ${charColor}"` : '';

  return `
    <div class="${classes}" ${primaryTag ? `data-type="${primaryTag}"` : ''} ${borderStyle} data-mastery="${mastery.name}">
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
}

function bindMasteryClicks(container) {
  container.querySelectorAll('.card[data-mastery]').forEach(card => {
    card.addEventListener('click', () => {
      toggleMastery(card.dataset.mastery);
    });
  });
}
