// TMNT: Splintered Fate - Run Sidebar
// Build summary, synergy display, focus meter, damage estimate

import { characters } from '../data/characters.js';
import { powers } from '../data/powers.js';
import { state, upgradeState, removePower, setTool, setArtifact, toggleMastery, setInspirationLevel, clearBuild, on } from '../state.js';
import { runFullAnalysis, computeCharacterStats } from '../engine.js';

const TYPE_LABELS = {
  water: 'Water', flame: 'Flame', ooze: 'Ooze', utrom: 'Utrom',
  ninja: 'Ninja', light: 'Light', dark: 'Dark', robotics: 'Robotics', legendary: 'Legendary'
};

// Power type lookup
const powerTypeMap = new Map();

function ensurePowerMap() {
  if (powerTypeMap.size > 0) return;
  for (const p of powers) {
    powerTypeMap.set(p.name, p.type);
  }
}

export function initSidebar() {
  renderSidebar();

  on('build-changed', renderSidebar);
  on('character-changed', renderSidebar);
  on('upgrades-changed', renderSidebar);

  // Clear build button
  const clearBtn = document.getElementById('clear-build');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearBuild);
  }

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      toggleBtn.classList.toggle('sidebar-open');
    });
  }
}

export function renderSidebar() {
  ensurePowerMap();
  renderCharacterSection();
  renderStatsSection();
  renderToolSection();
  renderArtifactSection();
  renderPowersSection();
  renderMasteriesSection();
  renderInspirationsSection();

  // Run analysis
  const analysis = runFullAnalysis(state, upgradeState);
  renderFocusSection(analysis.focus);
  renderSynergiesSection(analysis.synergies);
  renderDamageSection(analysis.damage);
}

function renderCharacterSection() {
  const container = document.getElementById('sidebar-character');
  if (!container) return;

  if (!state.character) {
    container.innerHTML = `
      <div class="sidebar-section-title">Character</div>
      <div style="color: var(--text-tertiary); font-size: var(--text-sm)">Select a character above</div>
    `;
    return;
  }

  const char = characters.find(c => c.id === state.character);
  container.innerHTML = `
    <div class="sidebar-section-title">Character</div>
    <div style="font-weight: 700; font-size: var(--text-md); color: var(--primary)">${char.name}</div>
  `;
}

function renderStatsSection() {
  const container = document.getElementById('sidebar-stats');
  if (!container) return;

  if (!state.character) {
    container.innerHTML = '';
    return;
  }

  const char = characters.find(c => c.id === state.character);
  const computed = computeCharacterStats(char, upgradeState);

  container.innerHTML = `
    <div class="sidebar-section-title">Stats</div>
    <div class="stat-grid">
      <div><span class="stat-label">HP</span></div>
      <div><span class="stat-value">${computed.health}</span> <span class="stat-base">(base ${char.health})</span></div>
      <div><span class="stat-label">Max HP</span></div>
      <div><span class="stat-value">${computed.maxHealth}</span> <span class="stat-base">(base ${char.maxHealth})</span></div>
      <div><span class="stat-label">Attack</span></div>
      <div><span class="stat-value">${computed.attackDamage}</span> <span class="stat-base">(base ${char.attackDamage})</span></div>
      <div><span class="stat-label">Dash Atk</span></div>
      <div><span class="stat-value">${computed.dashAttack}</span> <span class="stat-base">(base ${char.dashAttack})</span></div>
      <div><span class="stat-label">Special</span></div>
      <div><span class="stat-value">${computed.specialAttack}</span> <span class="stat-base">(base ${char.specialAttack})</span></div>
      ${computed.critChance > 0 ? `
        <div><span class="stat-label">Crit %</span></div>
        <div><span class="stat-value">+${computed.critChance}%</span></div>
      ` : ''}
      ${computed.dodgeChance > 0 ? `
        <div><span class="stat-label">Dodge %</span></div>
        <div><span class="stat-value">+${computed.dodgeChance}%</span></div>
      ` : ''}
    </div>
  `;
}

function renderToolSection() {
  const container = document.getElementById('sidebar-tool');
  if (!container) return;

  container.innerHTML = `
    <div class="sidebar-section-title">Tool</div>
    ${state.tool
      ? `<div class="sidebar-item" data-sidebar-tool="${state.tool}">
           <span>${state.tool}</span>
           <span class="sidebar-item-remove">x</span>
         </div>`
      : '<div style="color: var(--text-tertiary); font-size: var(--text-sm)">None equipped</div>'
    }
  `;

  container.querySelectorAll('[data-sidebar-tool]').forEach(item => {
    item.querySelector('.sidebar-item-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setTool(null);
    });
  });
}

