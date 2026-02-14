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
  'Flame Abilities', 'Flame Dash', 'Flame Strike', 'Furious Attacks',
  'Rage', 'Rapid Fire', 'Focus Fire', 'Inferno', 'Precision',
  'Incendiary Strikes', 'Blazing Inferno', 'Preheated', 'Trailblazer'
];

const WATER_POWERS = [
  'Dilution', 'Still Waters', 'Torrential Strike', 'Water Abilities',
  'Water Attacks', 'Water Dash', 'Frost', 'Heavy Rain', 'Splash Damage',
  'Pressure Nozzle', 'High Tide', 'Torrential Rain', 'When It Rains',
  'Flash Freeze', 'Freeze'
];

const OOZE_POWERS = [
  'Ooze Abilities', 'Ooze Attack', 'Ooze Dash', 'Ooze Strike',
  'Shelf Life', 'Special Spice', 'Catalytic Consequence', 'Chunky Mixture',
  'Goo', "Goo'dbye", 'Living Ingredients', 'Potency', 'Unfortunate Odor'
];

const OOZE_APPLICATORS = [
  'Ooze Strike', 'Ooze Dash', 'Ooze Abilities', 'Ooze Attack'
];

const UTROM_POWERS = [
  'Utrom Abilities', 'Utrom Attacks', 'Utrom Battery', 'Utrom Dash',
  'Utrom Strike', 'Chain Lightning', 'Charged Up', 'Electrifying',
  'Utrom Relay', 'Stormy Weather', 'Techno-Organic Interface', 'Alternating Current'
];

const NINJA_POWERS = [
  'Adrenaline', 'First Strike', 'Quick Feet', 'Shinobi Supremacy',
  'Shuriken Attacks', 'Art of Darkness', 'Heightened Senses', 'Quick Hands',
  'Shuriken Breaker', 'Shuriken Engineer', 'Throwing Mastery',
  'Throwing Arts: Chakram', 'Throwing Arts: Ricochet', 'Ninjutsu Tactics',
  'Extended Assault'
];

const LIGHT_POWERS = [
  'Light Attacks', 'Shimmering Shield', 'Ancestral Guardian', 'Daybreak',
  'Eternal Light', 'Light Embrace', 'Radiant Warrior', 'Revival',
  'Astral Insight', 'Illumination', 'Revved Up'
];

const DARK_POWERS = [
  'Cloak of Shadow', 'Nightfall', 'Call of the Void', 'Core Collapse',
  'Dark Attacks', 'Dark Embrace', 'Dark Star', "Dragon's Claw",
  'Eternal Darkness', 'Gift of the Dragon', 'Lingering Darkness', 'Shifting Shadow'
];

const ASTRAL_POWERS = [...LIGHT_POWERS, ...DARK_POWERS];

const ROBOTICS_POWERS = [
  'Aggressive Savings', 'Ascendancy', 'Blade Matrix', 'Challenge Seeker',
  'Compound Interest', 'Laser Strike', 'Last Stand Protocol', 'Overdrive',
  'Regular Customer', 'Spare Bot', 'Survival Matrix', 'Wireless Charging',
  'Biomechanical Speed', 'Charge Attacks', 'Empowerment', 'Photon Lance',
  'Power Surge', 'Synthetic Rush', 'System Calibration', 'Thunderheart', 'Quick Study'
];

const CHARGE_POWERS = [
  'Blade Matrix', 'Laser Strike', 'Overdrive', 'Photon Lance'
];

const SHURIKEN_TOOLS = ['Shuriken', 'Shuriken Storm', 'Ooze Shuriken', 'Utrom Shuriken'];
const FLAME_TOOLS = ['Fireball', 'Meteor Storm'];
const OOZE_TOOLS = ['Ooze Shuriken', 'Unstable Canister'];
const UTROM_TOOLS = ['Utrom Drone', 'Utrom Rod', 'Utrom Shuriken'];
const WATER_TOOLS = ['Ride the Wave', 'Water Sweep'];

