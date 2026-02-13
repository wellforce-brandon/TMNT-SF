// TMNT: Splintered Fate - Upgrades Data
// 52 upgrades split between Dragon (30) and Dreamer (22) currencies

export const upgrades = [
  // =====================
  // DRAGON UPGRADES (30) - Combat and utility
  // =====================
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
    name: 'health',
    displayName: 'Health',
    currency: 'dragon',
    maxLevel: 25,
    stat: 'maxHealth',
    perLevel: 10,
    maxEffect: 250,
    description: 'Increases maximum health.',
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
    description: 'Increases special attack damage.',
    category: 'combat'
  },
  {
    name: 'critChance',
    displayName: 'Critical Chance',
    currency: 'dragon',
    maxLevel: 10,
    stat: 'critChance',
    perLevel: 2,
    maxEffect: 20,
    description: 'Increases critical hit chance.',
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
    description: 'Increases critical hit damage multiplier.',
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
    description: 'Increases all elemental damage.',
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
    description: 'Increases special ability charge rate.',
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
    description: 'Increases dash attack damage.',
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
    description: 'Chance for attacks to strike an additional time.',
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
    description: 'Increases tool damage output.',
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
    description: 'Increases movement speed.',
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
    description: 'Increases tool charge rate.',
    category: 'combat'
  },
  {
    name: 'dashCharge',
    displayName: 'Dash Charge',
    currency: 'dragon',
    maxLevel: 3,
    stat: 'dashCharges',
    perLevel: 1,
    maxEffect: 3,
    description: 'Adds additional dash charges.',
    category: 'combat'
  },
  {
    name: 'splintersRevive',
    displayName: "Splinter's Revive",
    currency: 'dragon',
    maxLevel: 3,
    stat: 'revives',
    perLevel: 1,
    maxEffect: 3,
    description: 'Adds additional revive charges per run.',
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
    description: 'Increases healing effectiveness from all sources.',
    category: 'combat'
  },
  {
    name: 'sliceOfLife',
    displayName: 'Slice of Life',
    currency: 'dragon',
    maxLevel: 5,
    stat: null,
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases pizza (health pickup) spawn rate.',
    category: 'meta'
  },
  {
    name: 'pizzaEntree',
    displayName: 'Pizza Entree',
    currency: 'dragon',
    maxLevel: 5,
    stat: null,
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases healing from shop pizza purchases.',
    category: 'meta'
  },
  {
    name: 'confidence',
    displayName: 'Confidence',
    currency: 'dragon',
    maxLevel: 3,
    stat: null,
    perLevel: 5,
    maxEffect: 15,
    description: 'Increased damage at full health.',
    category: 'combat'
  },
  {
    name: 'enduringEffect',
    displayName: 'Enduring Effect',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'negativeEffectDuration',
    perLevel: 10,
    maxEffect: 50,
    description: 'Reduces duration of negative status effects on you.',
    category: 'combat'
  },
  {
    name: 'strongerStuff',
    displayName: 'Stronger Stuff',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'negativeEffectDamage',
    perLevel: 5,
    maxEffect: 25,
    description: 'Reduces damage from negative status effects.',
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
    description: 'Increases dodge chance.',
    category: 'combat'
  },
  {
    name: 'reliableAllies',
    displayName: 'Reliable Allies',
    currency: 'dragon',
    maxLevel: 5,
    stat: null,
    perLevel: 5,
    maxEffect: 25,
    description: 'Increases summon and ally damage.',
    category: 'combat'
  },
  {
    name: 'astralRejuvenation',
    displayName: 'Astral Rejuvenation',
    currency: 'dragon',
    maxLevel: 3,
    stat: null,
    perLevel: 10,
    maxEffect: 30,
    description: 'Increases healing from Astral effects.',
    category: 'combat'
  },
  // Additional dragon upgrades (7 more to reach 30)
  {
    name: 'elementalMastery',
    displayName: 'Elemental Mastery',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'elementalEffectDuration',
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases duration of elemental status effects applied to enemies.',
    category: 'combat'
  },
  {
    name: 'armorPiercing',
    displayName: 'Armor Piercing',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'armorPenetration',
    perLevel: 6,
    maxEffect: 30,
    description: 'Attacks ignore a percentage of enemy defense.',
    category: 'combat'
  },
  {
    name: 'quickRecovery',
    displayName: 'Quick Recovery',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'dashCooldown',
    perLevel: 6,
    maxEffect: 30,
    description: 'Reduces dash cooldown time.',
    category: 'combat'
  },
  {
    name: 'comboFinisher',
    displayName: 'Combo Finisher',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'finalStrikeDamage',
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases damage of combo finisher (final strike) attacks.',
    category: 'combat'
  },
  {
    name: 'bossBreaker',
    displayName: 'Boss Breaker',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'bossDamage',
    perLevel: 8,
    maxEffect: 40,
    description: 'Increases damage dealt to bosses.',
    category: 'combat'
  },
  {
    name: 'guardBreak',
    displayName: 'Guard Break',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'guardBreakDamage',
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases damage dealt to enemy barriers and shields.',
    category: 'combat'
  },
  {
    name: 'secondWind',
    displayName: 'Second Wind',
    currency: 'dragon',
    maxLevel: 5,
    stat: 'reviveHealth',
    perLevel: 6,
    maxEffect: 30,
    description: 'Increases health restored on revive.',
    category: 'combat'
  },

  // =====================
  // DREAMER UPGRADES (22) - Meta progression and economy
  // =====================
  {
    name: 'doubleTrouble',
    displayName: 'Double Trouble',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 5,
    maxEffect: 25,
    description: 'Chance to receive two powers from a single offering.',
    category: 'meta'
  },
  {
    name: 'doubleDouble',
    displayName: 'Double Double',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 5,
    maxEffect: 15,
    description: 'Increases Double Trouble trigger rate further.',
    category: 'meta'
  },
  {
    name: 'perchance',
    displayName: 'Perchance',
    currency: 'dreamer',
    maxLevel: 10,
    stat: null,
    perLevel: 5,
    maxEffect: 50,
    description: 'Increases Tier Power (TP) draw rate from offerings.',
    category: 'meta'
  },
  {
    name: 'polish',
    displayName: 'Polish',
    currency: 'dreamer',
    maxLevel: 10,
    stat: null,
    perLevel: 5,
    maxEffect: 50,
    description: 'Increases rate of Level 2 powers appearing in offerings.',
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
    description: 'Bonus currency gained when selling or recycling powers.',
    category: 'meta'
  },
  {
    name: 'doOver',
    displayName: 'Do Over',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 1,
    maxEffect: 3,
    description: 'Grants lucky dice that let you reroll power offerings.',
    category: 'meta'
  },
  {
    name: 'runningStart',
    displayName: 'Running Start',
    currency: 'dreamer',
    maxLevel: 10,
    stat: null,
    perLevel: 10,
    maxEffect: 100,
    description: 'Grants bonus starting Scrap at the beginning of each run.',
    category: 'meta'
  },
  {
    name: 'scavenger',
    displayName: 'Scavenger',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 10,
    maxEffect: 30,
    description: 'Increases Scrap gained from breakable crates.',
    category: 'meta'
  },
  {
    name: 'scrappyBosses',
    displayName: 'Scrappy Bosses',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 10,
    maxEffect: 50,
    description: 'Increases Scrap dropped by bosses.',
    category: 'meta'
  },
  {
    name: 'scrapKing',
    displayName: 'Scrap King',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 5,
    maxEffect: 25,
    description: 'Increases all Scrap gained from every source.',
    category: 'meta'
  },
  {
    name: 'mouseScrap',
    displayName: 'Mouse Scrap',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 5,
    maxEffect: 15,
    description: 'Small bonus to Scrap from minor enemies.',
    category: 'meta'
  },
  {
    name: 'fortuneFavors',
    displayName: 'Fortune Favors the Bold',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 5,
    maxEffect: 15,
    description: 'Bonus currency from elite and miniboss enemies.',
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
    description: 'Increases Dragon/Dreamer coin gain from all sources.',
    category: 'meta'
  },
  {
    name: 'luckySpoils',
    displayName: 'Lucky Spoils',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 5,
    maxEffect: 15,
    description: 'Increased chance for bonus reward chests after clearing rooms.',
    category: 'meta'
  },
  {
    name: 'arcadeFixer',
    displayName: 'Arcade Fixer',
    currency: 'dreamer',
    maxLevel: 2,
    stat: null,
    perLevel: 5,
    maxEffect: 10,
    description: 'Reduces shop prices slightly.',
    category: 'meta'
  },
  {
    name: 'bustedCoinSlot',
    displayName: 'Busted Coin Slot',
    currency: 'dreamer',
    maxLevel: 1,
    stat: null,
    perLevel: 5,
    maxEffect: 5,
    description: 'Chance for free items from shops.',
    category: 'meta'
  },
  {
    name: 'dojo',
    displayName: 'Dojo',
    currency: 'dreamer',
    maxLevel: 4,
    stat: null,
    perLevel: 5,
    maxEffect: 20,
    description: 'Increases mastery effectiveness for all characters.',
    category: 'meta'
  },
  // Additional dreamer upgrades (5 more to reach 22)
  {
    name: 'treasureHunter',
    displayName: 'Treasure Hunter',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 10,
    maxEffect: 30,
    description: 'Increases chance to find secret rooms with bonus rewards.',
    category: 'meta'
  },
  {
    name: 'powerMemory',
    displayName: 'Power Memory',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 5,
    maxEffect: 15,
    description: 'Chance to be offered powers from your previous run.',
    category: 'meta'
  },
  {
    name: 'artifactPolish',
    displayName: 'Artifact Polish',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 10,
    maxEffect: 30,
    description: 'Increases chance to find higher-level artifacts.',
    category: 'meta'
  },
  {
    name: 'extraCredit',
    displayName: 'Extra Credit',
    currency: 'dreamer',
    maxLevel: 5,
    stat: null,
    perLevel: 4,
    maxEffect: 20,
    description: 'Bonus experience gained toward mastery unlocks.',
    category: 'meta'
  },
  {
    name: 'wellStocked',
    displayName: 'Well Stocked',
    currency: 'dreamer',
    maxLevel: 3,
    stat: null,
    perLevel: 1,
    maxEffect: 3,
    description: 'Adds additional items to each shop inventory.',
    category: 'meta'
  }
];