function renderArtifactSection() {
  const container = document.getElementById('sidebar-artifact');
  if (!container) return;

  container.innerHTML = `
    <div class="sidebar-section-title">Artifact</div>
    ${state.artifact
      ? `<div class="sidebar-item" data-sidebar-artifact="${state.artifact}">
           <span>${state.artifact} (Lv${state.artifactLevel})</span>
           <span class="sidebar-item-remove">x</span>
         </div>`
      : '<div style="color: var(--text-tertiary); font-size: var(--text-sm)">None selected</div>'
    }
  `;

  container.querySelectorAll('[data-sidebar-artifact]').forEach(item => {
    item.querySelector('.sidebar-item-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setArtifact(null);
    });
  });
}

function renderPowersSection() {
  const container = document.getElementById('sidebar-powers');
  if (!container) return;

  if (state.powers.length === 0) {
    container.innerHTML = `
      <div class="sidebar-section-title">Powers <span class="sidebar-section-count">0</span></div>
      <div style="color: var(--text-tertiary); font-size: var(--text-sm)">Add powers from the browse panel</div>
    `;
    return;
  }

  // Group by type
  const grouped = new Map();
  for (const name of state.powers) {
    const type = powerTypeMap.get(name) || 'unknown';
    if (!grouped.has(type)) grouped.set(type, []);
    grouped.get(type).push(name);
  }

  let html = `<div class="sidebar-section-title">Powers <span class="sidebar-section-count">${state.powers.length}</span></div>`;

  for (const [type, names] of grouped) {
    html += `<div class="sidebar-section-title" style="font-size: 0.65rem; margin-top: var(--sp-2)" data-type="${type}">${TYPE_LABELS[type] || type} (${names.length})</div>`;
    for (const name of names) {
      html += `
        <div class="sidebar-item" data-type="${type}" data-sidebar-power="${name}">
          <span class="sidebar-item-dot"></span>
          <span>${name}</span>
          <span class="sidebar-item-remove">x</span>
        </div>
      `;
    }
  }

  container.innerHTML = html;

  container.querySelectorAll('[data-sidebar-power]').forEach(item => {
    item.querySelector('.sidebar-item-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      removePower(item.dataset.sidebarPower);
    });
  });
}

function renderMasteriesSection() {
  const container = document.getElementById('sidebar-masteries');
  if (!container) return;

  if (state.masteries.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = `<div class="sidebar-section-title">Masteries <span class="sidebar-section-count">${state.masteries.length}</span></div>`;
  for (const name of state.masteries) {
    html += `
      <div class="sidebar-item" data-sidebar-mastery="${name}">
        <span>${name}</span>
        <span class="sidebar-item-remove">x</span>
      </div>
    `;
  }

  container.innerHTML = html;

  container.querySelectorAll('[data-sidebar-mastery]').forEach(item => {
    item.querySelector('.sidebar-item-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMastery(item.dataset.sidebarMastery);
    });
  });
}

function renderInspirationsSection() {
  const container = document.getElementById('sidebar-inspirations');
  if (!container) return;

  const active = Object.entries(state.inspirations).filter(([, level]) => level > 0);
  if (active.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = `<div class="sidebar-section-title">Inspirations</div>`;
  for (const [name, level] of active) {
    html += `
      <div class="sidebar-item" data-sidebar-insp="${name}">
        <span>${name} (Lv${level})</span>
        <span class="sidebar-item-remove">x</span>
      </div>
    `;
  }

  container.innerHTML = html;

  container.querySelectorAll('[data-sidebar-insp]').forEach(item => {
    item.querySelector('.sidebar-item-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setInspirationLevel(item.dataset.sidebarInsp, 0);
    });
  });
}

function renderFocusSection(focus) {
  const container = document.getElementById('sidebar-focus');
  if (!container) return;

  if (state.powers.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="sidebar-section-title">Build Focus</div>
    <div class="focus-meter ${focus.level}">
      ${focus.label} (${focus.typeCount} element${focus.typeCount !== 1 ? 's' : ''})
    </div>
  `;
}

function renderSynergiesSection(synergies) {
  const container = document.getElementById('sidebar-synergies');
  if (!container) return;

  if (synergies.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = `<div class="sidebar-section-title">Active Synergies <span class="sidebar-section-count">${synergies.length}</span></div>`;
  for (const syn of synergies) {
    html += `
      <div class="synergy-item">
        <div class="synergy-item-title">${syn.name}</div>
        ${syn.description}
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderDamageSection(damage) {
  const container = document.getElementById('sidebar-damage');
  if (!container) return;

  if (damage.totalBonusPercent === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="sidebar-section-title">Damage Estimate</div>
    <div class="damage-display">
      <div class="damage-multiplier">${damage.multiplier}x</div>
      <div class="damage-label">Total damage multiplier (+${damage.totalBonusPercent}% from upgrades)</div>
    </div>
  `;
}
