// TMNT: Splintered Fate - Masteries Data
// Source of truth: https://tmntsplinteredfate.pages.dev/mastery
// Character-specific masteries (14-15 per character)
// Masteries have no official names — the effect IS the identifier

export const masteries = [
  // =====================
  // MICHELANGELO (14)
  // =====================
  {
    character: 'michelangelo',
    name: '-35% Dash Cooldown',
    effect: '-35% Dash Cooldown',
    tags: ['dash']
  },
  {
    character: 'michelangelo',
    name: '+5% damage dealt for each Astral power acquired',
    effect: '+5% damage dealt for each Astral power acquired',
    tags: ['astral', 'attack']
  },
  {
    character: 'michelangelo',
    name: '+10% Elemental damage',
    effect: '+10% Elemental damage',
    tags: ['elemental', 'attack'],
    statBonuses: [{ stat: 'elementalDamage', value: 10 }]
  },
  {
    character: 'michelangelo',
    name: '+10% Multi-Hit chance',
    effect: '+10% Multi-Hit chance',
    tags: ['multi-hit', 'attack'],
    statBonuses: [{ stat: 'multiHitChance', value: 10 }]
  },
  {
    character: 'michelangelo',
    name: '+15% chance to trigger Elemental Effects',
    effect: '+15% chance to trigger Elemental Effects',
    tags: ['elemental', 'attack']
  },
  {
    character: 'michelangelo',
    name: '+20% Damage dealt and Move Speed for 3s after defeating an enemy',
    effect: '+20% Damage dealt and Move Speed for 3s after defeating an enemy',
    tags: ['attack', 'speed'],
    statBonuses: [
      { stat: 'attackDamage', value: 20, conditional: true, condition: '3s on kill' },
      { stat: 'moveSpeed', value: 20, conditional: true, condition: '3s on kill' }
    ]
  },
  {
    character: 'michelangelo',
    name: '+20% damage to Bosses',
    effect: '+20% damage to Bosses',
    tags: ['boss', 'attack']
  },
  {
    character: 'michelangelo',
    name: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    effect: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    tags: ['dash', 'attack'],
    statBonuses: [{ stat: 'dashAttackDamage', value: 30 }]
  },
  {
    character: 'michelangelo',
    name: '+30% Special area size. Special charges 20% faster',
    effect: '+30% Special area size. Special charges 20% faster',
    tags: ['special', 'attack'],
    statBonuses: [{ stat: 'specialChargeRate', value: 20 }]
  },
  {
    character: 'michelangelo',
    name: '+30% Water damage',
    effect: '+30% Water damage',
    tags: ['water', 'attack']
  },
  {
    character: 'michelangelo',
    name: '+40% Multi-Hit damage',
    effect: '+40% Multi-Hit damage',
    tags: ['multi-hit', 'attack'],
    statBonuses: [{ stat: 'multiHitDamage', value: 40 }]
  },
  {
    character: 'michelangelo',
    name: '+50% damage to enemies with a Barrier',
    effect: '+50% damage to enemies with a Barrier',
    tags: ['barrier', 'attack']
  },
  {
    character: 'michelangelo',
    name: '+15% Attack area size. +15% Attack damage',
    effect: '+15% Attack area size. +15% Attack damage',
    tags: ['attack', 'general'],
    statBonuses: [{ stat: 'attackDamage', value: 15 }]
  },
  {
    character: 'michelangelo',
    name: 'Reduces damage received from projectiles and hazards by 75%',
    effect: 'Reduces damage received from projectiles and hazards by 75%',
    tags: ['defense', 'general']
  },

  // =====================
  // LEONARDO (14)
  // =====================
  {
    character: 'leonardo',
    name: '+5% Shuriken damage for each Ninja power acquired',
    effect: '+5% Shuriken damage for each Ninja power acquired',
    tags: ['shuriken', 'ninja', 'attack']
  },
  {
    character: 'leonardo',
    name: '+10% Utrom damage for each Utrom power acquired',
    effect: '+10% Utrom damage for each Utrom power acquired',
    tags: ['utrom', 'attack']
  },
  {
    character: 'leonardo',
    name: '+20% damage to Bosses',
    effect: '+20% damage to Bosses',
    tags: ['boss', 'attack']
  },
  {
    character: 'leonardo',
    name: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    effect: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    tags: ['dash', 'attack'],
    statBonuses: [{ stat: 'dashAttackDamage', value: 30 }]
  },
  {
    character: 'leonardo',
    name: '+50% damage to enemies with a Barrier',
    effect: '+50% damage to enemies with a Barrier',
    tags: ['barrier', 'attack']
  },
  {
    character: 'leonardo',
    name: '+100% Master Strike damage',
    effect: '+100% Master Strike damage',
    tags: ['attack', 'general']
  },
  {
    character: 'leonardo',
    name: 'Activating your Special grants Light Shell for 2s',
    effect: 'Activating your Special grants Light Shell for 2s',
    tags: ['special', 'light', 'defense']
  },
  {
    character: 'leonardo',
    name: 'Dash Attack applies Master Strike',
    effect: 'Dash Attack applies Master Strike',
    tags: ['dash', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Defeating an enemy with your Special recharges your Tool',
    effect: 'Defeating an enemy with your Special recharges your Tool',
    tags: ['special', 'tool']
  },
  {
    character: 'leonardo',
    name: 'Gain Light Shell for 1s upon a Master Strike',
    effect: 'Gain Light Shell for 1s upon a Master Strike',
    tags: ['light', 'defense', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Master Strike applies Guard Break for 3.5s',
    effect: 'Master Strike applies Guard Break for 3.5s',
    tags: ['attack', 'barrier']
  },
  {
    character: 'leonardo',
    name: 'Special charges 30% faster',
    effect: 'Special charges 30% faster',
    tags: ['special'],
    statBonuses: [{ stat: 'specialChargeRate', value: 30 }]
  },
  {
    character: 'leonardo',
    name: 'Special deals 30 Utrom damage',
    effect: 'Special deals 30 Utrom damage',
    tags: ['special', 'utrom', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Special gains all Dash and Dash Attack bonuses',
    effect: 'Special gains all Dash and Dash Attack bonuses',
    tags: ['special', 'dash']
  },

  // =====================
  // RAPHAEL (14)
  // =====================
  {
    character: 'raphael',
    name: '+3% Critical Hit damage for the rest of the encounter upon defeating an enemy',
    effect: '+3% Critical Hit damage for the rest of the encounter upon defeating an enemy',
    tags: ['crit', 'attack'],
    statBonuses: [{ stat: 'critDamage', value: 3, conditional: true, condition: 'per kill' }]
  },
  {
    character: 'raphael',
    name: '+20% Attack Critical Hit chance',
    effect: '+20% Attack Critical Hit chance',
    tags: ['crit', 'attack'],
    statBonuses: [{ stat: 'critChance', value: 20 }]
  },
  {
    character: 'raphael',
    name: '+20% damage to Bosses',
    effect: '+20% damage to Bosses',
    tags: ['boss', 'attack']
  },
  {
    character: 'raphael',
    name: '+20% Special Critical Hit chance',
    effect: '+20% Special Critical Hit chance',
    tags: ['crit', 'special'],
    statBonuses: [{ stat: 'specialCritChance', value: 20 }]
  },
  {
    character: 'raphael',
    name: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    effect: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    tags: ['dash', 'attack'],
    statBonuses: [{ stat: 'dashAttackDamage', value: 30 }]
  },
  {
    character: 'raphael',
    name: '+30% Flame damage',
    effect: '+30% Flame damage',
    tags: ['flame', 'attack']
  },
  {
    character: 'raphael',
    name: '+30% Special damage',
    effect: '+30% Special damage',
    tags: ['special', 'attack'],
    statBonuses: [{ stat: 'specialAttack', value: 30 }]
  },
  {
    character: 'raphael',
    name: '+30% Water damage',
    effect: '+30% Water damage',
    tags: ['water', 'attack']
  },
  {
    character: 'raphael',
    name: '+50% Critical Hit damage',
    effect: '+50% Critical Hit damage',
    tags: ['crit', 'attack'],
    statBonuses: [{ stat: 'critDamage', value: 50 }]
  },
  {
    character: 'raphael',
    name: '+50% damage to enemies with a Barrier',
    effect: '+50% damage to enemies with a Barrier',
    tags: ['barrier', 'attack']
  },
  {
    character: 'raphael',
    name: '+100% Special damage dealt to enemies below 35% health',
    effect: '+100% Special damage dealt to enemies below 35% health',
    tags: ['special', 'attack']
  },
  {
    character: 'raphael',
    name: 'Critical Hits have a 20% chance to deal 10 damage of elemental power',
    effect: 'Critical Hits have a 20% chance to deal 10 damage of elemental power',
    tags: ['crit', 'elemental', 'attack']
  },
  {
    character: 'raphael',
    name: 'Critical Hits have a 40% chance to Multi-Crit, dealing 300% increased damage',
    effect: 'Critical Hits have a 40% chance to Multi-Crit, dealing 300% increased damage',
    tags: ['crit', 'attack']
  },
  {
    character: 'raphael',
    name: 'Instantly defeat enemies below 10% health',
    effect: 'Instantly defeat enemies below 10% health',
    tags: ['attack', 'general']
  },

  // =====================
  // DONATELLO (14)
  // =====================
  {
    character: 'donatello',
    name: '+1 Tool charge(s)',
    effect: '+1 Tool charge(s)',
    tags: ['tool', 'general']
  },
  {
    character: 'donatello',
    name: '+15% all damage dealt',
    effect: '+15% all damage dealt',
    tags: ['attack', 'general'],
    statBonuses: [{ stat: 'attackDamage', value: 15 }]
  },
  {
    character: 'donatello',
    name: '+20% damage to Bosses',
    effect: '+20% damage to Bosses',
    tags: ['boss', 'attack']
  },
  {
    character: 'donatello',
    name: '+30% damage to Bosses, Mousers, and Super Soldiers',
    effect: '+30% damage to Bosses, Mousers, and Super Soldiers',
    tags: ['boss', 'attack']
  },
  {
    character: 'donatello',
    name: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    effect: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    tags: ['dash', 'attack'],
    statBonuses: [{ stat: 'dashAttackDamage', value: 30 }]
  },
  {
    character: 'donatello',
    name: '+30% Ooze damage',
    effect: '+30% Ooze damage',
    tags: ['ooze', 'attack']
  },
  {
    character: 'donatello',
    name: '+30% Utrom damage',
    effect: '+30% Utrom damage',
    tags: ['utrom', 'attack']
  },
  {
    character: 'donatello',
    name: '+50% damage to enemies with a Barrier',
    effect: '+50% damage to enemies with a Barrier',
    tags: ['barrier', 'attack']
  },
  {
    character: 'donatello',
    name: '+75% Special damage',
    effect: '+75% Special damage',
    tags: ['special', 'attack'],
    statBonuses: [{ stat: 'specialAttack', value: 75 }]
  },
  {
    character: 'donatello',
    name: 'Activating your Special or Tool makes your next attack a Final Strike',
    effect: 'Activating your Special or Tool makes your next attack a Final Strike',
    tags: ['special', 'tool', 'attack']
  },
  {
    character: 'donatello',
    name: 'Every other Attack deals 10 Utrom damage',
    effect: 'Every other Attack deals 10 Utrom damage',
    tags: ['utrom', 'attack']
  },
  {
    character: 'donatello',
    name: 'Special and Tool deals 20 Utrom damage',
    effect: 'Special and Tool deals 20 Utrom damage',
    tags: ['special', 'tool', 'utrom']
  },
  {
    character: 'donatello',
    name: 'Special gains all Dash and Dash Attack bonuses',
    effect: 'Special gains all Dash and Dash Attack bonuses',
    tags: ['special', 'dash']
  },
  {
    character: 'donatello',
    name: 'Tool charges 30% faster',
    effect: 'Tool charges 30% faster',
    tags: ['tool'],
    statBonuses: [{ stat: 'toolChargeRate', value: 30 }]
  },

  // =====================
  // CASEY JONES (14)
  // =====================
  {
    character: 'casey',
    name: '-35% Dash Cooldown',
    effect: '-35% Dash Cooldown',
    tags: ['dash']
  },
  {
    character: 'casey',
    name: '+5% damage dealt for each Astral power acquired',
    effect: '+5% damage dealt for each Astral power acquired',
    tags: ['astral', 'attack']
  },
  {
    character: 'casey',
    name: '+15% Attack area size. +15% Attack damage',
    effect: '+15% Attack area size. +15% Attack damage',
    tags: ['attack', 'general'],
    statBonuses: [{ stat: 'attackDamage', value: 15 }]
  },
  {
    character: 'casey',
    name: '+20% damage to Bosses',
    effect: '+20% damage to Bosses',
    tags: ['boss', 'attack']
  },
  {
    character: 'casey',
    name: '+20% Special Critical Hit chance',
    effect: '+20% Special Critical Hit chance',
    tags: ['crit', 'special'],
    statBonuses: [{ stat: 'specialCritChance', value: 20 }]
  },
  {
    character: 'casey',
    name: '+30% damage to Bosses, Mousers, and Super Soldiers',
    effect: '+30% damage to Bosses, Mousers, and Super Soldiers',
    tags: ['boss', 'attack']
  },
  {
    character: 'casey',
    name: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    effect: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    tags: ['dash', 'attack'],
    statBonuses: [{ stat: 'dashAttackDamage', value: 30 }]
  },
  {
    character: 'casey',
    name: '+30% Flame damage',
    effect: '+30% Flame damage',
    tags: ['flame', 'attack']
  },
  {
    character: 'casey',
    name: '+50% damage to enemies with a Barrier',
    effect: '+50% damage to enemies with a Barrier',
    tags: ['barrier', 'attack']
  },
  {
    character: 'casey',
    name: 'Dash Attacks deal 15 more damage and apply Guard Break for 3 seconds',
    effect: 'Dash Attacks deal 15 more damage and apply Guard Break for 3 seconds',
    tags: ['dash', 'attack', 'barrier']
  },
  {
    character: 'casey',
    name: 'Reduces damage received from projectiles and hazards by 75%',
    effect: 'Reduces damage received from projectiles and hazards by 75%',
    tags: ['defense', 'general']
  },
  {
    character: 'casey',
    name: 'Special charges 30% faster',
    effect: 'Special charges 30% faster',
    tags: ['special'],
    statBonuses: [{ stat: 'specialChargeRate', value: 30 }]
  },
  {
    character: 'casey',
    name: 'Special deals an extra 30 Utrom damage',
    effect: 'Special deals an extra 30 Utrom damage',
    tags: ['special', 'utrom', 'attack']
  },
  {
    character: 'casey',
    name: 'Special projectiles bounce between 2 more targets',
    effect: 'Special projectiles bounce between 2 more targets',
    tags: ['special', 'attack']
  },

  // =====================
  // METALHEAD (15)
  // =====================
  {
    character: 'metalhead',
    name: '-35% Dash cooldown',
    effect: '-35% Dash cooldown',
    tags: ['dash']
  },
  {
    character: 'metalhead',
    name: '+10% Elemental damage for each Robotics power acquired',
    effect: '+10% Elemental damage for each Robotics power acquired',
    tags: ['elemental', 'robotics', 'attack']
  },
  {
    character: 'metalhead',
    name: '+10% Utrom damage for each Utrom power acquired',
    effect: '+10% Utrom damage for each Utrom power acquired',
    tags: ['utrom', 'attack']
  },
  {
    character: 'metalhead',
    name: '+20% Attack Critical Hit chance',
    effect: '+20% Attack Critical Hit chance',
    tags: ['crit', 'attack'],
    statBonuses: [{ stat: 'critChance', value: 20 }]
  },
  {
    character: 'metalhead',
    name: '+20% damage to Bosses',
    effect: '+20% damage to Bosses',
    tags: ['boss', 'attack']
  },
  {
    character: 'metalhead',
    name: '+30% damage to Bosses, MOUSERs, and Super Soldiers',
    effect: '+30% damage to Bosses, MOUSERs, and Super Soldiers',
    tags: ['boss', 'attack']
  },
  {
    character: 'metalhead',
    name: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    effect: '+30% Dash Attack damage. Gain 1 charge of Dash upon defeating an enemy',
    tags: ['dash', 'attack'],
    statBonuses: [{ stat: 'dashAttackDamage', value: 30 }]
  },
  {
    character: 'metalhead',
    name: '+50% damage to enemies with a Barrier',
    effect: '+50% damage to enemies with a Barrier',
    tags: ['barrier', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Dash Attack has the Final Strike tag',
    effect: 'Dash Attack has the Final Strike tag',
    tags: ['dash', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Final Strike projectile moves slower, but has a 50% bigger explosion area',
    effect: 'Final Strike projectile moves slower, but has a 50% bigger explosion area',
    tags: ['attack', 'general']
  },
  {
    character: 'metalhead',
    name: 'Gain invulnerability for 0.5s after activating Special',
    effect: 'Gain invulnerability for 0.5s after activating Special',
    tags: ['special', 'defense']
  },
  {
    character: 'metalhead',
    name: 'Increases base Special Missiles damage by 100%',
    effect: 'Increases base Special Missiles damage by 100%',
    tags: ['special', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Increase movement speed by 50% during Special',
    effect: 'Increase movement speed by 50% during Special',
    tags: ['special', 'speed'],
    statBonuses: [{ stat: 'moveSpeed', value: 50, conditional: true, condition: 'during Special' }]
  },
  {
    character: 'metalhead',
    name: 'Reduces damage received from projectiles and hazards by 75%',
    effect: 'Reduces damage received from projectiles and hazards by 75%',
    tags: ['defense', 'general']
  }
];
