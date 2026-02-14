// TMNT: Splintered Fate - Artifacts Data
// 24 artifacts from tmntsplinteredfate.pages.dev
// Effect text uses "X / Y / Z" inline patterns for level-scaled values

export const artifacts = [
  // =====================
  // ELEMENT-BOOSTING (7) — 6 levels each
  // =====================
  {
    name: 'Manhole Cover',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Water power offering rate.',
    maxLevel: 6,
    tags: ['water'],
    category: 'element'
  },
  {
    name: 'Foot Clan Medallion',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Flame power offering rate.',
    maxLevel: 6,
    tags: ['flame'],
    category: 'element'
  },
  {
    name: 'Broken Ooze Canister',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Ooze power offering rate.',
    maxLevel: 6,
    tags: ['ooze'],
    category: 'element'
  },
  {
    name: 'Sword of Tengu',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Utrom power offering rate.',
    maxLevel: 6,
    tags: ['utrom'],
    category: 'element'
  },
  {
    name: 'Tessen',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Ninja power offering rate.',
    maxLevel: 6,
    tags: ['ninja'],
    category: 'element'
  },
  {
    name: 'Mystical Seal of Protection',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Astral power offering rate.',
    maxLevel: 6,
    tags: ['astral'],
    category: 'element'
  },
  {
    name: 'Positronic Motherboard',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% Robotics power offering rate.',
    maxLevel: 6,
    tags: ['robotics'],
    category: 'element'
  },

  // =====================
  // UTILITY (6) — 6 levels each
  // =====================
  {
    name: 'Stockgen ID Card',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% bonus Scrap chance from MOUSERs and Super Foot Soldiers.',
    maxLevel: 6,
    tags: ['economy', 'scrap'],
    category: 'utility'
  },
  {
    name: 'Turnstone',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% bonus coin chance from veteran and champion enemies.',
    maxLevel: 6,
    tags: ['economy', 'coins'],
    category: 'utility'
  },
  {
    name: 'Battle Shell Fuzzy Dice',
    effect: '+10% / +12.5% / +15% / +17.5% / +20% / +22.5% double select chance during Turtle Upgrade selections.',
    maxLevel: 6,
    tags: ['luck', 'upgrades'],
    category: 'utility'
  },
  {
    name: 'Insulated Pizza Box',
    effect: 'Boosts last for an additional 2 / 3 / 4 / 5 / 6 / 7 rooms.',
    maxLevel: 6,
    tags: ['boost', 'duration'],
    category: 'utility'
  },
  {
    name: 'Heart of Tengu',
    effect: '+5% / +7.5% / +10% / +12.5% / +15% / +17.5% dodge chance. Increased dash invulnerability.',
    maxLevel: 6,
    tags: ['dodge', 'defense'],
    category: 'utility'
  },
  {
    name: 'Astral Charm',
    effect: "+3s / +3.5s / +4s / +4.5s / +5s / +5.5s invulnerability on Splinter's Revive.",
    maxLevel: 6,
    tags: ['revive', 'defense'],
    category: 'utility'
  },

  // =====================
  // ADVANCED (11) — 3 levels each
  // =====================
  {
    name: 'War Staff',
    effect: '+100% damage taken. +60% / +80% / +100% currencies from Bosses.',
    maxLevel: 3,
    tags: ['risk', 'currency'],
    category: 'advanced'
  },
  {
    name: 'Untuned Guitar',
    effect: '+2% / +3% / +4% elemental damage per room cleared. All players benefit.',
    maxLevel: 3,
    tags: ['buff', 'damage'],
    category: 'advanced'
  },
  {
    name: 'Vintage Blowtorch',
    effect: 'Every 7 / 6 / 5 seconds, next Final Strike stuns non-boss enemies.',
    maxLevel: 3,
    tags: ['stun', 'control'],
    category: 'advanced'
  },
  {
    name: 'Busted Snare',
    effect: 'Heal 2 / 3 / 4 Health per room cleared. All players benefit.',
    maxLevel: 3,
    tags: ['healing'],
    category: 'advanced'
  },
  {
    name: 'Splintered Drumsticks',
    effect: '+10 / +15 / +20 Scrap per room cleared. All players benefit.',
    maxLevel: 3,
    tags: ['economy', 'scrap'],
    category: 'advanced'
  },
  {
    name: "Casey's Portrait",
    effect: '+5 / +6 / +7 Max Health per boss defeated. All players benefit.',
    maxLevel: 3,
    tags: ['health', 'boss'],
    category: 'advanced'
  },
  {
    name: 'Mysterious Gofu',
    effect: 'Gain a random level 1 / 2 / 3 Tool at the start of each Chapter.',
    maxLevel: 3,
    tags: ['tool', 'random'],
    category: 'advanced'
  },
  {
    name: 'Clan Hamato Seal',
    effect: "+1 Splinter's Revive. +10% / +15% / +20% additional Health on revive.",
    maxLevel: 3,
    tags: ['revive', 'survivability'],
    category: 'advanced'
  },
  {
    name: 'Cracked Stasis Beacon',
    effect: 'Much slower. +500 / +650 / +800 Scrap on Boss defeat.',
    maxLevel: 3,
    tags: ['risk', 'scrap'],
    category: 'advanced'
  },
  {
    name: "Kitsune's Cup",
    effect: "Can't heal. +50% / +65% / +80% Dreamer Coins.",
    maxLevel: 3,
    tags: ['risk', 'coins'],
    category: 'advanced'
  },
  {
    name: 'Giant Tusk Fragment',
    effect: "Can't heal. +50% / +65% / +80% Dragon Coins.",
    maxLevel: 3,
    tags: ['risk', 'coins'],
    category: 'advanced'
  }
];
