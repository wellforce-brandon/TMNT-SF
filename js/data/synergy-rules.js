// TMNT: Splintered Fate - Synergy Rules Data
// Defines synergy conditions and descriptions for the build analyzer
//
// build shape: { powers: string[], tool: string|null, artifact: string|null, masteries: string[] }

// ---------------------
// Helper functions
// ---------------------

function hasAll(build, ...names) {
  return names.every(n => build.powers.includes(n));
}

function hasAny(build, ...names) {
  return names.some(n => build.powers.includes(n));
}

const FLAME_POWERS = [
  'Incendiary Strikes', 'Preheated', 'Inferno', 'Flame Strike',
  'Flame Dash', 'Flame Abilities', 'Flame Attack', 'Burn',
  'Flame Torrent', 'Heat Wave'
];

const WATER_POWERS = [
  'Still Waters', 'High Tide', 'Frost', 'Flash Freeze', 'Freeze',
  'Torrential Strike', 'When It Rains', 'Torrential Rain',
  'Water Strike', 'Water Dash', 'Water Abilities', 'Water Attack',
  'Tidal Force', 'Undertow'
];

const OOZE_POWERS = [
  'Potency', 'Chunky Mixture', 'Goo', "Goo'dbye", 'Living Ingredients',
  'Unfortunate Odor', 'Catalytic Consequence', 'Ooze Strike', 'Ooze Dash',
  'Ooze Abilities', 'Ooze Attack', 'Toxic Cloud', 'Ooze Burst'
];

const OOZE_APPLICATORS = [
  'Ooze Strike', 'Ooze Dash', 'Ooze Abilities', 'Ooze Attack'
];

const UTROM_POWERS = [
  'Electrifying', 'Alternating Current', 'Chain Lightning', 'Stormy Weather',
  'Utrom Strike', 'Utrom Dash', 'Utrom Abilities', 'Utrom Attack',
  'Voltage Spike', 'Arc Discharge'
];

const NINJA_POWERS = [
  'Shuriken Attacks', 'Throwing Arts: Ricochet', 'Shuriken Breaker',
  'Adrenaline', 'Art of Darkness', 'Heightened Senses', 'Quick Feet',
  'First Strike', 'Extended Assault', 'Ninjutsu Tactics',
  'Shadow Step', 'Shinobi Supremacy'
];

const ASTRAL_POWERS = [
  'Shimmering Shield', 'Illumination', 'Astral Insight',
  'Nightfall', 'Lingering Darkness', 'Eternal Darkness',
  'Dark Star', 'Revival', 'Astral Strike', 'Astral Dash'
];

const ROBOTICS_POWERS = [
  'Quick Study', 'System Calibration', 'Power Surge', 'Empowerment',
  'Synthetic Rush', 'Spare Bot', 'Charge Strike', 'Charge Dash',
  'Charge Abilities', 'Charge Attack', 'Overclock', 'Circuit Breaker'
];

const CHARGE_POWERS = [
  'Charge Strike', 'Charge Dash', 'Charge Abilities', 'Charge Attack'
];

const SHURIKEN_TOOLS = ['Shuriken', 'Shuriken Storm', 'Ooze Shuriken', 'Utrom Shuriken'];
const FLAME_TOOLS = ['Fireball', 'Meteor Storm'];
const OOZE_TOOLS = ['Ooze Shuriken', 'Unstable Canister'];
const UTROM_TOOLS = ['Utrom Drone', 'Utrom Rod', 'Utrom Shuriken'];

// ---------------------
// Synergy rules
// ---------------------

