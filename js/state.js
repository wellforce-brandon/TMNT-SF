// TMNT: Splintered Fate - App State Management
// Central state with mutation helpers and localStorage persistence

import { characters } from './data/characters.js';

const STORAGE_KEY_UPGRADES = 'tmnt-sf-upgrades';
const STORAGE_KEY_SETTINGS = 'tmnt-sf-settings';
const STORAGE_KEY_BUILD = 'tmnt-sf-build';

// ---- Event System ----
const listeners = new Map();

export function on(event, fn) {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(fn);
  return () => listeners.get(event).delete(fn);
}

function emit(event, data) {
  if (listeners.has(event)) {
    for (const fn of listeners.get(event)) fn(data);
  }
}

// ---- App State ----
export const state = {
  character: null,
  artifact: null,
  artifactLevel: 1,
  tool: null,
  powers: [],
  masteries: [],
  inspirations: {},    // { inspirationName: level }
  activeTab: 'powers',
  filters: {
    types: new Set(),
    slot: 'all',
    tier: 'all',
    search: ''
  },
  masteryView: 'character'  // 'character' | 'element'
};

// ---- Settings State ----
export const settings = {
  autoTheme: true,
  themeMode: 'dark'    // 'light' | 'dark' (only used when no character or autoTheme off)
};

// ---- Upgrade State ----
export const upgradeState = {};

// ---- State Mutations ----

export function selectCharacter(charId) {
  if (state.character === charId) {
    state.character = null;
    state.tool = null;
  } else {
    state.character = charId;
    const char = characters.find(c => c.id === charId);
    if (char) {
      state.tool = char.defaultTool;
    }
  }
  // Reset character-specific selections
  state.masteries = [];
  state.inspirations = {};
  emit('character-changed', state.character);
  emit('build-changed', state);
}

export function addPower(powerName) {
  if (!state.powers.includes(powerName)) {
    state.powers.push(powerName);
    emit('build-changed', state);
    saveBuild();
  }
}

export function removePower(powerName) {
  const idx = state.powers.indexOf(powerName);
  if (idx !== -1) {
    state.powers.splice(idx, 1);
    emit('build-changed', state);
    saveBuild();
  }
}

export function togglePower(powerName) {
  if (state.powers.includes(powerName)) {
    removePower(powerName);
  } else {
    addPower(powerName);
  }
}

export function setTool(toolName) {
  state.tool = toolName;
  emit('build-changed', state);
  saveBuild();
}

export function setArtifact(artifactName, level) {
  if (state.artifact === artifactName && level === undefined) {
    state.artifact = null;
    state.artifactLevel = 1;
  } else {
    state.artifact = artifactName;
    if (level !== undefined) state.artifactLevel = level;
  }
  emit('build-changed', state);
  saveBuild();
}

export function setArtifactLevel(level) {
  state.artifactLevel = level;
  emit('build-changed', state);
  saveBuild();
}

export function toggleMastery(masteryName) {
  const idx = state.masteries.indexOf(masteryName);
  if (idx !== -1) {
    state.masteries.splice(idx, 1);
  } else {
    state.masteries.push(masteryName);
  }
  emit('build-changed', state);
  saveBuild();
}

export function setInspirationLevel(inspirationName, level) {
  if (level === 0) {
    delete state.inspirations[inspirationName];
  } else {
    state.inspirations[inspirationName] = level;
  }
  emit('build-changed', state);
  saveBuild();
}

export function setActiveTab(tab) {
  state.activeTab = tab;
  emit('tab-changed', tab);
}

export function setFilter(key, value) {
  if (key === 'types') {
    state.filters.types = value;
  } else {
    state.filters[key] = value;
  }
  emit('filter-changed', state.filters);
}

export function toggleTypeFilter(type) {
  if (state.filters.types.has(type)) {
    state.filters.types.delete(type);
  } else {
    state.filters.types.add(type);
  }
  emit('filter-changed', state.filters);
}

