// TMNT: Splintered Fate - Artifacts Data
// 24 artifacts from tmntsplinteredfate.pages.dev
// Element-boosting & utility: 6 levels; Advanced: 3 levels

export const artifacts = [
  // =====================
  // ELEMENT-BOOSTING (7) — 6 levels each
  // =====================
  {
    name: 'Manhole Cover',
    effect: 'Double Select chance when selecting Water powers. Guarantees your next Power Selection is of the Water category.',
    levels: [
      { level: 1, effect: '+10% Water power offering rate' },
      { level: 2, effect: '+12.5% Water power offering rate' },
      { level: 3, effect: '+15% Water power offering rate' },
      { level: 4, effect: '+17.5% Water power offering rate' },
      { level: 5, effect: '+20% Water power offering rate' },
      { level: 6, effect: '+22.5% Water power offering rate' }
    ],
    tags: ['water'],
    category: 'element'
  },
  {
    name: 'Foot Clan Medallion',
    effect: 'Double Select chance when selecting Flame powers. Guarantees your next Power Selection is of the Flame category.',
    levels: [
      { level: 1, effect: '+10% Flame power offering rate' },
      { level: 2, effect: '+12.5% Flame power offering rate' },
      { level: 3, effect: '+15% Flame power offering rate' },
      { level: 4, effect: '+17.5% Flame power offering rate' },
      { level: 5, effect: '+20% Flame power offering rate' },
      { level: 6, effect: '+22.5% Flame power offering rate' }
    ],
    tags: ['flame'],
    category: 'element'
  },
  {
    name: 'Broken Ooze Canister',
    effect: 'Double Select chance when selecting Ooze powers. Guarantees your next Power Selection is of the Ooze category.',
    levels: [
      { level: 1, effect: '+10% Ooze power offering rate' },
      { level: 2, effect: '+12.5% Ooze power offering rate' },
      { level: 3, effect: '+15% Ooze power offering rate' },
      { level: 4, effect: '+17.5% Ooze power offering rate' },
      { level: 5, effect: '+20% Ooze power offering rate' },
      { level: 6, effect: '+22.5% Ooze power offering rate' }
    ],
    tags: ['ooze'],
    category: 'element'
  },
  {
    name: 'Sword of Tengu',
    effect: 'Double Select chance when selecting Utrom powers. Guarantees your next Power Selection is of the Utrom category.',
    levels: [
      { level: 1, effect: '+10% Utrom power offering rate' },
      { level: 2, effect: '+12.5% Utrom power offering rate' },
      { level: 3, effect: '+15% Utrom power offering rate' },
      { level: 4, effect: '+17.5% Utrom power offering rate' },
      { level: 5, effect: '+20% Utrom power offering rate' },
      { level: 6, effect: '+22.5% Utrom power offering rate' }
    ],
    tags: ['utrom'],
    category: 'element'
  },
  {
    name: 'Tessen',
    effect: 'Double Select chance when selecting Ninja powers. Guarantees your next Power Selection is of the Ninja category.',
    levels: [
      { level: 1, effect: '+10% Ninja power offering rate' },
      { level: 2, effect: '+12.5% Ninja power offering rate' },
      { level: 3, effect: '+15% Ninja power offering rate' },
      { level: 4, effect: '+17.5% Ninja power offering rate' },
      { level: 5, effect: '+20% Ninja power offering rate' },
      { level: 6, effect: '+22.5% Ninja power offering rate' }
    ],
    tags: ['ninja'],
    category: 'element'
  },
  {
    name: 'Mystical Seal of Protection',
    effect: 'Double Select chance when selecting Astral powers. Guarantees your next Power Selection is of the Astral category.',
    levels: [
      { level: 1, effect: '+10% Astral power offering rate' },
      { level: 2, effect: '+12.5% Astral power offering rate' },
      { level: 3, effect: '+15% Astral power offering rate' },
      { level: 4, effect: '+17.5% Astral power offering rate' },
      { level: 5, effect: '+20% Astral power offering rate' },
      { level: 6, effect: '+22.5% Astral power offering rate' }
    ],
    tags: ['astral'],
    category: 'element'
  },
  {
    name: 'Positronic Motherboard',
    effect: 'Double Select chance when selecting Robotics powers. Guarantees your next Power Selection is of the Robotics category.',
    levels: [
      { level: 1, effect: '+10% Robotics power offering rate' },
      { level: 2, effect: '+12.5% Robotics power offering rate' },
      { level: 3, effect: '+15% Robotics power offering rate' },
      { level: 4, effect: '+17.5% Robotics power offering rate' },
      { level: 5, effect: '+20% Robotics power offering rate' },
      { level: 6, effect: '+22.5% Robotics power offering rate' }
    ],
    tags: ['robotics'],
    category: 'element'
  },

  // =====================
  // UTILITY (6) — 6 levels each
  // =====================
  {
    name: 'Stockgen ID Card',
    effect: 'Chance of gaining Bonus Scrap when defeating MOUSERs or Super Foot Soldiers.',
    levels: [
      { level: 1, effect: '+10% bonus Scrap chance' },
      { level: 2, effect: '+12.5% bonus Scrap chance' },
      { level: 3, effect: '+15% bonus Scrap chance' },
      { level: 4, effect: '+17.5% bonus Scrap chance' },
      { level: 5, effect: '+20% bonus Scrap chance' },
      { level: 6, effect: '+22.5% bonus Scrap chance' }
    ],
    tags: ['economy', 'scrap'],
    category: 'utility'
  },
  {
    name: 'Turnstone',
    effect: 'Chance to gain bonus Dragon Coins or Dreamer Coins upon defeating a veteran or champion enemy.',
    levels: [
      { level: 1, effect: '+10% bonus coin chance' },
      { level: 2, effect: '+12.5% bonus coin chance' },
      { level: 3, effect: '+15% bonus coin chance' },
      { level: 4, effect: '+17.5% bonus coin chance' },
      { level: 5, effect: '+20% bonus coin chance' },
      { level: 6, effect: '+22.5% bonus coin chance' }
    ],
    tags: ['economy', 'coins'],
    category: 'utility'
  },
  {
    name: 'Battle Shell Fuzzy Dice',
    effect: 'Double Select chance during any Turtle Upgrade selections.',
    levels: [
      { level: 1, effect: '+10% double select chance' },
      { level: 2, effect: '+12.5% double select chance' },
      { level: 3, effect: '+15% double select chance' },
      { level: 4, effect: '+17.5% double select chance' },
      { level: 5, effect: '+20% double select chance' },
      { level: 6, effect: '+22.5% double select chance' }
    ],
    tags: ['luck', 'upgrades'],
    category: 'utility'
  },
  {
    name: 'Insulated Pizza Box',
    effect: 'Boosts last for additional rooms. Granted by an ally in Docks.',
    levels: [
      { level: 1, effect: 'Boosts last for an additional 2 rooms' },
      { level: 2, effect: 'Boosts last for an additional 3 rooms' },
      { level: 3, effect: 'Boosts last for an additional 4 rooms' },
      { level: 4, effect: 'Boosts last for an additional 5 rooms' },
      { level: 5, effect: 'Boosts last for an additional 6 rooms' },
      { level: 6, effect: 'Boosts last for an additional 7 rooms' }
    ],
    tags: ['boost', 'duration'],
    category: 'utility'
  },
  {
    name: 'Heart of Tengu',
    effect: 'Dodge chance. Increase duration of Invulnerability upon a Dash.',
    levels: [
      { level: 1, effect: '+5% dodge chance' },
      { level: 2, effect: '+7.5% dodge chance' },
      { level: 3, effect: '+10% dodge chance' },
      { level: 4, effect: '+12.5% dodge chance' },
      { level: 5, effect: '+15% dodge chance' },
      { level: 6, effect: '+17.5% dodge chance' }
    ],
    tags: ['dodge', 'defense'],
    category: 'utility'
  },
  {
    name: 'Astral Charm',
    effect: "Invulnerability duration upon consuming a Splinter's Revive.",
    levels: [
      { level: 1, effect: '+3s invulnerability on revive' },
      { level: 2, effect: '+3.5s invulnerability on revive' },
      { level: 3, effect: '+4s invulnerability on revive' },
      { level: 4, effect: '+4.5s invulnerability on revive' },
      { level: 5, effect: '+5s invulnerability on revive' },
      { level: 6, effect: '+5.5s invulnerability on revive' }
    ],
    tags: ['revive', 'defense'],
    category: 'utility'
  },

  // =====================
  // ADVANCED (11) — 3 levels each
  // =====================
  {
    name: 'War Staff',
    effect: '+100% damage taken from all sources. Increased currencies granted by Bosses.',
    levels: [
      { level: 1, effect: '+100% damage taken. +60% currencies from Bosses' },
      { level: 2, effect: '+100% damage taken. +80% currencies from Bosses' },
      { level: 3, effect: '+100% damage taken. +100% currencies from Bosses' }
    ],
    tags: ['risk', 'currency'],
    category: 'advanced'
  },
  {
    name: 'Untuned Guitar',
    effect: 'When you finish a room, all players permanently gain elemental damage. Does not stack.',
    levels: [
      { level: 1, effect: '+2% elemental damage per room cleared' },
      { level: 2, effect: '+3% elemental damage per room cleared' },
      { level: 3, effect: '+4% elemental damage per room cleared' }
    ],
    tags: ['buff', 'damage'],
    category: 'advanced'
  },
  {
    name: 'Vintage Blowtorch',
    effect: 'Periodically, your next Final Strike Stuns non-boss enemies.',
    levels: [
      { level: 1, effect: 'Every 7 seconds, next Final Strike stuns' },
      { level: 2, effect: 'Every 6 seconds, next Final Strike stuns' },
      { level: 3, effect: 'Every 5 seconds, next Final Strike stuns' }
    ],
    tags: ['stun', 'control'],
    category: 'advanced'
  },
  {
    name: 'Busted Snare',
    effect: 'When you finish a room, all players heal. Does not stack.',
    levels: [
      { level: 1, effect: 'Heal 2 Health per room cleared' },
      { level: 2, effect: 'Heal 3 Health per room cleared' },
      { level: 3, effect: 'Heal 4 Health per room cleared' }
    ],
    tags: ['healing'],
    category: 'advanced'
  },
  {
    name: 'Splintered Drumsticks',
    effect: 'When you finish a room, all players gain Scrap. Does not stack.',
    levels: [
      { level: 1, effect: '+10 Scrap per room cleared' },
      { level: 2, effect: '+15 Scrap per room cleared' },
      { level: 3, effect: '+20 Scrap per room cleared' }
    ],
    tags: ['economy', 'scrap'],
    category: 'advanced'
  },
  {
    name: "Casey's Portrait",
    effect: "Defeating bosses increases all players' Max Health.",
    levels: [
      { level: 1, effect: '+5 Max Health per boss defeated' },
      { level: 2, effect: '+6 Max Health per boss defeated' },
      { level: 3, effect: '+7 Max Health per boss defeated' }
    ],
    tags: ['health', 'boss'],
    category: 'advanced'
  },
  {
    name: 'Mysterious Gofu',
    effect: 'Gain a random Tool at the start of each Chapter.',
    levels: [
      { level: 1, effect: 'Gain a random level 1 Tool per Chapter' },
      { level: 2, effect: 'Gain a random level 2 Tool per Chapter' },
      { level: 3, effect: 'Gain a random level 3 Tool per Chapter' }
    ],
    tags: ['tool', 'random'],
    category: 'advanced'
  },
  {
    name: 'Clan Hamato Seal',
    effect: "Gain one Splinter's Revive. Revive restores additional Health.",
    levels: [
      { level: 1, effect: "+1 Splinter's Revive. +10% additional Health on revive" },
      { level: 2, effect: "+1 Splinter's Revive. +15% additional Health on revive" },
      { level: 3, effect: "+1 Splinter's Revive. +20% additional Health on revive" }
    ],
    tags: ['revive', 'survivability'],
    category: 'advanced'
  },
  {
    name: 'Cracked Stasis Beacon',
    effect: "You're much slower. Beat a Boss while carrying this for extra Scrap.",
    levels: [
      { level: 1, effect: 'Much slower. +500 Scrap on Boss defeat' },
      { level: 2, effect: 'Much slower. +650 Scrap on Boss defeat' },
      { level: 3, effect: 'Much slower. +800 Scrap on Boss defeat' }
    ],
    tags: ['risk', 'scrap'],
    category: 'advanced'
  },
  {
    name: "Kitsune's Cup",
    effect: "You can't heal. Gain bonus Dreamer Coins.",
    levels: [
      { level: 1, effect: "Can't heal. +50% Dreamer Coins" },
      { level: 2, effect: "Can't heal. +65% Dreamer Coins" },
      { level: 3, effect: "Can't heal. +80% Dreamer Coins" }
    ],
    tags: ['risk', 'coins'],
    category: 'advanced'
  },
  {
    name: 'Giant Tusk Fragment',
    effect: "You can't heal. Gain bonus Dragon Coins.",
    levels: [
      { level: 1, effect: "Can't heal. +50% Dragon Coins" },
      { level: 2, effect: "Can't heal. +65% Dragon Coins" },
      { level: 3, effect: "Can't heal. +80% Dragon Coins" }
    ],
    tags: ['risk', 'coins'],
    category: 'advanced'
  }
];
