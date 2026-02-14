// TMNT: Splintered Fate - Artifacts Tab
// Artifact grid with permanent upgrade levels, click to equip

import { artifacts } from '../data/artifacts.js';
import { state, setArtifact, setArtifactUpgradeLevel, getArtifactUpgradeLevel, on } from '../state.js';
import { matchesArtifact } from './search.js';
import { renderUpgradeCard } from './format.js';

export function initArtifactsTab() {
  on('tab-changed', (tab) => {
    if (tab === 'artifacts') render();
  });
  on('build-changed', () => {
    if (state.activeTab === 'artifacts') render();
  });
  on('artifact-upgrades-changed', () => {
    if (state.activeTab === 'artifacts') render();
  });
  on('filter-changed', () => {
    if (state.activeTab === 'artifacts') renderGrid();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;
  container.innerHTML = '<span class="filter-group-label">Click an artifact to equip it for your run</span>';
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  // Apply search filter
  const searchLower = state.filters.search.toLowerCase();
  const searchedArtifacts = searchLower
    ? artifacts.filter(a => matchesArtifact(a, searchLower))
    : artifacts;

  // Group by category
  const categories = [...new Set(searchedArtifacts.map(a => a.category))];

  if (searchedArtifacts.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-state-title">No Artifacts Found</div>
        <div class="empty-state-desc">Try adjusting your search</div>
      </div>
    `;
    return;
  }

  let html = '';
  for (const cat of categories) {
    const catArtifacts = searchedArtifacts.filter(a => a.category === cat);
    html += `<div class="inspiration-group-header" style="grid-column: 1 / -1">
      <span class="filter-group-label">${cat}</span>
    </div>`;

    for (const artifact of catArtifacts) {
      const isActive = state.artifact === artifact.name;
      const level = getArtifactUpgradeLevel(artifact.name);
      const primaryTag = artifact.tags[0] || '';

      html += renderUpgradeCard({
        name: artifact.name,
        effect: artifact.effect,
        level,
        maxLevel: artifact.maxLevel,
        isInBuild: isActive,
        alwaysShowControls: true,
        dataAttr: `data-artifact="${artifact.name}"`,
        typeAttr: primaryTag ? `data-type="${primaryTag}"` : '',
        headerExtra: isActive ? '<span class="badge badge-starting">Equipped</span>' : '',
        badges: artifact.tags.map(tag =>
          `<span class="badge badge-type" data-type="${tag}">${tag}</span>`
        ).join('') + `<span class="badge badge-slot">${artifact.category}</span>`,
      });
    }
  }

  container.innerHTML = html;

  // Artifact click to equip/unequip
  container.querySelectorAll('.card[data-artifact]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.level-selector') || e.target.closest('.card-edge-zone')) return;
      setArtifact(card.dataset.artifact);
    });
  });

  // Level buttons
  container.querySelectorAll('.level-selector[data-level-artifact] .level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.closest('.level-selector').dataset.levelArtifact;
      setArtifactUpgradeLevel(name, parseInt(btn.dataset.level));
    });
  });

  // Edge zone decrease
  container.querySelectorAll('.card-edge-zone[data-dec-artifact]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.decArtifact;
      const current = getArtifactUpgradeLevel(name);
      if (current > 1) setArtifactUpgradeLevel(name, current - 1);
    });
  });

  // Edge zone increase
  container.querySelectorAll('.card-edge-zone[data-inc-artifact]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.incArtifact;
      const max = parseInt(zone.dataset.max);
      const current = getArtifactUpgradeLevel(name);
      if (current < max) setArtifactUpgradeLevel(name, current + 1);
    });
  });
}
