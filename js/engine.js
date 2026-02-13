// TMNT: Splintered Fate - Synergy Engine
// Prerequisite checks, element combos, mechanical synergies, damage calc

import { powers } from './data/powers.js';
import { synergyRules } from './data/synergy-rules.js';
import { upgrades } from './data/upgrades.js';

// ---- Lookup Maps (built once) ----
let powersByName = null;
let powersByType = null;

function ensureLookups() {
  if (powersByName) return;
  powersByName = new Map();
  powersByType = new Map();
  for (const p of powers) {
    powersByName.set(p.name, p);
    if (!powersByType.has(p.type)) powersByType.set(p.type, []);
    powersByType.get(p.type).push(p);
  }
}

// ---- Prerequisite Checking ----

// Parse a requires string to determine if it's met by the current build
function isPrerequisiteMet(requiresStr, buildPowerNames, buildPowerSet) {
  if (!requiresStr) return true;

  ensureLookups();
  const req = requiresStr.toLowerCase();

  // "After X + Y" pattern (dual prerequisite)
  if (req.includes(' + ')) {
    const parts = requiresStr.split(' + ').map(s => s.trim().replace(/^after /i, ''));
    return parts.every(part => isPartMet(part, buildPowerNames, buildPowerSet));
  }

  // Single prerequisite
  const cleaned = requiresStr.replace(/^after /i, '');
  return isPartMet(cleaned, buildPowerNames, buildPowerSet);
}