export function setMasteryView(view) {
  state.masteryView = view;
  emit('mastery-view-changed', view);
}

export function clearBuild() {
  state.powers = [];
  state.masteries = [];
  state.inspirations = {};
  state.artifact = null;
  state.artifactLevel = 1;
  if (state.character) {
    const char = characters.find(c => c.id === state.character);
    if (char) state.tool = char.defaultTool;
  } else {
    state.tool = null;
  }
  emit('build-changed', state);
  saveBuild();
}

// ---- Upgrade Mutations ----

export function setUpgradeLevel(upgradeName, level) {
  upgradeState[upgradeName] = level;
  emit('upgrades-changed', upgradeState);
  saveUpgrades();
}

export function maxAllUpgrades(upgradesData) {
  for (const upg of upgradesData) {
    upgradeState[upg.name] = upg.maxLevel;
  }
  emit('upgrades-changed', upgradeState);
  saveUpgrades();
}

export function resetAllUpgrades() {
  for (const key of Object.keys(upgradeState)) {
    upgradeState[key] = 0;
  }
  emit('upgrades-changed', upgradeState);
  saveUpgrades();
}

// ---- Settings Mutations ----

export function setAutoTheme(value) {
  settings.autoTheme = value;
  emit('settings-changed', settings);
  saveSettings();
}

export function setThemeMode(mode) {
  settings.themeMode = mode;
  emit('settings-changed', settings);
  saveSettings();
}

// ---- Computed Values ----

export function getCharacter() {
  if (!state.character) return null;
  return characters.find(c => c.id === state.character) || null;
}

export function getComputedStats() {
  const char = getCharacter();
  if (!char) return null;

  const get = (stat, fallback) => {
    let bonus = 0;
    for (const [key, level] of Object.entries(upgradeState)) {
      if (level > 0) {
        // This will be enhanced when we have the upgrades data loaded
        // For now, we just track the raw levels
      }
    }
    return fallback;
  };

  return {
    health: char.health,
    maxHealth: char.maxHealth,
    attackDamage: char.attackDamage,
    dashAttack: char.dashAttack,
    specialAttack: char.specialAttack,
    specialChargeRate: char.specialChargeRate
  };
}

// ---- Persistence ----

function saveBuild() {
  try {
    const data = {
      character: state.character,
      powers: state.powers,
      tool: state.tool,
      artifact: state.artifact,
      artifactLevel: state.artifactLevel,
      masteries: state.masteries,
      inspirations: state.inspirations
    };
    localStorage.setItem(STORAGE_KEY_BUILD, JSON.stringify(data));
  } catch (e) {
    // localStorage unavailable
  }
}

function saveUpgrades() {
  try {
    localStorage.setItem(STORAGE_KEY_UPGRADES, JSON.stringify(upgradeState));
  } catch (e) {
    // localStorage unavailable
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    // localStorage unavailable
  }
}

export function loadPersistedState() {
  try {
    // Load upgrades
    const upgStr = localStorage.getItem(STORAGE_KEY_UPGRADES);
    if (upgStr) {
      Object.assign(upgradeState, JSON.parse(upgStr));
    }

    // Load settings
    const setStr = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (setStr) {
      Object.assign(settings, JSON.parse(setStr));
    }

    // Load build
    const buildStr = localStorage.getItem(STORAGE_KEY_BUILD);
    if (buildStr) {
      const data = JSON.parse(buildStr);
      if (data.character) state.character = data.character;
      if (data.powers) state.powers = data.powers;
      if (data.tool) state.tool = data.tool;
      if (data.artifact) state.artifact = data.artifact;
      if (data.artifactLevel) state.artifactLevel = data.artifactLevel;
      if (data.masteries) state.masteries = data.masteries;
      if (data.inspirations) state.inspirations = data.inspirations;
    }
  } catch (e) {
    // localStorage unavailable or corrupt data
  }
}
