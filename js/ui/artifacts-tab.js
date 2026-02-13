// TMNT: Splintered Fate - Artifacts Tab
// Artifact grid with level selector, set active

import { artifacts } from '../data/artifacts.js';
import { state, setArtifact, setArtifactLevel, on } from '../state.js';

export function initArtifactsTab() {
  on('tab-changed', (tab) => {
    if (tab === 'artifacts') render();
  });
  on('build-changed', () => {
    if (state.activeTab === 'artifacts') render();
  });
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;
  container.innerHTML = '<span class="filter-group-label">Click an artifact to equip it. Use level buttons to set artifact level.</span>';
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  container.innerHTML = artifacts.map(artifact => {
    const isActive = state.artifact === artifact.name;
    const classes = `card ${isActive ? 'in-build' : ''}`;
    const currentLevel = isActive ? state.artifactLevel : 1;
    const levelData = artifact.levels.find(l => l.level === currentLevel) || artifact.levels[0];
    const primaryTag = artifact.tags[0] || '';

    return `
      <div class="${classes}" ${primaryTag ? `data-type="${primaryTag}"` : ''} data-artifact="${artifact.name}">
        <div class="card-header">
          <span class="card-name">${artifact.name}</span>
        </div>
        <div class="card-effect">${levelData ? levelData.effect : artifact.effect}</div>
        <div class="card-meta">
          ${artifact.tags.map(tag =>
            `<span class="badge badge-type" data-type="${tag}">${tag}</span>`
          ).join('')}
          <span class="badge badge-slot">${artifact.category}</span>
        </div>
        ${isActive ? `
          <div class="level-selector" data-artifact-level="${artifact.name}">
            ${artifact.levels.map(l =>
              `<button class="level-btn ${l.level === state.artifactLevel ? 'active' : ''}" data-level="${l.level}">${l.level}</button>`
            ).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  // Artifact click to select
  container.querySelectorAll('.card[data-artifact]').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't toggle when clicking level buttons
      if (e.target.closest('.level-selector')) return;
      setArtifact(card.dataset.artifact);
    });
  });

  // Level buttons
  container.querySelectorAll('.level-selector .level-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setArtifactLevel(parseInt(btn.dataset.level));
    });
  });
}
