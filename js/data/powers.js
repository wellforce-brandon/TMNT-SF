// TMNT: Splintered Fate - Turtle Powers Data
// All powers organized by element type with tier progression
// Source of truth: https://tmntsplinteredfate.pages.dev/powers

export const powers = [

  // ============================================================
  // WATER
  // ============================================================

  // Water - Initial
  {
    name: 'Dilution',
    type: 'water',
    slot: 'passive',
    effect: '+20% / 30% / 40% Attack and Special damage area',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Still Waters',
    type: 'water',
    slot: 'passive',
    effect: 'Not using Attack for 2s+ grants +80% / 100% / 120% damage; next attack is Final Strike. Lost upon Attack',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Torrential Strike',
    type: 'water',
    slot: 'strike',
    effect: 'Final Strike grants Torrent stack for 4s. Torrent increases Multi-Hit chance by 8% / 10% / 12%. Max 5 stacks',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Water Abilities',
    type: 'water',
    slot: 'ability',
    effect: 'Special and Tool has 60% / 80% / 100% chance to deal 55 / 70 / 85 Water damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Water Attacks',
    type: 'water',
    slot: 'strike',
    effect: 'Attacks deal 15 / 20 / 25 Water damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Water Dash',
    type: 'water',
    slot: 'dash',
    effect: 'Deal 45 / 60 / 75 Water damage to nearby enemies at the end of a Dash',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Water - Secondary
  {
    name: 'Frost',
    type: 'water',
    slot: 'passive',
    effect: 'Water damage applies Frost for 5s, slowing enemy by 50% / 60% / 70%',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Heavy Rain',
    type: 'water',
    slot: 'passive',
    effect: 'Deal +40% / +60% / +80% increased Water damage. Increase doubled during heavy rain',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Splash Damage',
    type: 'water',
    slot: 'passive',
    effect: '40% / 55% / 70% of Water damage also dealt to nearby enemies',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Pressure Nozzle',
    type: 'water',
    slot: 'passive',
    effect: '+15% / 20% / 30% damage dealt against Bosses',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'High Tide',
    type: 'water',
    slot: 'strike',
    effect: 'While Still Waters active, Final Strike causes +70 / 100 / 130 Water damage and +15% Movement Speed',
    tier: 'secondary',
    requires: 'After Still Waters',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Torrential Rain',
    type: 'water',
    slot: 'ability',
    effect: 'Using Special or Tool grants Torrent Stack. Attacks deal +4 / 7 / 10 Water damage per stack',
    tier: 'secondary',
    requires: 'After Torrential Strike',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'When It Rains',
    type: 'water',
    slot: 'passive',
    effect: 'Multi-Hits deal 30 / 45 / 60 Water damage',
    tier: 'secondary',
    requires: 'After Torrential Strike',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Flash Freeze',
    type: 'water',
    slot: 'passive',
    effect: 'Frost Stuns enemies for 0.7s / 1.2s / 1.5s when first applied. Stun does not affect bosses',
    tier: 'secondary',
    requires: 'After Frost',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Freeze',
    type: 'water',
    slot: 'passive',
    effect: 'Apply Frost to nearby enemies every 5s / 4s / 3s',
    tier: 'secondary',
    requires: 'After Frost',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // FLAME
  // ============================================================

  // Flame - Initial
  {
    name: 'Flame Abilities',
    type: 'flame',
    slot: 'ability',
    effect: 'Special and Tool deals 15 / 25 / 40 Flame damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Flame Dash',
    type: 'flame',
    slot: 'dash',
    effect: 'Deal 30 / 50 / 70 Flame damage to nearby enemies at the start of a Dash',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Flame Strike',
    type: 'flame',
    slot: 'strike',
    effect: 'Final Strike causes an explosion, dealing 25 / 35 / 45 Flame damage to nearby enemies',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Furious Attacks',
    type: 'flame',
    slot: 'passive',
    effect: '+20% / 35% / 50% Attack Critical Hit chance',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Rage',
    type: 'flame',
    slot: 'passive',
    effect: 'Deal 40% / 70% / 100% increased damage while below 50% Health',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Rapid Fire',
    type: 'flame',
    slot: 'passive',
    effect: '+20% / 35% / 50% damage dealt and +25% / 40% / 55% Move Speed for 25s / 35s / 45s after combat start',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Flame - Secondary
  {
    name: 'Focus Fire',
    type: 'flame',
    slot: 'passive',
    effect: '+15% / 20% / 30% Flame damage against Bosses',
    tier: 'secondary',
    requires: 'After Dealing Flame Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Inferno',
    type: 'flame',
    slot: 'passive',
    effect: 'Apply Inferno to enemies hit by Flame damage for 3s. Inferno deals 15 / 20 / 25 Flame damage per second',
    tier: 'secondary',
    requires: 'After Dealing Flame Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Precision',
    type: 'flame',
    slot: 'passive',
    effect: '+60% / 120% / 180% Critical Hit damage',
    tier: 'secondary',
    requires: 'After Furious Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Incendiary Strikes',
    type: 'flame',
    slot: 'passive',
    effect: 'Deal 50 / 75 / 100 Flame damage when scoring a Critical Hit',
    tier: 'secondary',
    requires: 'After Furious Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Blazing Inferno',
    type: 'flame',
    slot: 'passive',
    effect: '+3s / 4s / 5s Inferno duration',
    tier: 'secondary',
    requires: 'After Inferno',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Preheated',
    type: 'flame',
    slot: 'passive',
    effect: '+15% / 30% / 60% Global Critical Hit chance against targets affected by Inferno',
    tier: 'secondary',
    requires: 'After Inferno',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Trailblazer',
    type: 'flame',
    slot: 'passive',
    effect: '+15s Rapid Fire duration. While active, defeating enemies grants +1 / 2 / 3s duration and +5 / 10 / 15% damage',
    tier: 'secondary',
    requires: 'After Rapid Fire',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // OOZE
  // ============================================================

  // Ooze - Initial
  {
    name: 'Ooze Abilities',
    type: 'ooze',
    slot: 'ability',
    effect: 'Special and Tool applies 1 / 2 / 3 stack(s) of Ooze',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ooze Attack',
    type: 'ooze',
    slot: 'strike',
    effect: 'Attacks have 25% / 33% / 50% chance to apply 1 stack of Ooze',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ooze Dash',
    type: 'ooze',
    slot: 'dash',
    effect: 'Apply 1 / 2 / 3 stack(s) of Ooze to enemies hit by Dash',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ooze Strike',
    type: 'ooze',
    slot: 'strike',
    effect: 'Final Strike applies 2 / 4 / 6 stack(s) of Ooze',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shelf Life',
    type: 'ooze',
    slot: 'special',
    effect: 'Boosts last for an additional 4 / 5 / 6 rooms',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Special Spice',
    type: 'ooze',
    slot: 'special',
    effect: '50% / 75% / 100% increased effectiveness of Boosts',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Ooze - Secondary
  {
    name: 'Catalytic Consequence',
    type: 'ooze',
    slot: 'dash',
    effect: 'Deal +15 / 25 / 35 damage with Dash Attack for each Stack of Ooze on enemy',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Chunky Mixture',
    type: 'ooze',
    slot: 'passive',
    effect: 'Ooze can now stack up to 6 / 8 / 10 time(s)',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Goo',
    type: 'ooze',
    slot: 'passive',
    effect: '+60% / +120% / +180% Ooze damage per second',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: "Goo'dbye",
    type: 'ooze',
    slot: 'passive',
    effect: 'Enemies affected by Ooze explode on defeat, dealing 50 / 100 / 150 Ooze damage to nearby enemies',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Living Ingredients',
    type: 'ooze',
    slot: 'passive',
    effect: 'When Ooze expires, it is reapplied to 1 / 2 / 3 nearby unaffected enemies',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Potency',
    type: 'ooze',
    slot: 'passive',
    effect: 'Ooze is now applied with an additional 1 / 2 / 3 stack(s)',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Unfortunate Odor',
    type: 'ooze',
    slot: 'passive',
    effect: 'Deal 10 / 45 / 80 Ooze damage and Stun enemies for 1s when applying Ooze. Bosses not stunned',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // UTROM
  // ============================================================

  // Utrom - Initial
  {
    name: 'Utrom Abilities',
    type: 'utrom',
    slot: 'ability',
    effect: 'Special and Tools deal 20 / 30 / 40 Utrom damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Attacks',
    type: 'utrom',
    slot: 'strike',
    effect: 'Attacks have 30% / 45% / 60% chance to deal 20 / 25 / 30 Utrom damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Battery',
    type: 'utrom',
    slot: 'passive',
    effect: 'At room start, fill Tool by 10% / 15% / 20% per second for 10s',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Dash',
    type: 'utrom',
    slot: 'dash',
    effect: 'Dash deals 15 Utrom damage to 3 / 4 / 5 enemies near where you end up',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Strike',
    type: 'utrom',
    slot: 'strike',
    effect: 'Final Strike calls lightning to hit 2 nearby enemies for 20 / 25 / 30 Utrom damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Utrom - Secondary
  {
    name: 'Chain Lightning',
    type: 'utrom',
    slot: 'passive',
    effect: 'Utrom damage strikes again and chains to two nearby enemies for 10 / 15 / 20 Utrom damage',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Charged Up',
    type: 'utrom',
    slot: 'passive',
    effect: 'Gain 1 / 2 / 3 stack(s) of Adrenaline upon using Tool',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Electrifying',
    type: 'utrom',
    slot: 'passive',
    effect: 'Utrom damage applies Electrified to enemies for 3s. Electrified deals 10 / 15 / 20 Utrom damage per second. Max 3 stacks',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Relay',
    type: 'utrom',
    slot: 'ability',
    effect: 'Using Special or Tool causes Lightning Strike dealing 20 / 25 / 30 damage',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Stormy Weather',
    type: 'utrom',
    slot: 'passive',
    effect: 'Periodically deal 15 / 20 / 25 Utrom damage to 1 nearby enemy',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Techno-Organic Interface',
    type: 'utrom',
    slot: 'passive',
    effect: '+10 / 20 / 30% Max Health. +15% Move Speed',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Alternating Current',
    type: 'utrom',
    slot: 'passive',
    effect: 'Electrified additionally increases damage received by 30% / 50% / 70%',
    tier: 'secondary',
    requires: 'After Electrifying',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // NINJA
  // ============================================================

  // Ninja - Initial
  {
    name: 'Adrenaline',
    type: 'ninja',
    slot: 'passive',
    effect: 'Gain Adrenaline stack upon defeating enemies. Increases Physical damage by 5% / 10% / 15%. Max 5 stacks',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'First Strike',
    type: 'ninja',
    slot: 'dash',
    effect: '+30% / 45% / 60% damage dealt for 1s after a Dash',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Quick Feet',
    type: 'ninja',
    slot: 'special',
    effect: '+1 Dash charge(s)',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shinobi Supremacy',
    type: 'ninja',
    slot: 'passive',
    effect: '+10% / 15% / 20% Dodge chance',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shuriken Attacks',
    type: 'ninja',
    slot: 'strike',
    effect: 'Attacks have 30% / 60% / 100% chance to throw a Shuriken forward',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Ninja - Secondary
  {
    name: 'Art of Darkness',
    type: 'ninja',
    slot: 'passive',
    effect: 'Adrenaline now also increases Elemental damage by 15% / 20% / 25%',
    tier: 'secondary',
    requires: 'After Adrenaline',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Heightened Senses',
    type: 'ninja',
    slot: 'passive',
    effect: 'Gain 1 / 2 / 3 stack(s) of Adrenaline upon a Final Strike',
    tier: 'secondary',
    requires: 'After Adrenaline',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Quick Hands',
    type: 'ninja',
    slot: 'passive',
    effect: '+1 / 2 / 3 Shuriken thrown',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shuriken Breaker',
    type: 'ninja',
    slot: 'passive',
    effect: 'Shuriken apply Guard Break for 2s. Guard Break increases damage received by 15% / 25% / 35%',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shuriken Engineer',
    type: 'ninja',
    slot: 'passive',
    effect: 'Shuriken have 30% / 60% / 100% chance of triggering Tool bonuses',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Throwing Mastery',
    type: 'ninja',
    slot: 'passive',
    effect: '+40% / 65% / 90% Shuriken damage',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Throwing Arts: Chakram',
    type: 'ninja',
    slot: 'passive',
    effect: 'Shuriken now boomerang, returning to your position. -30% / -5% / 20% Shuriken Damage',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Throwing Arts: Ricochet',
    type: 'ninja',
    slot: 'passive',
    effect: 'Shuriken now ricochet, bouncing off enemies. -20% / +10% / +40% Shuriken damage',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ninjutsu Tactics',
    type: 'ninja',
    slot: 'passive',
    effect: '+15% / 25% / 25% Global Critical Hit chance for 2s / 2.5s / 3s upon Dodge',
    tier: 'secondary',
    requires: 'After Shinobi Supremacy',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Extended Assault',
    type: 'ninja',
    slot: 'dash',
    effect: 'Throw 1 / 2 / 3 Shuriken forward at the start of Dash',
    tier: 'secondary',
    requires: 'After Shuriken Attacks + Quick Feet/First Strike',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // ASTRAL LIGHT
  // ============================================================

  // Light - Initial
  {
    name: 'Light Attacks',
    type: 'light',
    slot: 'strike',
    effect: 'Attack damage increased by 4% / 7% / 10% of Max Health',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shimmering Shield',
    type: 'light',
    slot: 'dash',
    effect: 'Grant Light Shell for 1.5s / 2.5s / 3.5s at the start of Dash',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Light - Secondary
  {
    name: 'Ancestral Guardian',
    type: 'light',
    slot: 'passive',
    effect: 'Light Shell increases Elemental damage by 20% / 30% / 40% while active',
    tier: 'secondary',
    requires: 'After Shimmering Shield',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Daybreak',
    type: 'light',
    slot: 'strike',
    effect: 'Attacks apply 1 / 2 / 3 stack(s) of Blinding Light for 3s / 4s / 5s. Each stack reduces damage dealt by 4% / 6% / 8%. Max 5 Stacks',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Eternal Light',
    type: 'light',
    slot: 'passive',
    effect: '+40% / 60% / 80% Positive Effect duration',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Light Embrace',
    type: 'light',
    slot: 'passive',
    effect: 'Reduce damage received by 2% / 2.5% / 3% for each Astral Light power obtained',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Radiant Warrior',
    type: 'light',
    slot: 'ability',
    effect: 'Special and Tool grants Light Shell for 1.5s / 3s / 4.5s',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Revival',
    type: 'light',
    slot: 'special',
    effect: 'Gain 1 Splinter\'s Revive(s). +30 / 60 Max Health',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Astral Insight',
    type: 'light',
    slot: 'passive',
    effect: 'Increase damage by 30% / 40% / 60% while Light Shell is active',
    tier: 'secondary',
    requires: 'After Shimmering Shield',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Illumination',
    type: 'light',
    slot: 'passive',
    effect: 'Light Shell reflects projectiles. Reflected projectiles deal 45% / 60% / 75% of Max Health as Light damage',
    tier: 'secondary',
    requires: 'After Shimmering Shield',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Revved Up',
    type: 'light',
    slot: 'passive',
    effect: 'Gain +20% / 25% / 30% chance of dodging enemy attacks when affected by Blinding Light',
    tier: 'secondary',
    requires: 'After Daybreak',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // ASTRAL DARK
  // ============================================================

  // Dark - Initial
  {
    name: 'Cloak of Shadow',
    type: 'dark',
    slot: 'ability',
    effect: 'Special or Tool grants Dark Shell for 1.8s / 2.4s / 3.2s, dealing 10 / 25 / 40 Dark damage and applying 1 stack of Darkness to nearby enemies',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Nightfall',
    type: 'dark',
    slot: 'strike',
    effect: 'Final Strike applies 1 stack of Darkness for 3 / 4 / 5s and deals 10 / 15 / 25 Dark damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Dark - Secondary
  {
    name: 'Call of the Void',
    type: 'dark',
    slot: 'passive',
    effect: 'Deal 10 / 15 / 20 Dark damage and pull in nearby enemies upon defeating an enemy affected by Darkness',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Core Collapse',
    type: 'dark',
    slot: 'passive',
    effect: 'Stun nearby enemies for 0.5s / 1s / 1.5s upon defeating an enemy affected by Darkness',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dark Attacks',
    type: 'dark',
    slot: 'passive',
    effect: '+25% / 40% / 60% Attack damage against enemies affected by Darkness',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dark Embrace',
    type: 'dark',
    slot: 'passive',
    effect: '+3% / 4% / 5% damage dealt and +5% / 7% / 10% Move Speed for each Astral Dark power obtained',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dark Star',
    type: 'dark',
    slot: 'special',
    effect: 'Remove all Splinter\'s Revives. Gain +20% damage, plus 40% damage and heal 15% of Max HP for each Revive removed',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: "Dragon's Claw",
    type: 'dark',
    slot: 'passive',
    effect: '+10% increased damage dealt. Gain additional 15% / 20% / 25% whenever selecting Dragon Coins in Room Rewards',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Eternal Darkness',
    type: 'dark',
    slot: 'passive',
    effect: '+50% / 80% / 100% duration of Negative Effects applied to enemies',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Gift of the Dragon',
    type: 'dark',
    slot: 'special',
    effect: 'Gain 120 Dragon coins and 200 Scrap',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Lingering Darkness',
    type: 'dark',
    slot: 'passive',
    effect: 'Darkness deals 10 / 15 / 25 Dark damage per second to affected enemies',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shifting Shadow',
    type: 'dark',
    slot: 'dash',
    effect: 'Dash deals 15 / 25 / 35 Dark damage, increased by 300% to targets affected by Darkness',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // ROBOTICS
  // ============================================================

  // Robotics - Initial
  {
    name: 'Aggressive Savings',
    type: 'robotics',
    slot: 'passive',
    effect: 'More Scrap increases damage. Up to 100% / 150% / 200% at 2000 Scrap',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ascendancy',
    type: 'robotics',
    slot: 'special',
    effect: 'Trigger Splinter\'s Revive to refresh Cooldowns and gain +25% / 50% / 80% Elemental Damage',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Blade Matrix',
    type: 'robotics',
    slot: 'strike',
    effect: 'After reaching full charge, attack to deal 25 / 35 / 50 damage in area around you',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Challenge Seeker',
    type: 'robotics',
    slot: 'passive',
    effect: 'Get +75 / 100 / 150 Scrap when entering Gauntlet Challenge or Shimmering Portal',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Compound Interest',
    type: 'robotics',
    slot: 'passive',
    effect: 'Whenever entering a room, gain 2% / 3% / 4% more Scrap',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Laser Strike',
    type: 'robotics',
    slot: 'strike',
    effect: 'After reaching full charge, attack to shoot laser dealing 15 / 25 / 35 damage. Ricochets 2 time(s)',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Last Stand Protocol',
    type: 'robotics',
    slot: 'passive',
    effect: 'Lower HP increases Charge Speed (up to 50% / 80% / 120%)',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Overdrive',
    type: 'robotics',
    slot: 'strike',
    effect: 'After reaching full charge, attack to enhance all attacks with 15 / 20 / 30 Utrom damage for 5s',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Regular Customer',
    type: 'robotics',
    slot: 'passive',
    effect: 'Reaching Store grants +1 Lucky Dice and 50 / 75 / 100 Scrap',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Spare Bot',
    type: 'robotics',
    slot: 'special',
    effect: 'Gain +1 Splinter\'s Revive. Revive heals 10% / 25% / 50% more',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Survival Matrix',
    type: 'robotics',
    slot: 'passive',
    effect: 'Below 50% HP, Tool fills 100% / 125% / 150% more quickly',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Wireless Charging',
    type: 'robotics',
    slot: 'dash',
    effect: 'Dashing through enemy fills Special by +15% / 25% / 35% over 2s (non-stacking)',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Robotics - Secondary
  {
    name: 'Biomechanical Speed',
    type: 'robotics',
    slot: 'passive',
    effect: 'Charge Effect activation grants 10% / 15% / 20% Special',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Charge Attacks',
    type: 'robotics',
    slot: 'strike',
    effect: 'Attacking gains +10% / 12% / 15% Charge',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Empowerment',
    type: 'robotics',
    slot: 'passive',
    effect: 'Charge Effect activation grants +5% / 10% / 15% elemental damage for all attacks for that room',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Photon Lance',
    type: 'robotics',
    slot: 'strike',
    effect: 'After reaching full charge, attack to cause lightning bolt falling, dealing 120 / 150 damage',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Power Surge',
    type: 'robotics',
    slot: 'ability',
    effect: 'Using Tool or Special grants +50% / 75% / 100% Charge',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Synthetic Rush',
    type: 'robotics',
    slot: 'passive',
    effect: 'Charge Effect activation grants 1 / 2 / 3 Adrenaline',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'System Calibration',
    type: 'robotics',
    slot: 'passive',
    effect: 'Charge Effect activation grants +15% / 20% / 30% Charge Speed for this room',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Thunderheart',
    type: 'robotics',
    slot: 'passive',
    effect: 'Take no damage from Lightning Storms. Lightning hit grants 30% / 60% / 100% Charge',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Quick Study',
    type: 'robotics',
    slot: 'passive',
    effect: '+100% / 120% / 150% Charge Speed',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },

  // ============================================================
  // LEGENDARY
  // ============================================================

  {
    name: 'Bright Spring',
    type: 'legendary',
    slot: 'passive',
    effect: 'Attacks restore 2 health',
    tier: 'secondary',
    requires: null,
    combo: ['light', 'water'],
    requiredPowers: ['Light Attacks', 'Water damage power']
  },
  {
    name: 'Cascade Drive',
    type: 'legendary',
    slot: 'passive',
    effect: 'Charge Effect activation grants 3% Multihit Chance for this room',
    tier: 'secondary',
    requires: null,
    combo: ['robotics', 'water'],
    requiredPowers: ['Charge power', 'Water damage power']
  },
  {
    name: 'Critical Flow',
    type: 'legendary',
    slot: 'passive',
    effect: 'Whenever Charge Effect activates, gain 3% Critical Hit Chance for this room',
    tier: 'secondary',
    requires: null,
    combo: ['robotics', 'flame'],
    requiredPowers: ['Charge power', 'Flame damage power']
  },
  {
    name: 'Dark Flame',
    type: 'legendary',
    slot: 'passive',
    effect: '+40% Flame Damage against targets affected by Darkness',
    tier: 'secondary',
    requires: null,
    combo: ['dark', 'flame'],
    requiredPowers: ['Darkness power', 'Flame damage power']
  },
  {
    name: 'Finisher',
    type: 'legendary',
    slot: 'passive',
    effect: 'Attacks and Specials instantly defeat enemies below 15% health',
    tier: 'secondary',
    requires: null,
    combo: ['dark', 'ninja'],
    requiredPowers: ['Darkness power', 'Any Ninja power']
  },
  {
    name: 'Frostfire',
    type: 'legendary',
    slot: 'passive',
    effect: 'Dealing Flame or Water damage with Attack, Special, or Tool deals 30% damage of opposite element',
    tier: 'secondary',
    requires: null,
    combo: ['water', 'flame'],
    requiredPowers: ['Frost', 'Flame damage power']
  },
  {
    name: 'Light Hammer',
    type: 'legendary',
    slot: 'passive',
    effect: 'Utrom damage is increased by 10% of Max Health',
    tier: 'secondary',
    requires: null,
    combo: ['light', 'utrom'],
    requiredPowers: ['Light Attacks', 'Utrom damage power']
  },
  {
    name: 'Revolution',
    type: 'legendary',
    slot: 'passive',
    effect: "Dash Attack's damage is increased by 1% of enemies' Max Health",
    tier: 'secondary',
    requires: null,
    combo: ['ninja', 'utrom'],
    requiredPowers: ['Quick Feet', 'Utrom damage power']
  },
  {
    name: 'Secret of the Ooze',
    type: 'legendary',
    slot: 'passive',
    effect: 'Reduce damage received by 30%',
    tier: 'secondary',
    requires: null,
    combo: ['ooze', 'utrom'],
    requiredPowers: ['Ooze applicator', 'Utrom damage power']
  },
  {
    name: 'Shatter',
    type: 'legendary',
    slot: 'passive',
    effect: 'Deal 200 Water and Utrom damage when applying Stun. Enemies no longer Stunned',
    tier: 'secondary',
    requires: null,
    combo: ['water', 'utrom'],
    requiredPowers: ['Frost', 'Utrom damage power']
  },
  {
    name: 'Shocking',
    type: 'legendary',
    slot: 'passive',
    effect: 'After reaching full charge, attack to deal 20 Utrom damage and Stun nearby enemies for 0.8s',
    tier: 'secondary',
    requires: null,
    combo: ['robotics', 'utrom'],
    requiredPowers: ['Charge power', 'Utrom damage power']
  },
  {
    name: 'Slippery',
    type: 'legendary',
    slot: 'passive',
    effect: 'Gain 20% Move Speed and charge Tool and Special 100% faster while at maximum Adrenaline',
    tier: 'secondary',
    requires: null,
    combo: ['ninja', 'ooze'],
    requiredPowers: ['Adrenaline', 'Ooze applicator']
  },
  {
    name: 'Solution to Pollution',
    type: 'legendary',
    slot: 'passive',
    effect: '+3s Ooze duration. Enemies affected by Ooze gain 1 stack(s) every second',
    tier: 'secondary',
    requires: null,
    combo: ['ooze', 'water'],
    requiredPowers: ['Potency', 'Water damage power']
  },
  {
    name: 'Spontaneous Combustion',
    type: 'legendary',
    slot: 'passive',
    effect: 'Gain 30% chance to deal 100 Flame damage when applying Ooze',
    tier: 'secondary',
    requires: null,
    combo: ['ooze', 'flame'],
    requiredPowers: ['Ooze applicator', 'Flame damage power']
  },
  {
    name: 'Tempered Shuriken',
    type: 'legendary',
    slot: 'passive',
    effect: '+40% Critical Hit chance with Shuriken',
    tier: 'secondary',
    requires: null,
    combo: ['ninja', 'flame'],
    requiredPowers: ['Shuriken Attacks', 'Furious Attacks']
  }
];
