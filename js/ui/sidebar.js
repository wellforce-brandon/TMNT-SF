// TMNT: Splintered Fate - Run Sidebar
// Build summary, grouped stats, synergy display, focus meter

import { characters } from '../data/characters.js';
import { powers } from '../data/powers.js';
import { state, upgradeState, removePower, setTool, setArtifact, toggleMastery, setInspirationLevel, isStartingInspiration, clearBuild, on } from '../state.js';
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
    <img class="sidebar-nameplate" src="assets/nameplates/${char.id}.png" alt="${char.name}">
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

  // Helper: render a bonus sub-row (only if value > 0)
  const bonus = (label, value, suffix = '%') =>
    value ? `<div class="stat-sub"><span class="stat-sub-label">${label}</span><span class="stat-sub-value">+${value}${suffix}</span></div>` : '';

  let html = `<div class="sidebar-section-title">Stats</div>`;

  // ── Attack ──
  html += `
    <div class="stat-group">
      <div class="stat-group-header">
        <span class="stat-label">Attack</span>
        <span class="stat-value">${computed.attackDamage}</span>
        <span class="stat-base">(base ${char.attackDamage})</span>
      </div>
      ${bonus('Crit Chance', computed.critChance)}
      ${bonus('Crit Damage', computed.critDamage)}
      ${bonus('Multi-Hit', computed.multiHitChance)}
    </div>
  `;

  // ── Dash ──
  html += `
    <div class="stat-group">
      <div class="stat-group-header">
        <span class="stat-label">Dash Attack</span>
        <span class="stat-value">${computed.dashAttack}</span>
        <span class="stat-base">(base ${char.dashAttack})</span>
      </div>
      ${computed.dashCharges > 1 ? `<div class="stat-sub"><span class="stat-sub-label">Dash Charges</span><span class="stat-sub-value">${computed.dashCharges}</span></div>` : ''}
    </div>
  `;

  // ── Special ──
  html += `
    <div class="stat-group">
      <div class="stat-group-header">
        <span class="stat-label">Special</span>
        <span class="stat-value">${computed.specialAttack}</span>
        <span class="stat-base">(base ${char.specialAttack})</span>
      </div>
      ${bonus('Charge Rate', computed.specialChargeRate)}
    </div>
  `;

  // ── Tool (only show if any bonus) ──
  if (computed.toolDamage || computed.toolChargeRate) {
    html += `
      <div class="stat-group">
        <div class="stat-group-header">
          <span class="stat-label">Tool</span>
        </div>
        ${bonus('Tool Damage', computed.toolDamage)}
        ${bonus('Charge Rate', computed.toolChargeRate)}
      </div>
    `;
  }

  // ── Elemental (only show if any bonus) ──
  if (computed.elementalDamage || computed.negativeEffectDuration || computed.negativeEffectDamage) {
    html += `
      <div class="stat-group">
        <div class="stat-group-header">
          <span class="stat-label">Elemental</span>
        </div>
        ${bonus('Elemental Dmg', computed.elementalDamage)}
        ${bonus('Effect Duration', computed.negativeEffectDuration)}
        ${bonus('Effect Damage', computed.negativeEffectDamage)}
      </div>
    `;
  }

  // ── Defense / Utility ──
  const defenseRows =
    `<div class="stat-sub"><span class="stat-sub-label">HP</span><span class="stat-sub-value">${computed.health} <span class="stat-base">(base ${char.health}, max ${char.maxHealth})</span></span></div>`
    + bonus('Dodge', computed.dodgeChance)
    + bonus('Move Speed', computed.moveSpeed)
    + bonus('Heal Effect.', computed.healEffectiveness)
    + (computed.revives > 0 ? `<div class="stat-sub"><span class="stat-sub-label">Revives</span><span class="stat-sub-value">${computed.revives}</span></div>` : '');

  html += `
    <div class="stat-group">
      <div class="stat-group-header">
        <span class="stat-label">Defense / Utility</span>
      </div>
      ${defenseRows}
    </div>
  `;

  container.innerHTML = html;
}

function renderToolSection() {
  const container = document.getElementById('sidebar-tool');
  if (!container) return;

  container.innerHTML = `
    <div class="sidebar-section-title">Tool</div>
    ${state.tool
      ? `<div class="sidebar-item" data-sidebar-tool="${state.tool}">
           <span>${state.tool} (Lv${state.toolLevel || 1})</span>
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
          <span>${name} (Lv${state.powerLevels[name] || 1})</span>
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
    const isStarter = isStartingInspiration(name);
    html += `
      <div class="sidebar-item${isStarter ? ' sidebar-item-locked' : ''}" data-sidebar-insp="${name}">
        <span>${name} (Lv${level})${isStarter ? ' \u2022 Starting' : ''}</span>
        ${isStarter ? '' : '<span class="sidebar-item-remove">x</span>'}
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

