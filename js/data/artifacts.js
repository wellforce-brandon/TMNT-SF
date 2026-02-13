// TMNT: Splintered Fate - Artifacts Data
// 24 artifacts organized by category with 3 scaling levels each

export const artifacts = [
  // =====================
  // ELEMENT-BOOSTING (7)
  // =====================
  {
    name: 'Manhole Cover',
    effect: 'Increases Water power offering rate.',
    levels: [
      { level: 1, effect: '+10% Water power offering rate' },
      { level: 2, effect: '+20% Water power offering rate' },
      { level: 3, effect: '+35% Water power offering rate' }
    ],
    tags: ['water'],
    category: 'element'
  },
  {
    name: 'Foot Clan Medallion',
    effect: 'Increases Flame power offering rate.',
    levels: [
      { level: 1, effect: '+10% Flame power offering rate' },
      { level: 2, effect: '+20% Flame power offering rate' },
      { level: 3, effect: '+35% Flame power offering rate' }
    ],
    tags: ['flame'],
    category: 'element'
  },
  {
    name: 'Broken Ooze Canister',
    effect: 'Increases Ooze power offering rate.',
    levels: [
      { level: 1, effect: '+10% Ooze power offering rate' },
      { level: 2, effect: '+20% Ooze power offering rate' },
      { level: 3, effect: '+35% Ooze power offering rate' }
    ],
    tags: ['ooze'],
    category: 'element'
  },
  {
    name: 'Sword of Tengu',
    effect: 'Increases Utrom power offering rate.',
    levels: [
      { level: 1, effect: '+10% Utrom power offering rate' },
      { level: 2, effect: '+20% Utrom power offering rate' },
      { level: 3, effect: '+35% Utrom power offering rate' }
    ],
    tags: ['utrom'],
    category: 'element'
  },
  {
    name: 'Tessen',
    effect: 'Increases Ninja power offering rate.',
    levels: [
      { level: 1, effect: '+10% Ninja power offering rate' },
      { level: 2, effect: '+20% Ninja power offering rate' },
      { level: 3, effect: '+35% Ninja power offering rate' }
    ],
    tags: ['ninja'],
    category: 'element'
  },
  {
    name: 'Mystical Seal of Protection',
    effect: 'Increases Astral power offering rate.',
    levels: [
      { level: 1, effect: '+10% Astral power offering rate' },
      { level: 2, effect: '+20% Astral power offering rate' },
      { level: 3, effect: '+35% Astral power offering rate' }
    ],
    tags: ['astral'],
    category: 'element'
  },
  {
    name: 'Positronic Motherboard',
    effect: 'Increases Robotics power offering rate.',
    levels: [
      { level: 1, effect: '+10% Robotics power offering rate' },
      { level: 2, effect: '+20% Robotics power offering rate' },
      { level: 3, effect: '+35% Robotics power offering rate' }
    ],
    tags: ['robotics'],
    category: 'element'
  },

  // =====================
  // ECONOMY/META (6)
  // =====================
  {
    name: 'Stockgen ID Card',
    effect: 'Increased Scrap from enemies.',
    levels: [
      { level: 1, effect: '+10% Scrap from enemies' },
      { level: 2, effect: '+20% Scrap from enemies' },
      { level: 3, effect: '+35% Scrap from enemies' }
    ],
    tags: ['economy', 'scrap'],
    category: 'economy'
  },
  {
    name: 'Turnstone',
    effect: 'Better shop inventory.',
    levels: [
      { level: 1, effect: '+10% chance for upgraded shop items' },
      { level: 2, effect: '+20% chance for upgraded shop items' },
      { level: 3, effect: '+35% chance for upgraded shop items' }
    ],
    tags: ['economy', 'shop'],
    category: 'economy'
  },
  {
    name: 'Battle Shell Fuzzy Dice',
    effect: 'Increased luck and critical strike chance.',
    levels: [
      { level: 1, effect: '+5% luck and crit chance' },
      { level: 2, effect: '+10% luck and crit chance' },
      { level: 3, effect: '+18% luck and crit chance' }
    ],
    tags: ['luck', 'crit'],
    category: 'economy'
  },
  {
    name: 'Insulated Pizza Box',
    effect: 'Extended boost duration.',
    levels: [
      { level: 1, effect: '+15% boost duration' },
      { level: 2, effect: '+30% boost duration' },
      { level: 3, effect: '+50% boost duration' }
    ],
    tags: ['boost', 'duration'],
    category: 'economy'
  },
  {
    name: 'Splintered Drumsticks',
    effect: 'Increased power selection bonus.',
    levels: [
      { level: 1, effect: '+1 additional power choice per offering' },
      { level: 2, effect: '+1 additional power choice, +10% rare rate' },
      { level: 3, effect: '+2 additional power choices, +20% rare rate' }
    ],
    tags: ['power', 'selection'],
    category: 'economy'
  },
  {
    name: 'Mysterious Gofu',
    effect: 'Random bonus per floor.',
    levels: [
      { level: 1, effect: '1 random minor bonus per floor' },
      { level: 2, effect: '1 random moderate bonus per floor' },
      { level: 3, effect: '2 random bonuses per floor (can stack)' }
    ],
    tags: ['random', 'bonus'],
    category: 'economy'
  },

  // =====================
  // DEFENSE/UTILITY (6)
  // =====================
  {
    name: 'Heart of Tengu',
    effect: 'Increased dodge chance.',
    levels: [
      { level: 1, effect: '+5% dodge chance' },
      { level: 2, effect: '+10% dodge chance' },
      { level: 3, effect: '+18% dodge chance' }
    ],
    tags: ['dodge', 'defense'],
    category: 'defense'
  },
  {
    name: 'Astral Charm',
    effect: 'Increased astral healing.',
    levels: [
      { level: 1, effect: '+10% astral healing received' },
      { level: 2, effect: '+20% astral healing received' },
      { level: 3, effect: '+35% astral healing received' }
    ],
    tags: ['astral', 'healing'],
    category: 'defense'
  },
  {
    name: 'Vintage Blowtorch',
    effect: 'Damage over time on all attacks.',
    levels: [
      { level: 1, effect: 'Attacks deal 3% bonus damage over 3 seconds' },
      { level: 2, effect: 'Attacks deal 6% bonus damage over 3 seconds' },
      { level: 3, effect: 'Attacks deal 10% bonus damage over 4 seconds' }
    ],
    tags: ['damage', 'dot'],
    category: 'defense'
  },
  {
    name: 'Busted Snare',
    effect: 'Chance to slow enemies on hit.',
    levels: [
      { level: 1, effect: '8% chance to slow enemies by 20% for 2 seconds' },
      { level: 2, effect: '15% chance to slow enemies by 25% for 3 seconds' },
      { level: 3, effect: '25% chance to slow enemies by 35% for 3 seconds' }
    ],
    tags: ['slow', 'control'],
    category: 'defense'
  },
  {
    name: "Casey's Portrait",
    effect: 'Increased revive health.',
    levels: [
      { level: 1, effect: 'Revive with 25% HP (up from 15%)' },
      { level: 2, effect: 'Revive with 35% HP' },
      { level: 3, effect: 'Revive with 50% HP + 3 seconds invulnerability' }
    ],
    tags: ['revive', 'health'],
    category: 'defense'
  },
  {
    name: 'Clan Hamato Seal',
    effect: 'Extra revive charge.',
    levels: [
      { level: 1, effect: '+1 revive charge per run' },
      { level: 2, effect: '+2 revive charges per run' },
      { level: 3, effect: '+3 revive charges per run' }
    ],
    tags: ['revive', 'survivability'],
    category: 'defense'
  },

  // =====================
  // RISK/REWARD (4)
  // =====================
  {
    name: 'War Staff',
    effect: '+100% damage taken, massive currency gains.',
    levels: [
      { level: 1, effect: '+100% damage taken, +50% currency gains' },
      { level: 2, effect: '+100% damage taken, +100% currency gains' },
      { level: 3, effect: '+100% damage taken, +175% currency gains' }
    ],
    tags: ['risk', 'currency'],
    category: 'risk'
  },
  {
    name: 'Cracked Stasis Beacon',
    effect: 'Chance to freeze time, chance to freeze you.',
    levels: [
      { level: 1, effect: '5% chance to freeze time for 2s, 3% chance to freeze self for 1s' },
      { level: 2, effect: '8% chance to freeze time for 3s, 3% chance to freeze self for 1s' },
      { level: 3, effect: '12% chance to freeze time for 4s, 3% chance to freeze self for 1s' }
    ],
    tags: ['risk', 'freeze', 'time'],
    category: 'risk'
  },
  {
    name: "Kitsune's Cup",
    effect: 'Heal on kill, damage on hit.',
    levels: [
      { level: 1, effect: 'Heal 2% max HP on kill, take 1% max HP damage on hit' },
      { level: 2, effect: 'Heal 4% max HP on kill, take 1% max HP damage on hit' },
      { level: 3, effect: 'Heal 6% max HP on kill, take 1.5% max HP damage on hit' }
    ],
    tags: ['risk', 'healing', 'damage'],
    category: 'risk'
  },
  {
    name: 'Giant Tusk Fragment',
    effect: 'Stronger when at low health.',
    levels: [
      { level: 1, effect: '+20% damage when below 40% HP' },
      { level: 2, effect: '+35% damage when below 40% HP' },
      { level: 3, effect: '+50% damage when below 40% HP, +15% dodge' }
    ],
    tags: ['risk', 'damage', 'low-health'],
    category: 'risk'
  },

  // =====================
  // BUFF (1)
  // =====================
  {
    name: 'Untuned Guitar',
    effect: 'Periodic damage buff to all attacks.',
    levels: [
      { level: 1, effect: 'Every 10 seconds, gain +15% damage for 3 seconds' },
      { level: 2, effect: 'Every 8 seconds, gain +25% damage for 4 seconds' },
      { level: 3, effect: 'Every 6 seconds, gain +35% damage for 5 seconds' }
    ],
    tags: ['buff', 'damage'],
    category: 'buff'
  }
];
