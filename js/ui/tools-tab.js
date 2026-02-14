// TMNT: Splintered Fate - Tools Tab
// Tool card grid with level selectors & edge zones (shared upgrade card)

import { tools } from '../data/tools.js';
import { state, setTool, setToolLevel, on } from '../state.js';
import { matchesTool } from './search.js';
import { renderUpgradeCard } from './format.js';

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
  on('filter-changed', () => {
    if (state.activeTab === 'tools') renderGrid();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;
  container.innerHTML = '<span class="filter-group-label">Click a tool to equip it — use +/− or level buttons to upgrade</span>';
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  const searchLower = state.filters.search.toLowerCase();
  const filtered = searchLower ? tools.filter(t => matchesTool(t, searchLower)) : tools;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Tools Found</div>
        <div class="empty-state-desc">Try adjusting your search</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tool => {
    const isActive = state.tool === tool.name;
    const level = isActive ? (state.toolLevel || 1) : 0;

    return renderUpgradeCard({
      name: tool.name,
      effect: tool.effect,
      level,
      maxLevel: 3,
      isInBuild: isActive,
      dataAttr: `data-tool="${tool.name}"`,
      typeAttr: tool.element ? `data-type="${tool.element}"` : '',
      badges: tool.element
        ? `<span class="badge badge-type" data-type="${tool.element}">${ELEMENT_LABELS[tool.element] || tool.element}</span>`
        : '<span class="badge badge-slot">Neutral</span>',
    });
  }).join('');

  // Edge zone decrease (left side)
  container.querySelectorAll('.card-edge-zone[data-dec-tool]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = state.toolLevel || 1;
      if (current <= 1) {
        setTool(null);
      } else {
        setToolLevel(current - 1);
      }
    });
  });

  // Edge zone increase (right side)
  container.querySelectorAll('.card-edge-zone[data-inc-tool]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = state.toolLevel || 1;
      if (current < 3) {
        setToolLevel(current + 1);
      }
    });
  });

  // Level buttons
  container.querySelectorAll('.level-selector[data-level-tool] .level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setToolLevel(parseInt(btn.dataset.level));
    });
  });

  // Card body click: toggle equip/unequip
  container.querySelectorAll('.card[data-tool]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-edge-zone') || e.target.closest('.level-selector')) return;
      setTool(card.dataset.tool);
    });
  });
}