export const synergyRules = [
  // =====================
  // CRIT SYNERGIES
  // =====================
  {
    id: 'crit-engine',
    name: 'Crit Engine',
    description: 'Crit engine: 20% crit chance, crits deal 60-180% bonus + 50-100 Flame damage.',
    category: 'crit',
    check(build) {
      return hasAll(build, 'Furious Attacks', 'Precision', 'Incendiary Strikes');
    }
  },
  {
    id: 'crit-dodge-loop',
    name: 'Crit Dodge Loop',
    description: 'Dodge for global crit, attacks have base crit. Dodge feeds damage, damage feeds kills.',
    category: 'crit',
    check(build) {
      return hasAll(build, 'Furious Attacks', 'Ninjutsu Tactics');
    }
  },
  {
    id: 'burn-crit',
    name: 'Burn Crit',
    description: 'Crits against burning enemies. Preheated applies burn, Inferno converts burn into crit triggers.',
    category: 'crit',
    check(build) {
      return hasAll(build, 'Preheated', 'Inferno');
    }
  },

  // =====================
  // WATER SYNERGIES
  // =====================
  {
    id: 'empowered-final-strike',
    name: 'Empowered Final Strike',
    description: 'Empowered Final Strikes with bonus Water damage + speed. Still Waters buffs finishers, High Tide adds Water scaling.',
    category: 'water',
    check(build) {
      return hasAll(build, 'Still Waters', 'High Tide');
    }
  },
  {
    id: 'freeze-engine',
    name: 'Freeze Engine',
    description: 'Freeze engine: auto-apply Frost, stun on application. Frost + Flash Freeze + Freeze chains freezing across groups.',
    category: 'water',
    check(build) {
      return hasAll(build, 'Frost', 'Flash Freeze', 'Freeze');
    }
  },
  {
    id: 'torrent-stack',
    name: 'Torrent Stack',
    description: 'Torrent stacking from multiple sources. Torrential Strike, When It Rains, and Torrential Rain all feed Torrent buildup.',
    category: 'water',
    check(build) {
      return hasAll(build, 'Torrential Strike', 'When It Rains', 'Torrential Rain');
    }
  },

  // =====================
  // OOZE SYNERGIES
  // =====================
  {
    id: 'heavy-ooze',
    name: 'Heavy Ooze',
    description: 'Heavy Ooze: more stacks, higher cap, more damage. Potency + Chunky Mixture + Goo maximizes Ooze stack output.',
    category: 'ooze',
    check(build) {
      return hasAll(build, 'Potency', 'Chunky Mixture', 'Goo');
    }
  },
  {
    id: 'chain-ooze',
    name: 'Chain Ooze',
    description: "Chain Ooze: explosions on death, spreads to new targets. Goo'dbye detonates, Living Ingredients reapplies to nearby enemies.",
    category: 'ooze',
    check(build) {
      return hasAll(build, "Goo'dbye", 'Living Ingredients');
    }
  },
  {
    id: 'ooze-stun-dash',
    name: 'Ooze Stun Dash',
    description: 'Ooze application stuns + Dash Attack scales with stacks. Unfortunate Odor stuns on apply, Catalytic Consequence rewards high stacks.',
    category: 'ooze',
    check(build) {
      return hasAll(build, 'Unfortunate Odor', 'Catalytic Consequence');
    }
  },

  // =====================
  // UTROM SYNERGIES
  // =====================
  {
    id: 'electrified-debuff',
    name: 'Electrified Debuff',
    description: 'Electrified deals damage AND increases damage received. Dual offensive + defensive debuff on enemies.',
    category: 'utrom',
    check(build) {
      return hasAll(build, 'Electrifying', 'Alternating Current');
    }
  },
  {
    id: 'passive-utrom-aoe',
    name: 'Passive Utrom AoE',
    description: 'Passive AoE Utrom damage output. Chain Lightning arcs between enemies, Stormy Weather adds ambient Utrom ticks.',
    category: 'utrom',
    check(build) {
      return hasAll(build, 'Chain Lightning', 'Stormy Weather');
    }
  },

  // =====================
  // NINJA SYNERGIES
  // =====================
  {
    id: 'bouncing-guard-shuriken',
    name: 'Bouncing Guard Break Shuriken',
    description: 'Bouncing Guard Break shuriken. Shuriken Attacks as base, Ricochet adds bounces, Shuriken Breaker adds guard-breaking.',
    category: 'ninja',
    check(build) {
      return hasAll(build, 'Shuriken Attacks', 'Throwing Arts: Ricochet', 'Shuriken Breaker');
    }
  },
  {
    id: 'full-adrenaline-engine',
    name: 'Full Adrenaline Engine',
    description: 'Full Adrenaline engine: physical + elemental damage. Adrenaline stacks, Art of Darkness converts stacks, Heightened Senses extends duration.',
    category: 'ninja',
    check(build) {
      return hasAll(build, 'Adrenaline', 'Art of Darkness', 'Heightened Senses');
    }
  },
  {
    id: 'dash-focused',
    name: 'Dash Focused',
    description: 'Dash-focused: extra dashes, post-dash damage, shuriken on dash. Quick Feet + First Strike + Extended Assault for dash-centric playstyle.',
    category: 'ninja',
    check(build) {
      return hasAll(build, 'Quick Feet', 'First Strike', 'Extended Assault');
    }
  },

  // =====================
  // ASTRAL SYNERGIES
  // =====================
  {
    id: 'light-shell-uptime',
    name: 'Light Shell Uptime',
    description: 'Light Shell uptime: reflects projectiles, damage boost while shielded. Shimmering Shield + Illumination + Astral Insight for permanent shield cycling.',
    category: 'astral',
    check(build) {
      return hasAll(build, 'Shimmering Shield', 'Illumination', 'Astral Insight');
    }
  },
  {
    id: 'darkness-engine',
    name: 'Darkness Engine',
    description: 'Darkness engine: apply on Final Strike, DoT, extended duration. Nightfall applies, Lingering Darkness ticks, Eternal Darkness extends.',
    category: 'astral',
    check(build) {
      return hasAll(build, 'Nightfall', 'Lingering Darkness', 'Eternal Darkness');
    }
  },
  {
    id: 'dark-star-revival',
    name: 'Dark Star Revival',
    description: 'Risk/reward: sacrifice revives for massive damage. Dark Star converts revive charges into permanent damage boosts, Revival provides the charges to spend.',
    category: 'astral',
    check(build) {
      return hasAll(build, 'Dark Star', 'Revival');
    }
  },

  // =====================
  // ROBOTICS SYNERGIES
  // =====================
  {
    id: 'charge-engine',
    name: 'Charge Engine',
    description: 'Charge engine: faster charge, faster charge per activation. Any Charge power + Quick Study + System Calibration accelerates the loop.',
    category: 'robotics',
    check(build) {
      return hasAny(build, ...CHARGE_POWERS) &&
        hasAll(build, 'Quick Study', 'System Calibration');
    }
  },
  {
    id: 'power-surge-loop',
    name: 'Power Surge Loop',
    description: 'Tool/Special use feeds Charge, Charge boosts elemental damage. Power Surge + Empowerment creates a self-reinforcing elemental loop.',
    category: 'robotics',
    check(build) {
      return hasAll(build, 'Power Surge', 'Empowerment');
    }
  },
  {
    id: 'synthetic-adrenaline',
    name: 'Synthetic Adrenaline',
    description: 'Charge activations feed Adrenaline stacks. Synthetic Rush bridges Robotics and Ninja, doubling stack generation.',
    category: 'robotics',
    check(build) {
      return hasAll(build, 'Synthetic Rush', 'Adrenaline');
    }
  },

  // =====================
  // CROSS-ELEMENT SYNERGIES
  // =====================
  {
    id: 'frostfire-prep',
    name: 'Frostfire Prep',
    description: 'Frostfire prep: apply both elements for opposite-element bonus. Frost + Inferno creates multiplicative damage when both debuffs land.',
    category: 'cross-element',
    check(build) {
      return hasAll(build, 'Frost', 'Inferno');
    }
  },
  {
    id: 'crit-shuriken-foundation',
    name: 'Crit Shuriken Foundation',
    description: 'Crit shuriken foundation. Furious Attacks gives crit chance, Shuriken Attacks gives shuriken on hit, resulting in critting shuriken.',
    category: 'cross-element',
    check(build) {
      return hasAll(build, 'Furious Attacks', 'Shuriken Attacks');
    }
  },
  {
    id: 'slippery-prep',
    name: 'Slippery Prep',
    description: 'Slippery prep: max Adrenaline for speed + cooldown reduction. Adrenaline stacks from Ooze application powers, fueling evasion and mobility.',
    category: 'cross-element',
    check(build) {
      return build.powers.includes('Adrenaline') &&
        OOZE_APPLICATORS.some(p => build.powers.includes(p));
    }
  },

  // =====================
  // TOOL SYNERGIES
  // =====================
  {
    id: 'shuriken-tool-ninja',
    name: 'Shuriken Tool + Ninja Powers',
    description: 'Shuriken tools benefit from Ninja shuriken upgrades. Tool shuriken inherit Shuriken Attacks bonuses like crit and bounce.',
    category: 'tool',
    check(build) {
      return SHURIKEN_TOOLS.includes(build.tool) &&
        build.powers.includes('Shuriken Attacks');
    }
  },
  {
    id: 'flame-tool-synergy',
    name: 'Flame Tool Synergy',
    description: 'Tool triggers Flame damage effects. Fireball/Meteor Storm activates burn, Inferno, and Flame power bonuses.',
    category: 'tool',
    check(build) {
      return FLAME_TOOLS.includes(build.tool) &&
        FLAME_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'ooze-tool-synergy',
    name: 'Ooze Tool Synergy',
    description: 'Tool applies Ooze stacks. Ooze Shuriken/Unstable Canister feeds Ooze stack-based powers like Potency and Catalytic Consequence.',
    category: 'tool',
    check(build) {
      return OOZE_TOOLS.includes(build.tool) &&
        OOZE_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'utrom-tool-synergy',
    name: 'Utrom Tool Synergy',
    description: 'Tool triggers Utrom damage effects. Utrom Drone/Rod/Shuriken activates Electrified, Chain Lightning, and Utrom power bonuses.',
    category: 'tool',
    check(build) {
      return UTROM_TOOLS.includes(build.tool) &&
        UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },

  // =====================
  // ARTIFACT SYNERGIES
  // =====================
  {
    id: 'water-artifact-stack',
    name: 'Water Artifact Stack',
    description: 'Water artifact maximizes Water power acquisition. Manhole Cover boosts Water offering rate, pairing with 3+ Water powers snowballs the element.',
    category: 'artifact',
    check(build) {
      return build.artifact === 'Manhole Cover' &&
        WATER_POWERS.filter(p => build.powers.includes(p)).length >= 3;
    }
  },
  {
    id: 'robotics-artifact-charge',
    name: 'Robotics Artifact Charge',
    description: 'Robotics artifact feeds Charge-based secondary unlocks. Positronic Motherboard + 3+ Robotics powers ensures consistent Charge uptime.',
    category: 'artifact',
    check(build) {
      return build.artifact === 'Positronic Motherboard' &&
        ROBOTICS_POWERS.filter(p => build.powers.includes(p)).length >= 3;
    }
  },
  {
    id: 'pizza-box-boost-stack',
    name: 'Pizza Box Boost Stack',
    description: 'Extended Boost duration stacking. Insulated Pizza Box + Shelf Life or Special Spice compounds boost uptime for permanent buff windows.',
    category: 'artifact',
    check(build) {
      return build.artifact === 'Insulated Pizza Box' &&
        hasAny(build, 'Shelf Life', 'Special Spice');
    }
  },
  {
    id: 'war-staff-damage',
    name: 'War Staff Damage',
    description: 'Risk/reward: +100% damage taken but massive currency gains. War Staff paired with 5+ damage powers turns glass-cannon into a farming machine.',
    category: 'artifact',
    check(build) {
      const damagePowers = build.powers.filter(p =>
        FLAME_POWERS.includes(p) ||
        OOZE_POWERS.includes(p) ||
        UTROM_POWERS.includes(p) ||
        NINJA_POWERS.includes(p) ||
        ROBOTICS_POWERS.includes(p)
      );
      return build.artifact === 'War Staff' && damagePowers.length >= 5;
    }
  },
  {
    id: 'revive-stack',
    name: 'Revive Stack',
    description: 'Revive stacking for survivability. Clan Hamato Seal gives extra revive charges, Revival or Spare Bot adds even more.',
    category: 'artifact',
    check(build) {
      return build.artifact === 'Clan Hamato Seal' &&
        hasAny(build, 'Revival', 'Spare Bot');
    }
  },
  {
    id: 'dodge-defense',
    name: 'Dodge Defense',
    description: 'Dodge-focused defensive build. Heart of Tengu dodge bonus + Shinobi Supremacy or Ninjutsu Tactics dodge-on-kill for evasion tanking.',
    category: 'artifact',
    check(build) {
      return build.artifact === 'Heart of Tengu' &&
        hasAny(build, 'Shinobi Supremacy', 'Ninjutsu Tactics');
    }
  }
];
