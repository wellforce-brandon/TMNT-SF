// TMNT: Splintered Fate - Tools Tab
// Tool card grid, swap on click

import { tools } from '../data/tools.js';
import { state, setTool, on } from '../state.js';

const ELEMENT_LABELS = {
  flame: 'Flame', water: 'Water', ooze: 'Ooze', utrom: 'Utrom',
  physical: 'Physical', mixed: 'Mixed'
};

export function initToolsTab() {
  on('tab-changed', (tab) => {
    if (tab === 'tools') render();
  });
  on('build-changed', () => {
    if (state.activeTab === 'tools') render();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;
  container.innerHTML = '<span class="filter-group-label">Click a tool to equip it</span>';
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  container.innerHTML = tools.map(tool => {
    const isActive = state.tool === tool.name;
    const typeAttr = tool.element || '';
    const classes = `card ${isActive ? 'in-build' : ''}`;

    return `
      <div class="${classes}" ${typeAttr ? `data-type="${typeAttr}"` : ''} data-tool="${tool.name}">
        <div class="card-header">
          <span class="card-name">${tool.name}</span>
          ${isActive ? '' : '<span class="card-type-dot"></span>'}
        </div>
        <div class="card-effect">${tool.effect}</div>
        <div class="card-meta">
          ${tool.element ? `<span class="badge badge-type" data-type="${tool.element}">${ELEMENT_LABELS[tool.element] || tool.element}</span>` : '<span class="badge badge-slot">Neutral</span>'}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.card[data-tool]').forEach(card => {
    card.addEventListener('click', () => {
      setTool(card.dataset.tool);
    });
  });
}