// ---------------------
// Synergy rules
// ---------------------
// Categories:
//   combo          — power+power mechanical interactions
//   tool-combo     — tool+power synergies
//   legendary-path — close to unlocking a legendary, suggests what to pick next
//   artifact-combo — artifact+power real interactions

export const synergyRules = [

  // =====================
  // COMBO — Power+Power Synergies
  // =====================
  {
    id: 'crit-engine',
    name: 'Crit Engine',
    description: 'Furious Attacks gives crit chance, Precision boosts crit damage, Incendiary Strikes adds Flame damage on crit. Full crit loop online.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Furious Attacks', 'Precision', 'Incendiary Strikes');
    }
  },
  {
    id: 'crit-dodge-loop',
    name: 'Crit Dodge Loop',
    description: 'Ninjutsu Tactics grants crit after dodge. Furious Attacks adds base crit chance. Dodge-attack-dodge rhythm maximizes damage.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Furious Attacks', 'Ninjutsu Tactics');
    }
  },
  {
    id: 'burn-crit',
    name: 'Burn Crit',
    description: 'Preheated applies burn on hit, Inferno converts burn stacks into crit triggers. Burning enemies take crits automatically.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Preheated', 'Inferno');
    }
  },
  {
    id: 'empowered-final-strike',
    name: 'Empowered Final Strike',
    description: 'Still Waters buffs Final Strike damage, High Tide adds Water scaling. Massive burst on every combo finisher.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Still Waters', 'High Tide');
    }
  },
  {
    id: 'freeze-engine',
    name: 'Freeze Engine',
    description: 'Frost slows enemies, Flash Freeze stuns frozen targets, Freeze chains the effect to nearby enemies. Full crowd-control loop.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Frost', 'Flash Freeze', 'Freeze');
    }
  },
  {
    id: 'torrent-stack',
    name: 'Torrent Stack',
    description: 'Three sources of Torrent buildup. Torrential Strike, When It Rains, and Torrential Rain stack Multi-Hit chance rapidly.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Torrential Strike', 'When It Rains', 'Torrential Rain');
    }
  },
  {
    id: 'heavy-ooze',
    name: 'Heavy Ooze',
    description: 'Potency raises stack cap, Chunky Mixture adds stacks per application, Goo increases stack damage. Maximum Ooze output.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Potency', 'Chunky Mixture', 'Goo');
    }
  },
  {
    id: 'chain-ooze',
    name: 'Chain Ooze',
    description: "Goo'dbye detonates Ooze on death, Living Ingredients reapplies stacks to nearby enemies. Explosions chain through groups.",
    category: 'combo',
    check(build) {
      return hasAll(build, "Goo'dbye", 'Living Ingredients');
    }
  },
  {
    id: 'ooze-stun-dash',
    name: 'Ooze Stun Dash',
    description: 'Unfortunate Odor stuns on Ooze application, Catalytic Consequence makes Dash Attack scale with Ooze stacks. Stun-dash loop.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Unfortunate Odor', 'Catalytic Consequence');
    }
  },
  {
    id: 'electrified-debuff',
    name: 'Electrified Debuff',
    description: 'Electrifying applies Electrified (DoT), Alternating Current makes Electrified enemies take more damage. Offensive + defensive debuff.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Electrifying', 'Alternating Current');
    }
  },
  {
    id: 'electrified-chain',
    name: 'Electrified Chain',
    description: 'Chain Lightning spreads between enemies, Electrifying applies the debuff, Alternating Current amps damage on all targets. AoE Utrom devastation.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Electrifying', 'Chain Lightning', 'Alternating Current');
    }
  },
  {
    id: 'passive-utrom-aoe',
    name: 'Passive Utrom AoE',
    description: 'Chain Lightning arcs between enemies, Stormy Weather adds ambient Utrom ticks. Passive AoE damage without attacking.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Chain Lightning', 'Stormy Weather');
    }
  },
  {
    id: 'bouncing-guard-shuriken',
    name: 'Bouncing Guard Break Shuriken',
    description: 'Shuriken Attacks as base, Ricochet adds bounces, Shuriken Breaker adds guard-breaking. Shuriken clear rooms and break shields.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Shuriken Attacks', 'Throwing Arts: Ricochet', 'Shuriken Breaker');
    }
  },
  {
    id: 'full-adrenaline-engine',
    name: 'Full Adrenaline Engine',
    description: 'Adrenaline stacks on kill, Art of Darkness converts stacks to elemental damage, Heightened Senses extends duration. Full Adrenaline loop.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Adrenaline', 'Art of Darkness', 'Heightened Senses');
    }
  },
  {
    id: 'dash-focused',
    name: 'Dash Focused',
    description: 'Quick Feet adds dashes, First Strike boosts post-dash damage, Extended Assault fires shuriken on dash. Dash-centric playstyle.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Quick Feet', 'First Strike', 'Extended Assault');
    }
  },
  {
    id: 'light-shell-uptime',
    name: 'Light Shell Uptime',
    description: 'Shimmering Shield blocks and reflects, Illumination boosts damage while shielded, Astral Insight speeds shield regeneration. Permanent shell cycling.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Shimmering Shield', 'Illumination', 'Astral Insight');
    }
  },
  {
    id: 'darkness-engine',
    name: 'Darkness Engine',
    description: 'Nightfall applies Darkness on Final Strike, Lingering Darkness adds DoT ticks, Eternal Darkness extends duration. Darkness stays active permanently.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Nightfall', 'Lingering Darkness', 'Eternal Darkness');
    }
  },
  {
    id: 'dark-star-revival',
    name: 'Dark Star Revival',
    description: 'Dark Star converts revive charges into permanent damage. Revival provides extra charges to fuel it. High-risk, high-reward.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Dark Star', 'Revival');
    }
  },
  {
    id: 'darkness-kill-chain',
    name: 'Darkness Kill Chain',
    description: 'Call of the Void pulls enemies on Darkness kill, Core Collapse stuns nearby on Darkness kill. Chain-reaction through mob packs.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Call of the Void', 'Core Collapse');
    }
  },
  {
    id: 'charge-engine',
    name: 'Charge Engine',
    description: 'Charge power builds meter, Quick Study speeds charge rate, System Calibration boosts effects. Self-reinforcing Charge loop.',
    category: 'combo',
    check(build) {
      return hasAny(build, ...CHARGE_POWERS) &&
        hasAll(build, 'Quick Study', 'System Calibration');
    }
  },
  {
    id: 'power-surge-loop',
    name: 'Power Surge Loop',
    description: 'Power Surge generates Charge from Tool/Special use, Empowerment converts Charge into elemental damage boost. Self-feeding damage loop.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Power Surge', 'Empowerment');
    }
  },
  {
    id: 'synthetic-adrenaline',
    name: 'Synthetic Adrenaline',
    description: 'Synthetic Rush grants Adrenaline stacks on Charge activation. Bridges Robotics and Ninja for double stack generation.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Synthetic Rush', 'Adrenaline');
    }
  },
  {
    id: 'frostfire-prep',
    name: 'Frostfire Prep',
    description: 'Frost applies slow/freeze, Inferno applies burn. Both active together enables Frostfire legendary for opposite-element bonus damage.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Frost', 'Inferno');
    }
  },
  {
    id: 'crit-shuriken-foundation',
    name: 'Crit Shuriken Foundation',
    description: 'Furious Attacks gives crit chance to all attacks, Shuriken Attacks fires shuriken on hit. Your shuriken inherit the crit chance.',
    category: 'combo',
    check(build) {
      return hasAll(build, 'Furious Attacks', 'Shuriken Attacks');
    }
  },
  {
    id: 'slippery-prep',
    name: 'Slippery Prep',
    description: 'Adrenaline stacks from Ooze application powers. Builds toward the Slippery legendary (max Adrenaline = speed + charge boost).',
    category: 'combo',
    check(build) {
      return build.powers.includes('Adrenaline') &&
        OOZE_APPLICATORS.some(p => build.powers.includes(p));
    }
  },

  // =====================
  // TOOL-COMBO — Tool+Power Synergies
  // =====================
  {
    id: 'shuriken-tool-ninja',
    name: 'Shuriken Tool + Shuriken Powers',
    description: 'Tool shuriken inherit Shuriken Attacks bonuses. Look for Throwing Mastery and Ricochet to supercharge tool damage.',
    category: 'tool-combo',
    check(build) {
      return SHURIKEN_TOOLS.includes(build.tool) &&
        build.powers.includes('Shuriken Attacks');
    }
  },
  {
    id: 'shuriken-tool-mastery',
    name: 'Shuriken Tool + Throwing Mastery',
    description: 'Throwing Mastery boosts all shuriken damage by up to 90%. Your shuriken tool benefits from this directly.',
    category: 'tool-combo',
    check(build) {
      return SHURIKEN_TOOLS.includes(build.tool) &&
        build.powers.includes('Throwing Mastery');
    }
  },
  {
    id: 'flame-tool-synergy',
    name: 'Flame Tool + Flame Powers',
    description: 'Fireball/Meteor Storm deals Flame damage, triggering burn effects from Preheated, Inferno, and other Flame bonuses.',
    category: 'tool-combo',
    check(build) {
      return FLAME_TOOLS.includes(build.tool) &&
        FLAME_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'ooze-tool-synergy',
    name: 'Ooze Tool + Ooze Powers',
    description: 'Ooze Shuriken/Unstable Canister applies Ooze stacks, feeding Potency, Catalytic Consequence, and other stack-based powers.',
    category: 'tool-combo',
    check(build) {
      return OOZE_TOOLS.includes(build.tool) &&
        OOZE_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'ooze-shuriken-double',
    name: 'Ooze Shuriken + Shuriken Attacks',
    description: 'Attack shuriken and tool shuriken both apply Ooze stacks. Double the Ooze application sources.',
    category: 'tool-combo',
    check(build) {
      return build.tool === 'Ooze Shuriken' &&
        build.powers.includes('Shuriken Attacks');
    }
  },
  {
    id: 'utrom-tool-synergy',
    name: 'Utrom Tool + Utrom Powers',
    description: 'Utrom Drone/Rod/Shuriken deals Utrom damage, activating Electrified, Chain Lightning, and Utrom power bonuses.',
    category: 'tool-combo',
    check(build) {
      return UTROM_TOOLS.includes(build.tool) &&
        UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'water-tool-frost',
    name: 'Water Tool + Frost',
    description: 'Ride the Wave/Water Sweep deals Water damage, Frost converts that into slows. Tool hits slow entire groups.',
    category: 'tool-combo',
    check(build) {
      return WATER_TOOLS.includes(build.tool) &&
        build.powers.includes('Frost');
    }
  },

  // =====================
  // LEGENDARY-PATH — Near a legendary unlock
  // =====================

  // Frostfire: Frost + any Flame power
  {
    id: 'path-frostfire-need-flame',
    name: 'Path to Frostfire',
    description: 'You have Frost. Pick up any Flame damage power to unlock Frostfire (deal 30% opposite-element damage with Flame/Water).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Frostfire')) return false;
      return build.powers.includes('Frost') && !FLAME_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-frostfire-need-frost',
    name: 'Path to Frostfire',
    description: 'You have Flame powers. Pick up Frost to unlock Frostfire (deal 30% opposite-element damage with Flame/Water).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Frostfire')) return false;
      return !build.powers.includes('Frost') && FLAME_POWERS.some(p => build.powers.includes(p)) &&
        WATER_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Tempered Shuriken: Shuriken Attacks + Furious Attacks
  {
    id: 'path-tempered-need-crit',
    name: 'Path to Tempered Shuriken',
    description: 'You have Shuriken Attacks. Pick up Furious Attacks to unlock Tempered Shuriken (+40% crit chance with shuriken).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Tempered Shuriken')) return false;
      return build.powers.includes('Shuriken Attacks') && !build.powers.includes('Furious Attacks');
    }
  },
  {
    id: 'path-tempered-need-shuriken',
    name: 'Path to Tempered Shuriken',
    description: 'You have Furious Attacks. Pick up Shuriken Attacks to unlock Tempered Shuriken (+40% crit chance with shuriken).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Tempered Shuriken')) return false;
      return build.powers.includes('Furious Attacks') && !build.powers.includes('Shuriken Attacks');
    }
  },

  // Shatter: Frost + any Utrom damage power
  {
    id: 'path-shatter-need-utrom',
    name: 'Path to Shatter',
    description: 'You have Frost. Pick up any Utrom damage power to unlock Shatter (200 Water+Utrom damage when applying Stun).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Shatter')) return false;
      return build.powers.includes('Frost') && !UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-shatter-need-frost',
    name: 'Path to Shatter',
    description: 'You have Utrom powers. Pick up Frost to unlock Shatter (200 Water+Utrom damage when applying Stun).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Shatter')) return false;
      return !build.powers.includes('Frost') && UTROM_POWERS.some(p => build.powers.includes(p)) &&
        WATER_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Dark Flame: Darkness power + Flame power
  {
    id: 'path-darkflame-need-flame',
    name: 'Path to Dark Flame',
    description: 'You have Darkness powers. Pick up a Flame power to unlock Dark Flame (+40% Flame damage vs Darkened targets).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Dark Flame')) return false;
      return DARK_POWERS.some(p => build.powers.includes(p)) && !FLAME_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-darkflame-need-dark',
    name: 'Path to Dark Flame',
    description: 'You have Flame powers. Pick up a Darkness power to unlock Dark Flame (+40% Flame damage vs Darkened targets).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Dark Flame')) return false;
      return FLAME_POWERS.some(p => build.powers.includes(p)) && !DARK_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Finisher: Darkness power + any Ninja power
  {
    id: 'path-finisher-need-ninja',
    name: 'Path to Finisher',
    description: 'You have Darkness powers. Pick up any Ninja power to unlock Finisher (instantly defeat enemies below 15% health).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Finisher')) return false;
      return DARK_POWERS.some(p => build.powers.includes(p)) && !NINJA_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-finisher-need-dark',
    name: 'Path to Finisher',
    description: 'You have Ninja powers. Pick up a Darkness power to unlock Finisher (instantly defeat enemies below 15% health).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Finisher')) return false;
      return NINJA_POWERS.some(p => build.powers.includes(p)) && !DARK_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Slippery: Adrenaline + any Ooze applicator
  {
    id: 'path-slippery-need-ooze',
    name: 'Path to Slippery',
    description: 'You have Adrenaline. Pick up an Ooze applicator to unlock Slippery (+20% move speed, 100% faster charge at max Adrenaline).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Slippery')) return false;
      return build.powers.includes('Adrenaline') && !OOZE_APPLICATORS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-slippery-need-adrenaline',
    name: 'Path to Slippery',
    description: 'You have Ooze applicators. Pick up Adrenaline to unlock Slippery (+20% move speed, 100% faster charge at max Adrenaline).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Slippery')) return false;
      return OOZE_APPLICATORS.some(p => build.powers.includes(p)) && !build.powers.includes('Adrenaline');
    }
  },

  // Revolution: Quick Feet + any Utrom power
  {
    id: 'path-revolution-need-utrom',
    name: 'Path to Revolution',
    description: "You have Quick Feet. Pick up a Utrom power to unlock Revolution (Dash Attack deals 1% of enemies' Max Health).",
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Revolution')) return false;
      return build.powers.includes('Quick Feet') && !UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-revolution-need-quickfeet',
    name: 'Path to Revolution',
    description: "You have Utrom powers. Pick up Quick Feet to unlock Revolution (Dash Attack deals 1% of enemies' Max Health).",
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Revolution')) return false;
      return UTROM_POWERS.some(p => build.powers.includes(p)) && !build.powers.includes('Quick Feet');
    }
  },

  // Shocking: Charge power + Utrom power
  {
    id: 'path-shocking-need-utrom',
    name: 'Path to Shocking',
    description: 'You have a Charge power. Pick up a Utrom power to unlock Shocking (full charge deals 20 Utrom damage + stuns nearby).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Shocking')) return false;
      return CHARGE_POWERS.some(p => build.powers.includes(p)) && !UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },
  {
    id: 'path-shocking-need-charge',
    name: 'Path to Shocking',
    description: 'You have Utrom powers. Pick up a Charge power (Blade Matrix, Laser Strike, Overdrive, Photon Lance) to unlock Shocking.',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Shocking')) return false;
      return UTROM_POWERS.some(p => build.powers.includes(p)) && !CHARGE_POWERS.some(p => build.powers.includes(p)) &&
        ROBOTICS_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Bright Spring: Light Attacks + Water power
  {
    id: 'path-brightspring-need-water',
    name: 'Path to Bright Spring',
    description: 'You have Light Attacks. Pick up a Water power to unlock Bright Spring (attacks restore 2 health).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Bright Spring')) return false;
      return build.powers.includes('Light Attacks') && !WATER_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Light Hammer: Light Attacks + Utrom power
  {
    id: 'path-lighthammer-need-utrom',
    name: 'Path to Light Hammer',
    description: 'You have Light Attacks. Pick up a Utrom power to unlock Light Hammer (Utrom damage increased by 10% of Max Health).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Light Hammer')) return false;
      return build.powers.includes('Light Attacks') && !UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Secret of the Ooze: Ooze applicator + Utrom power
  {
    id: 'path-secretooze-need-utrom',
    name: 'Path to Secret of the Ooze',
    description: 'You have Ooze applicators. Pick up a Utrom power to unlock Secret of the Ooze (reduce damage received by 30%).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Secret of the Ooze')) return false;
      return OOZE_APPLICATORS.some(p => build.powers.includes(p)) && !UTROM_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Solution to Pollution: Potency + Water power
  {
    id: 'path-solution-need-water',
    name: 'Path to Solution to Pollution',
    description: 'You have Potency. Pick up a Water power to unlock Solution to Pollution (+3s Ooze duration, enemies gain stacks over time).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Solution to Pollution')) return false;
      return build.powers.includes('Potency') && !WATER_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Spontaneous Combustion: Ooze applicator + Flame power
  {
    id: 'path-combustion-need-flame',
    name: 'Path to Spontaneous Combustion',
    description: 'You have Ooze applicators. Pick up a Flame power to unlock Spontaneous Combustion (30% chance for 100 Flame damage on Ooze apply).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Spontaneous Combustion')) return false;
      return OOZE_APPLICATORS.some(p => build.powers.includes(p)) && !FLAME_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Cascade Drive: Charge power + Water power
  {
    id: 'path-cascade-need-water',
    name: 'Path to Cascade Drive',
    description: 'You have a Charge power. Pick up a Water power to unlock Cascade Drive (Charge activation grants 3% Multi-Hit Chance this room).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Cascade Drive')) return false;
      return CHARGE_POWERS.some(p => build.powers.includes(p)) && !WATER_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Critical Flow: Charge power + Flame power
  {
    id: 'path-critflow-need-flame',
    name: 'Path to Critical Flow',
    description: 'You have a Charge power. Pick up a Flame power to unlock Critical Flow (Charge activation grants 3% Crit Chance this room).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Critical Flow')) return false;
      return CHARGE_POWERS.some(p => build.powers.includes(p)) && !FLAME_POWERS.some(p => build.powers.includes(p));
    }
  },

  // Bright Spring (reverse): Water power → need Light Attacks
  {
    id: 'path-brightspring-need-light',
    name: 'Path to Bright Spring',
    description: 'You have Water powers. Pick up Light Attacks to unlock Bright Spring (attacks restore 2 health).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Bright Spring')) return false;
      return WATER_POWERS.some(p => build.powers.includes(p)) && !build.powers.includes('Light Attacks');
    }
  },

  // Light Hammer (reverse): Utrom power → need Light Attacks
  {
    id: 'path-lighthammer-need-light',
    name: 'Path to Light Hammer',
    description: 'You have Utrom powers. Pick up Light Attacks to unlock Light Hammer (Utrom damage increased by 10% of Max Health).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Light Hammer')) return false;
      return UTROM_POWERS.some(p => build.powers.includes(p)) && !build.powers.includes('Light Attacks');
    }
  },

  // Secret of the Ooze (reverse): Utrom power → need Ooze applicator
  {
    id: 'path-secretooze-need-ooze',
    name: 'Path to Secret of the Ooze',
    description: 'You have Utrom powers. Pick up an Ooze applicator to unlock Secret of the Ooze (reduce damage received by 30%).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Secret of the Ooze')) return false;
      return UTROM_POWERS.some(p => build.powers.includes(p)) && !OOZE_APPLICATORS.some(p => build.powers.includes(p));
    }
  },

  // Solution to Pollution (reverse): Water power → need Potency
  {
    id: 'path-solution-need-ooze',
    name: 'Path to Solution to Pollution',
    description: 'You have Water powers. Pick up Potency to unlock Solution to Pollution (+3s Ooze duration, enemies gain stacks over time).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Solution to Pollution')) return false;
      return WATER_POWERS.some(p => build.powers.includes(p)) && !build.powers.includes('Potency');
    }
  },

  // Spontaneous Combustion (reverse): Flame power → need Ooze applicator
  {
    id: 'path-combustion-need-ooze',
    name: 'Path to Spontaneous Combustion',
    description: 'You have Flame powers. Pick up an Ooze applicator to unlock Spontaneous Combustion (30% chance for 100 Flame damage on Ooze apply).',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Spontaneous Combustion')) return false;
      return FLAME_POWERS.some(p => build.powers.includes(p)) && !OOZE_APPLICATORS.some(p => build.powers.includes(p));
    }
  },

  // Cascade Drive (reverse): Water power → need Charge power
  {
    id: 'path-cascade-need-charge',
    name: 'Path to Cascade Drive',
    description: 'You have Water powers. Pick up a Charge power (Blade Matrix, Laser Strike, Overdrive, Photon Lance) to unlock Cascade Drive.',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Cascade Drive')) return false;
      return WATER_POWERS.some(p => build.powers.includes(p)) && !CHARGE_POWERS.some(p => build.powers.includes(p)) &&
        ROBOTICS_POWERS.some(p => build.powers.includes(p)) === false;
    }
  },

  // Critical Flow (reverse): Flame power → need Charge power
  {
    id: 'path-critflow-need-charge',
    name: 'Path to Critical Flow',
    description: 'You have Flame powers. Pick up a Charge power (Blade Matrix, Laser Strike, Overdrive, Photon Lance) to unlock Critical Flow.',
    category: 'legendary-path',
    check(build) {
      if (build.powers.includes('Critical Flow')) return false;
      return FLAME_POWERS.some(p => build.powers.includes(p)) && !CHARGE_POWERS.some(p => build.powers.includes(p)) &&
        ROBOTICS_POWERS.some(p => build.powers.includes(p)) === false;
    }
  },

  // =====================
  // ARTIFACT-COMBO — Artifact+Power Real Interactions
  // =====================
  {
    id: 'pizza-box-boost-stack',
    name: 'Pizza Box Boost Stack',
    description: 'Insulated Pizza Box extends Boost duration. Shelf Life/Special Spice compound it further. Near-permanent buff windows.',
    category: 'artifact-combo',
    check(build) {
      return build.artifact === 'Insulated Pizza Box' &&
        hasAny(build, 'Shelf Life', 'Special Spice');
    }
  },
  {
    id: 'revive-stack',
    name: 'Revive Stack',
    description: 'Clan Hamato Seal gives extra revive charges. Revival or Spare Bot adds even more. Pairs with Dark Star for damage conversion.',
    category: 'artifact-combo',
    check(build) {
      return build.artifact === 'Clan Hamato Seal' &&
        hasAny(build, 'Revival', 'Spare Bot');
    }
  },
  {
    id: 'dodge-defense',
    name: 'Dodge Defense',
    description: 'Heart of Tengu dodge bonus + Shinobi Supremacy/Ninjutsu Tactics dodge-on-kill. Evasion tanking build.',
    category: 'artifact-combo',
    check(build) {
      return build.artifact === 'Heart of Tengu' &&
        hasAny(build, 'Shinobi Supremacy', 'Ninjutsu Tactics');
    }
  }
];
