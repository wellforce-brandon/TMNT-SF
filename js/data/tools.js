// TMNT: Splintered Fate - Tools Data
// 18 tools available during runs — each has 3 upgrade levels

export const tools = [
  {
    name: 'Attack Drone',
    effect: 'Fires a missile on Final Strike that deals 15 / 20 / 25 damage. When Activated, fires 10 / 12 / 15 Missiles over 2s.',
    element: null,
    chargeRate: 1.0
  },
  {
    name: 'Fireball',
    effect: 'Fire 4 seeking fireballs towards nearby enemies. Each fireball deals 30 / 50 / 100 Flame damage in an area upon impact.',
    element: 'flame',
    chargeRate: 1.0
  },
  {
    name: 'Hardened Shell',
    effect: 'Deal 20 / 40 / 60 Physical damage to nearby enemies. For the next 1.4s / 1.8s / 2.2s, become immune to all damage.',
    element: 'physical',
    chargeRate: 1.2
  },
  {
    name: 'Landmines',
    effect: 'Place 3 / 4 / 5 mines around your position. Each mine deals 40 / 50 / 60 Physical damage on detonation.',
    element: null,
    chargeRate: 0.9
  },
  {
    name: 'Meteor Storm',
    effect: 'Call down 5 / 7 / 9 meteors over 2s. Each meteor deals 25 / 35 / 50 Flame damage in an area.',
    element: 'flame',
    chargeRate: 1.4
  },
  {
    name: 'Ooze Shuriken',
    effect: 'Throw 3 / 4 / 5 Ooze-coated shuriken. Each applies 1 / 1 / 2 Ooze stacks and deals 15 / 20 / 25 damage.',
    element: 'ooze',
    chargeRate: 0.8
  },
  {
    name: 'Ride the Wave',
    effect: 'Surf forward on a wave dealing 40 / 60 / 80 Water damage and applying 1 / 2 / 3 Water stacks to enemies hit.',
    element: 'water',
    chargeRate: 1.1
  },
  {
    name: 'Shuriken',
    effect: 'Throw a shuriken that bounces between 3 / 4 / 5 enemies, dealing 20 / 30 / 40 Physical damage per hit.',
    element: null,
    chargeRate: 0.7
  },
  {
    name: 'Shuriken Storm',
    effect: 'Throw 8 / 10 / 12 shuriken in all directions dealing 15 / 20 / 30 Physical damage each.',
    element: 'physical',
    chargeRate: 1.3
  },
  {
    name: 'Smoke Bomb',
    effect: 'Create a smoke cloud for 2s / 3s / 4s. Enemies inside are stunned. Gain 20% / 30% / 40% dodge while inside.',
    element: 'physical',
    chargeRate: 1.0,
    statBonuses: [{ stat: 'dodgeChance', values: [20, 30, 40], conditional: true, condition: 'while in cloud' }]
  },
  {
    name: 'Taunt',
    effect: 'Taunt nearby enemies for 2s / 3s / 4s. Taunted enemies deal 10% / 20% / 30% less damage.',
    element: null,
    chargeRate: 0.9
  },
  {
    name: 'The Juice',
    effect: 'Gain 30% / 40% / 50% increased damage and recover Special charges for 6s / 8s / 10s.',
    element: null,
    chargeRate: 1.2,
    statBonuses: [
      { stat: 'attackDamage', values: [30, 40, 50], conditional: true, condition: 'timed buff' }
    ]
  },
  {
    name: 'Turtle Line',
    effect: 'Launch a grappling line that pulls enemies in, dealing 30 / 45 / 60 Physical damage. Range: 6 / 8 / 10 tiles.',
    element: 'physical',
    chargeRate: 0.8
  },
  {
    name: 'Unstable Canister',
    effect: 'Throw an Ooze canister that explodes after 1s, dealing 50 / 75 / 100 damage and applying 2 / 3 / 4 Ooze stacks.',
    element: 'ooze',
    chargeRate: 1.1
  },
  {
    name: 'Utrom Drone',
    effect: 'Deploy a drone for 5s / 7s / 9s that fires Utrom bolts dealing 10 / 15 / 20 damage per hit.',
    element: 'utrom',
    chargeRate: 1.0
  },
  {
    name: 'Utrom Rod',
    effect: 'Strike with an electrified rod dealing 35 / 55 / 75 Utrom damage. Chains to 2 / 3 / 4 nearby enemies.',
    element: 'utrom',
    chargeRate: 0.9
  },
  {
    name: 'Utrom Shuriken',
    effect: 'Throw an Utrom-charged shuriken that chains to 3 / 4 / 5 enemies, dealing 25 / 35 / 50 Utrom damage per hit.',
    element: 'utrom',
    chargeRate: 0.8
  },
  {
    name: 'Water Sweep',
    effect: 'Create a sweeping wave dealing 30 / 50 / 70 Water damage. Pushes enemies back and applies 1 / 2 / 3 Water stacks.',
    element: 'water',
    chargeRate: 1.0
  }
];
