// TMNT: Splintered Fate - Artifacts Tab
// Artifact grid with permanent upgrade levels, click to equip

import { artifacts } from '../data/artifacts.js';
import { state, setArtifact, setArtifactUpgradeLevel, getArtifactUpgradeLevel, on } from '../state.js';

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
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;
  container.innerHTML = '<span class="filter-group-label">Set permanent artifact levels. Click an artifact to equip it for your run.</span>';
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  // Group by category
  const categories = [...new Set(artifacts.map(a => a.category))];

  let html = '';
  for (const cat of categories) {
    const catArtifacts = artifacts.filter(a => a.category === cat);
    html += `<div class="inspiration-group-header" style="grid-column: 1 / -1">
      <span class="filter-group-label">${cat}</span>
    </div>`;

    for (const artifact of catArtifacts) {
      html += renderArtifactCard(artifact);
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
  container.querySelectorAll('.level-btn[data-art-upg]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setArtifactUpgradeLevel(btn.dataset.artUpg, parseInt(btn.dataset.level));
    });
  });

  // Edge zone +/-
  container.querySelectorAll('.card-edge-zone[data-art-upg-dec]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.artUpgDec;
      const current = getArtifactUpgradeLevel(name);
      if (current > 1) setArtifactUpgradeLevel(name, current - 1);
    });
  });
  container.querySelectorAll('.card-edge-zone[data-art-upg-inc]').forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = zone.dataset.artUpgInc;
      const max = parseInt(zone.dataset.max);
      const current = getArtifactUpgradeLevel(name);
      if (current < max) setArtifactUpgradeLevel(name, current + 1);
    });
  });
}

function renderArtifactCard(artifact) {
  const isActive = state.artifact === artifact.name;
  const level = getArtifactUpgradeLevel(artifact.name);
  const maxLevel = artifact.levels.length;
  const levelData = artifact.levels.find(l => l.level === level) || artifact.levels[0];
  const primaryTag = artifact.tags[0] || '';

  let classes = 'card upgrade-card';
  if (isActive) classes += ' in-build';

  const levelButtons = artifact.levels.map(l =>
    `<button class="level-btn ${level === l.level ? 'active' : ''}" data-art-upg="${artifact.name}" data-level="${l.level}">Lv${l.level}</button>`
  ).join('');

  return `
    <div class="${classes}" ${primaryTag ? `data-type="${primaryTag}"` : ''} data-artifact="${artifact.name}">
      <div class="card-edge-zone card-edge-dec" data-art-upg-dec="${artifact.name}">&minus;</div>
      <div class="card-edge-zone card-edge-inc" data-art-upg-inc="${artifact.name}" data-max="${maxLevel}">+</div>
      <div class="card-header">
        <span class="card-name">${artifact.name}</span>
        ${isActive ? '<span class="badge badge-starting">Equipped</span>' : ''}
        <span class="badge badge-slot">Lv${level}/${maxLevel}</span>
      </div>
      <div class="card-effect">${levelData.effect}</div>
      <div class="card-meta">
        ${artifact.tags.map(tag =>
          `<span class="badge badge-type" data-type="${tag}">${tag}</span>`
        ).join('')}
        <span class="badge badge-slot">${artifact.category}</span>
      </div>
      <div class="card-meta">
        <div class="level-selector">
          ${levelButtons}
        </div>
      </div>
      <div style="margin-top: var(--sp-2)">
        ${artifact.levels.map(l =>
          `<div class="card-prereq ${level >= l.level ? 'card-prereq-met' : ''}">Lv${l.level}: ${l.effect}</div>`
        ).join('')}
      </div>
    </div>
  `;
}