function isPartMet(part, buildPowerNames, buildPowerSet) {
  ensureLookups();

  // Direct power name match
  if (buildPowerSet.has(part)) return true;

  // Handle OR patterns: "Quick Feet/First Strike"
  if (part.includes('/')) {
    const alternatives = part.split('/').map(s => s.trim());
    return alternatives.some(alt => buildPowerSet.has(alt));
  }

  // Category matches
  const partLower = part.toLowerCase();

  if (partLower === 'dealing water damage') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'water';
    });
  }
  if (partLower === 'dealing flame damage') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'flame';
    });
  }
  if (partLower === 'dealing utrom damage') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'utrom';
    });
  }
  if (partLower === 'applying ooze') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'ooze';
    });
  }
  if (partLower === 'charge') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'robotics';
    });
  }
  if (partLower === 'darkness') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'dark';
    });
  }
  if (partLower === 'light') {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === 'light';
    });
  }
  if (partLower === 'frost') {
    return buildPowerSet.has('Frost');
  }
  if (partLower === 'inferno') {
    return buildPowerSet.has('Inferno');
  }
  if (partLower === 'electrifying') {
    return buildPowerSet.has('Electrifying');
  }

  // Generic category matches for legendary prerequisites
  if (partLower.includes('water damage power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'water');
  }
  if (partLower.includes('flame damage power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'flame');
  }
  if (partLower.includes('utrom damage power') || partLower.includes('utrom power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'utrom');
  }
  if (partLower.includes('darkness power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'dark');
  }
  if (partLower.includes('ooze applicator')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'ooze');
  }
  if (partLower.includes('any ninja power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'ninja');
  }
  if (partLower.includes('charge power') || partLower.includes('robotics power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'robotics');
  }

  return false;
}

export function checkPrerequisites(buildPowerNames) {
  ensureLookups();
  const buildPowerSet = new Set(buildPowerNames);
  const available = [];
  const locked = [];

  for (const power of powers) {
    if (power.tier !== 'secondary') continue;
    if (buildPowerSet.has(power.name)) continue;

    // For legendaries, check requiredPowers
    if (power.type === 'legendary' && power.requiredPowers) {
      const met = power.requiredPowers.every(req =>
        isPartMet(req, buildPowerNames, buildPowerSet)
      );
      if (met) {
        available.push(power);
      } else {
        locked.push(power);
      }
      continue;
    }

    // For regular secondaries, check requires
    if (isPrerequisiteMet(power.requires, buildPowerNames, buildPowerSet)) {
      available.push(power);
    } else {
      locked.push(power);
    }
  }

  return { available, locked };
}

// ---- Element Combo Tracking ----

export function checkElementCombos(buildPowerNames) {
  ensureLookups();
  const elementCounts = new Map();

  for (const name of buildPowerNames) {
    const power = powersByName.get(name);
    if (power && power.type !== 'legendary') {
      elementCounts.set(power.type, (elementCounts.get(power.type) || 0) + 1);
    }
  }

  const legendaries = powersByType.get('legendary') || [];
  const nearComplete = [];
  const complete = [];

  for (const leg of legendaries) {
    if (!leg.combo) continue;
    const [el1, el2] = leg.combo;
    const has1 = elementCounts.has(el1);
    const has2 = elementCounts.has(el2);

    if (has1 && has2) {
      complete.push({ legendary: leg, elements: [el1, el2] });
    } else if (has1 || has2) {
      const missing = has1 ? el2 : el1;
      nearComplete.push({ legendary: leg, has: has1 ? el1 : el2, missing });
    }
  }

  return { elementCounts, nearComplete, complete };
}

// ---- Mechanical Synergies ----

export function checkMechanicalSynergies(build) {
  const activeSynergies = [];

  for (const rule of synergyRules) {
    if (rule.check(build)) {
      activeSynergies.push({
        id: rule.id,
        name: rule.name,
        description: rule.description,
        category: rule.category
      });
    }
  }

  return activeSynergies;
}

// ---- Build Focus ----

export function calcBuildFocus(buildPowerNames) {
  ensureLookups();
  const types = new Set();

  for (const name of buildPowerNames) {
    const power = powersByName.get(name);
    if (power && power.type !== 'legendary') {
      types.add(power.type);
    }
  }

  const count = types.size;
  let level, label;

  if (count <= 2) {
    level = 'focused';
    label = 'Focused';
  } else if (count <= 4) {
    level = 'balanced';
    label = 'Balanced';
  } else {
    level = 'scattered';
    label = 'Scattered';
  }

  return { level, label, typeCount: count, types: [...types] };
}

// ---- Damage Estimate ----

export function calcDamageEstimate(state, upgradeState) {
  // Sum all additive % bonuses
  let totalBonus = 0;

  // Upgrade bonuses
  for (const upg of upgrades) {
    if (upg.stat && upg.stat === 'attackDamage' && upgradeState[upg.name]) {
      totalBonus += upg.perLevel * upgradeState[upg.name];
    }
  }

  // Additional damage bonuses from relevant upgrades
  for (const upg of upgrades) {
    const level = upgradeState[upg.name] || 0;
    if (level === 0) continue;

    if (upg.stat === 'critChance' || upg.stat === 'critDamage' ||
        upg.stat === 'elementalDamage' || upg.stat === 'toolDamage' ||
        upg.stat === 'dashAttackDamage') {
      totalBonus += upg.perLevel * level;
    }
  }

  const multiplier = 1 + totalBonus / 100;

  return {
    totalBonusPercent: Math.round(totalBonus),
    multiplier: Math.round(multiplier * 100) / 100
  };
}

// ---- Computed Stats with Upgrades ----

export function computeCharacterStats(baseChar, upgradeState) {
  if (!baseChar) return null;

  const getBonus = (statKey) => {
    let bonus = 0;
    for (const upg of upgrades) {
      if (upg.stat === statKey && upgradeState[upg.name]) {
        bonus += upg.perLevel * upgradeState[upg.name];
      }
    }
    return bonus;
  };

  const applyPercent = (base, statKey) => {
    const bonus = getBonus(statKey);
    return Math.round(base * (1 + bonus / 100));
  };

  const applyFlat = (base, statKey) => {
    let flat = 0;
    for (const upg of upgrades) {
      if (upg.stat === statKey && upgradeState[upg.name]) {
        flat += upgradeState[upg.name]; // 1 per level for flat bonuses
      }
    }
    return base + flat;
  };

  return {
    health: applyPercent(baseChar.health, 'maxHealth'),
    maxHealth: applyPercent(baseChar.maxHealth, 'maxHealth'),
    attackDamage: applyPercent(baseChar.attackDamage, 'attackDamage'),
    dashAttack: applyPercent(baseChar.dashAttack, 'dashAttackDamage'),
    specialAttack: applyPercent(baseChar.specialAttack, 'specialAttack'),
    specialChargeRate: applyPercent(baseChar.specialChargeRate * 100, 'specialChargeRate') / 100,
    critChance: getBonus('critChance'),
    critDamage: getBonus('critDamage'),
    dodgeChance: getBonus('dodgeChance'),
    moveSpeed: getBonus('moveSpeed'),
    dashCharges: applyFlat(1, 'dashCharges'),
    revives: applyFlat(0, 'revives')
  };
}

// ---- Full Analysis ----

export function runFullAnalysis(state, upgradeState) {
  const prerequisites = checkPrerequisites(state.powers);
  const combos = checkElementCombos(state.powers);
  const synergies = checkMechanicalSynergies({
    powers: state.powers,
    tool: state.tool,
    artifact: state.artifact,
    masteries: state.masteries
  });
  const focus = calcBuildFocus(state.powers);
  const damage = calcDamageEstimate(state, upgradeState);

  return {
    prerequisites,
    combos,
    synergies,
    focus,
    damage,
    powerCount: state.powers.length,
    elementCounts: combos.elementCounts
  };
}
