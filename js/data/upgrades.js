// TMNT: Splintered Fate - Upgrades Data
// Source of truth: https://tmntsplinteredfate.pages.dev/upgrades
// Dragon (23 upgrades) — Combat and utility
// Dreamer (17 upgrades) — Meta progression and economy

export const upgrades = [
  // =====================
  // DRAGON UPGRADES (23)
  // =====================
  {
    name: 'astralRejuvenation',
    displayName: 'Astral Rejuvenation',
    currency: 'dragon',
    maxLevel: 3,
    stat: null,
    perLevel: 10,
    maxEffect: 30,
    description: "Splinter's Revive restores additional Health.",
    category: 'combat'
  },
  {
    name: 'attackDamage',
    displayName: 'Attack Damage',
    currency: 'dragon',
    maxLevel: 16,
    stat: 'attackDamage',
    perLevel: 10,
    maxEffect: 160,
    description: 'Increases base attack damage.',
    category: 'combat'
  },
  {
    name: 'confidence',
    displayName: 'Confidence',
    currency: 'dragon',
    maxLevel: 3,
    stat: null,
    perLevel: 1,
    maxEffect: 3,
    description: 'Special damage bonus per flawless room.',
    category: 'combat',
    suffix: '%/room'
  },
  {
    name: 'critChance',
    displayName: 'Critical Chance',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'critChance',
    perLevel: 2,
    maxEffect: 20,
    description: 'Increases Attack Critical Hit chance.',
    category: 'combat'
  },
  {
    name: 'critDamage',
    displayName: 'Critical Damage',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'critDamage',
    perLevel: 5,
    maxEffect: 50,
    description: 'Increases Critical Damage.',
    category: 'combat'
  },
  {
    name: 'dashCharge',
    displayName: 'Dash Charge',
    currency: 'dragon',
    maxLevel: 3,
    stat: 'dashCharges',
    perLevel: null,
    maxEffect: 3,
    description: 'Adds additional Dash Charges.',
    category: 'combat',
    levelValues: [1, 2, 3]
  },
  {
    name: 'enduringEffect',
    displayName: 'Enduring Effect',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'negativeEffectDuration',
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases duration of Negative Effects.',
    category: 'combat'
  },
  {
    name: 'fastAbilities',
    displayName: 'Fast Abilities',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'specialChargeRate',
    perLevel: 5,
    maxEffect: 50,
    description: 'Special charges faster.',
    category: 'combat'
  },
  {
    name: 'fastAttacks',
    displayName: 'Fast Attacks',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'dashAttackDamage',
    perLevel: 10,
    maxEffect: 100,
    description: 'Increases Dash Attack damage.',
    category: 'combat'
  },
  {
    name: 'focusedForces',
    displayName: 'Focused Forces',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'elementalDamage',
    perLevel: 7.5,
    maxEffect: 75,
    description: 'Increases Elemental damage.',
    category: 'combat'
  },
  {
    name: 'hammertime',
    displayName: 'Hammertime',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'dodgeChance',
    perLevel: 4,
    maxEffect: 20,
    description: 'Increases Dodge chance.',
    category: 'combat'
  },
  {
    name: 'health',
    displayName: 'Health',
    currency: 'dragon',
    maxLevel: 25,
    stat: 'maxHealth',
    perLevel: 10,
    maxEffect: 250,
    description: 'Increases maximum Health.',
    category: 'combat'
  },
  {
    name: 'mechanicalGenius',
    displayName: 'Mechanical Genius',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'toolChargeRate',
    perLevel: 10,
    maxEffect: 50,
    description: 'Tool charges faster.',
    category: 'combat'
  },
  {
    name: 'multiHit',
    displayName: 'Multi-Hit',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'multiHitChance',
    perLevel: 2,
    maxEffect: 20,
    description: 'Increases Multi-Hit chance.',
    category: 'combat'
  },
  {
    name: 'pizzaEntree',
    displayName: 'Pizza Entree',
    currency: 'dragon',
    maxLevel: 5,
    stat: null,
    perLevel: 3,
    maxEffect: 15,
    description: 'Health restored upon Shop entry.',
    category: 'combat'
  },
  {
    name: 'reliableAllies',
    displayName: 'Reliable Allies',
    currency: 'dragon',
    maxLevel: 5,
    stat: null,
    perLevel: null,
    maxEffect: null,
    description: 'Support units gain Max Health and doubled spawn rate.',
    category: 'combat'
  },
  {
    name: 'savorTheFlavor',
    displayName: 'Savor the Flavor',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'healEffectiveness',
    perLevel: 20,
    maxEffect: 100,
    description: 'Health recovery more effective.',
    category: 'combat'
  },
  {
    name: 'sliceOfLife',
    displayName: 'Slice of Life',
    currency: 'dragon',
    maxLevel: 5,
    stat: null,
    perLevel: 4,
    maxEffect: 20,
    description: 'Chance Pizza Slice spawns from Foot Clan defeats.',
    category: 'combat'
  },
  {
    name: 'specialDamage',
    displayName: 'Special Damage',
    currency: 'dragon',
    maxLevel: 17,
    stat: 'specialAttack',
    perLevel: 10,
    maxEffect: 170,
    description: 'Increases Special damage.',
    category: 'combat'
  },
  {
    name: 'splintersRevive',
    displayName: "Splinter's Revive",
    currency: 'dragon',
    maxLevel: 3,
    stat: 'revives',
    perLevel: null,
    maxEffect: 3,
    description: 'Start with revives, each restores 25% Max Health.',
    category: 'combat',
    levelValues: [1, 2, 3]
  },
  {
    name: 'strongerStuff',
    displayName: 'Stronger Stuff',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'negativeEffectDamage',
    perLevel: 5,
    maxEffect: 25,
    description: 'Increases Negative Effect damage.',
    category: 'combat'
  },
  {
    name: 'swiftness',
    displayName: 'Swiftness',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'moveSpeed',
    perLevel: 5,
    maxEffect: 50,
    description: 'Increases Move Speed.',
    category: 'combat'
  },
  {
    name: 'toolDamage',
    displayName: 'Tool Damage',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'toolDamage',
    perLevel: 15,
    maxEffect: 150,
    description: 'Increases Tool Damage.',
    category: 'combat'
  },

  // =====================
  // DREAMER UPGRADES (17)
  // =====================
  {
    name: 'arcadeFixer',
    displayName: 'Arcade Fixer',
    currency: 'dreamer',
    maxLevel: 2,
    stat: null,
    perLevel: 25,
    maxEffect: 50,
    description: 'Chance Bonus Currency applies to all Room Rewards.',
    category: 'meta'
  },
  {
    name: 'bustedCoinSlot',
    displayName: 'Busted Coin Slot',
    currency: 'dreamer',
    maxLevel: 1,
    stat: null,
    perLevel: null,
    maxEffect: null,
    description: 'Dragon Coins always granted as Bonus Currency.',
    category: 'meta'
  },
  {
    name: 'dojo',
    displayName: 'Dojo',
    currency: 'dreamer',
    maxLevel: 4,
    stat: null,
    perLevel: 25,
    maxEffect: 100,
    description: 'Chance to upgrade Turtle Power to Mastery in Rooftops entry.',
    category: 'meta'
  },
  {
    name: 'doubleTrouble',
    displayName: 'Double Trouble',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 3,
    maxEffect: 15,
    description: 'Double Select chance during Turtle Power selection.',
    category: 'meta'
  },
  {
    name: 'doubleDouble',
    displayName: 'Double Double',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 10,
    maxEffect: 30,
    description: 'Chance Double Select offers level 2 Turtle Powers.',
    category: 'meta'
  },
  {
    name: 'doOver',
    displayName: 'Do Over',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: null,
    maxEffect: 3,
    description: 'Start with Lucky Dice for rerolls.',
    category: 'meta',
    levelValues: [1, 2, 3]
  },
  {
    name: 'fortuneFavors',
    displayName: 'Fortune Favors the Bold',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: null,
    maxEffect: null,
    description: 'Dragon and Dreamer Coins from Veteran/Champion defeats.',
    category: 'meta',
    levelValues: [1, 2, 3]
  },
  {
    name: 'luckySpoils',
    displayName: 'Lucky Spoils',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: null,
    maxEffect: null,
    description: 'Chance to gain Lucky Dice from Bosses.',
    category: 'meta',
    levelValues: [1, 2, 4]
  },
  {
    name: 'mouseScrap',
    displayName: 'Mouse Scrap',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 15,
    maxEffect: 45,
    description: 'Chance MOUSER drops triple Scrap.',
    category: 'meta'
  },
  {
    name: 'pantheonsBlessing',
    displayName: "Pantheon's Blessing",
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases Dragon and Dreamer Coins from Room Rewards.',
    category: 'meta'
  },
  {
    name: 'perchance',
    displayName: 'Perchance',
    currency: 'dreamer',
    maxLevel: 10,
    stat: null,
    perLevel: 2,
    maxEffect: 20,
    description: 'Chance to draw Turtle Powers in Room Rewards.',
    category: 'meta'
  },
  {
    name: 'polish',
    displayName: 'Polish',
    currency: 'dreamer',
    maxLevel: 10,
    stat: null,
    perLevel: 2,
    maxEffect: 20,
    description: 'Chance Turtle Powers offered at level 2.',
    category: 'meta'
  },
  {
    name: 'recycling',
    displayName: 'Recycling',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 5,
    maxEffect: 25,
    description: 'Chance for Bonus Currency Room Rewards.',
    category: 'meta'
  },
  {
    name: 'runningStart',
    displayName: 'Running Start',
    currency: 'dreamer',
    maxLevel: 10,
    stat: null,
    perLevel: 25,
    maxEffect: 250,
    description: 'Scrap upon run start.',
    category: 'meta'
  },
  {
    name: 'scavenger',
    displayName: 'Scavenger',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 100,
    maxEffect: 300,
    description: 'Increases Scrap from destroying crates.',
    category: 'meta'
  },
  {
    name: 'scrappyBosses',
    displayName: 'Scrappy Bosses',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 20,
    maxEffect: 100,
    description: 'Increases Scrap granted by Bosses.',
    category: 'meta'
  },
  {
    name: 'scrapKing',
    displayName: 'Scrap King',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases Scrap from Room Rewards.',
    category: 'meta'
  }
];
