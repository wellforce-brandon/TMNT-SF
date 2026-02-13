// TMNT: Splintered Fate - Turtle Powers Data
// All powers organized by element type with tier progression

export const powers = [

  // ============================================================
  // WATER
  // ============================================================

  // Water - Initial
  {
    name: 'Torrential Strike',
    type: 'water',
    slot: 'strike',
    effect: 'Your strikes deal bonus Water damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Water Dash',
    type: 'water',
    slot: 'dash',
    effect: 'Your dash deals Water damage to enemies you pass through.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Water Abilities',
    type: 'water',
    slot: 'ability',
    effect: 'Your abilities deal additional Water damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dilution',
    type: 'water',
    slot: 'passive',
    effect: 'Enemies affected by Water take increased damage from all sources.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Still Waters',
    type: 'water',
    slot: 'passive',
    effect: 'Standing still briefly grants a Water damage buff to your next attack.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Water Attacks',
    type: 'water',
    slot: 'strike',
    effect: 'All attacks have a chance to deal bonus Water damage.',
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
    effect: 'Water damage has a chance to apply Frost, slowing enemies.',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Heavy Rain',
    type: 'water',
    slot: 'ability',
    effect: 'Water attacks create a rain effect that damages nearby enemies over time.',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Splash Damage',
    type: 'water',
    slot: 'passive',
    effect: 'Water damage splashes to nearby enemies for a portion of the damage dealt.',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Pressure Nozzle',
    type: 'water',
    slot: 'strike',
    effect: 'Water attacks deal increased damage to a single target at close range.',
    tier: 'secondary',
    requires: 'After Dealing Water Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'High Tide',
    type: 'water',
    slot: 'passive',
    effect: 'After standing still, your Water damage is greatly amplified for a short time.',
    tier: 'secondary',
    requires: 'After Still Waters',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Torrential Rain',
    type: 'water',
    slot: 'strike',
    effect: 'Torrential Strikes call down additional rain projectiles on hit.',
    tier: 'secondary',
    requires: 'After Torrential Strike',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'When It Rains',
    type: 'water',
    slot: 'passive',
    effect: 'Successive Water strikes increase in damage, stacking multiple times.',
    tier: 'secondary',
    requires: 'After Torrential Strike',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Flash Freeze',
    type: 'water',
    slot: 'ability',
    effect: 'Frosted enemies can be frozen solid, stunning them briefly.',
    tier: 'secondary',
    requires: 'After Frost',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Freeze',
    type: 'water',
    slot: 'passive',
    effect: 'Frost application is more effective, increasing slow intensity and duration.',
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
    name: 'Flame Strike',
    type: 'flame',
    slot: 'strike',
    effect: 'Your strikes deal bonus Flame damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Flame Dash',
    type: 'flame',
    slot: 'dash',
    effect: 'Your dash leaves a trail of fire that damages enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Flame Abilities',
    type: 'flame',
    slot: 'ability',
    effect: 'Your abilities deal additional Flame damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Furious Attacks',
    type: 'flame',
    slot: 'strike',
    effect: 'Attacking rapidly increases your Flame damage output.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Rage',
    type: 'flame',
    slot: 'passive',
    effect: 'Taking damage temporarily boosts your Flame damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Rapid Fire',
    type: 'flame',
    slot: 'strike',
    effect: 'Increases your attack speed, allowing faster Flame damage application.',
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
    effect: 'Repeatedly hitting the same enemy with Flame attacks deals escalating damage.',
    tier: 'secondary',
    requires: 'After Dealing Flame Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Inferno',
    type: 'flame',
    slot: 'ability',
    effect: 'Flame damage can ignite enemies, dealing burn damage over time.',
    tier: 'secondary',
    requires: 'After Dealing Flame Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Precision',
    type: 'flame',
    slot: 'passive',
    effect: 'Furious attacks gain increased critical hit chance.',
    tier: 'secondary',
    requires: 'After Furious Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Incendiary Strikes',
    type: 'flame',
    slot: 'strike',
    effect: 'Furious attacks apply a stacking burn effect on enemies.',
    tier: 'secondary',
    requires: 'After Furious Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Blazing Inferno',
    type: 'flame',
    slot: 'ability',
    effect: 'Inferno burn damage is increased and spreads to nearby enemies on kill.',
    tier: 'secondary',
    requires: 'After Inferno',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Preheated',
    type: 'flame',
    slot: 'passive',
    effect: 'Ignited enemies take more damage from all Flame sources.',
    tier: 'secondary',
    requires: 'After Inferno',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Trailblazer',
    type: 'flame',
    slot: 'dash',
    effect: 'Moving quickly leaves fire trails that deal damage to enemies.',
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
    name: 'Ooze Strike',
    type: 'ooze',
    slot: 'strike',
    effect: 'Your strikes apply Ooze to enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ooze Dash',
    type: 'ooze',
    slot: 'dash',
    effect: 'Your dash leaves a puddle of Ooze that affects enemies who touch it.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ooze Abilities',
    type: 'ooze',
    slot: 'ability',
    effect: 'Your abilities apply Ooze to enemies hit.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ooze Attack',
    type: 'ooze',
    slot: 'strike',
    effect: 'All attacks have a chance to apply Ooze on hit.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shelf Life',
    type: 'ooze',
    slot: 'passive',
    effect: 'Ooze effects last longer on affected enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Special Spice',
    type: 'ooze',
    slot: 'special',
    effect: 'Your special attack applies a large amount of Ooze.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Ooze - Secondary
  {
    name: 'Catalytic Consequence',
    type: 'ooze',
    slot: 'passive',
    effect: 'Enemies with maximum Ooze stacks take a burst of bonus damage.',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Chunky Mixture',
    type: 'ooze',
    slot: 'passive',
    effect: 'Ooze application deals direct damage in addition to the status effect.',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Goo',
    type: 'ooze',
    slot: 'passive',
    effect: 'Oozed enemies are slowed, reducing their movement and attack speed.',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: "Goo'dbye",
    type: 'ooze',
    slot: 'passive',
    effect: 'Enemies defeated while Oozed explode, spreading Ooze to nearby foes.',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Living Ingredients',
    type: 'ooze',
    slot: 'passive',
    effect: 'Oozed enemies periodically spawn small Ooze creatures that attack them.',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Potency',
    type: 'ooze',
    slot: 'passive',
    effect: 'Ooze effects deal increased damage per stack on affected enemies.',
    tier: 'secondary',
    requires: 'After Applying Ooze',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Unfortunate Odor',
    type: 'ooze',
    slot: 'passive',
    effect: 'Oozed enemies deal less damage to you.',
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
    name: 'Utrom Dash',
    type: 'utrom',
    slot: 'dash',
    effect: 'Your dash releases a pulse of Utrom energy, damaging nearby enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Strike',
    type: 'utrom',
    slot: 'strike',
    effect: 'Your strikes deal bonus Utrom damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Abilities',
    type: 'utrom',
    slot: 'ability',
    effect: 'Your abilities deal additional Utrom damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Attacks',
    type: 'utrom',
    slot: 'strike',
    effect: 'All attacks have a chance to deal bonus Utrom damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Battery',
    type: 'utrom',
    slot: 'passive',
    effect: 'Store Utrom energy from attacks, releasing it as a burst when fully charged.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Utrom - Secondary
  {
    name: 'Chain Lightning',
    type: 'utrom',
    slot: 'ability',
    effect: 'Utrom damage chains to nearby enemies, hitting additional targets.',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Charged Up',
    type: 'utrom',
    slot: 'passive',
    effect: 'Dealing Utrom damage increases your attack speed temporarily.',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Electrifying',
    type: 'utrom',
    slot: 'passive',
    effect: 'Utrom damage has a chance to stun enemies briefly.',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Utrom Relay',
    type: 'utrom',
    slot: 'passive',
    effect: 'Enemies hit by Utrom damage become relays, amplifying subsequent Utrom hits.',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Stormy Weather',
    type: 'utrom',
    slot: 'ability',
    effect: 'Utrom attacks periodically call down lightning strikes in the area.',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Techno-Organic Interface',
    type: 'utrom',
    slot: 'passive',
    effect: 'Utrom damage partially restores your health.',
    tier: 'secondary',
    requires: 'After Dealing Utrom Damage',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Alternating Current',
    type: 'utrom',
    slot: 'passive',
    effect: 'Stunned enemies take greatly increased Utrom damage.',
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
    effect: 'Gain a burst of speed and damage after defeating an enemy.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'First Strike',
    type: 'ninja',
    slot: 'strike',
    effect: 'The first hit on an undamaged enemy deals bonus damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Quick Feet',
    type: 'ninja',
    slot: 'dash',
    effect: 'Increases your movement speed and dash distance.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shinobi Supremacy',
    type: 'ninja',
    slot: 'passive',
    effect: 'Gain increased damage and defense the more powers you collect.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shuriken Attacks',
    type: 'ninja',
    slot: 'ability',
    effect: 'Your attacks periodically launch shurikens at enemies.',
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
    effect: 'After the Adrenaline buff, briefly become invisible and gain backstab damage.',
    tier: 'secondary',
    requires: 'After Adrenaline',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Heightened Senses',
    type: 'ninja',
    slot: 'passive',
    effect: 'During Adrenaline, gain increased dodge chance and critical hit rate.',
    tier: 'secondary',
    requires: 'After Adrenaline',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Quick Hands',
    type: 'ninja',
    slot: 'passive',
    effect: 'Shurikens are thrown faster and more frequently.',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shuriken Breaker',
    type: 'ninja',
    slot: 'ability',
    effect: 'Shurikens deal increased damage to armored enemies and break shields.',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shuriken Engineer',
    type: 'ninja',
    slot: 'ability',
    effect: 'Shurikens gain homing ability and increased range.',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Throwing Mastery',
    type: 'ninja',
    slot: 'passive',
    effect: 'All thrown projectiles deal significantly more damage.',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Throwing Arts: Chakram',
    type: 'ninja',
    slot: 'ability',
    effect: 'Shurikens are replaced with chakrams that pierce through multiple enemies.',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Throwing Arts: Ricochet',
    type: 'ninja',
    slot: 'ability',
    effect: 'Shurikens bounce between enemies, hitting up to 3 additional targets.',
    tier: 'secondary',
    requires: 'After Shuriken Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ninjutsu Tactics',
    type: 'ninja',
    slot: 'passive',
    effect: 'Gain bonus damage and damage reduction based on your total Ninja powers.',
    tier: 'secondary',
    requires: 'After Shinobi Supremacy',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Extended Assault',
    type: 'ninja',
    slot: 'strike',
    effect: 'Shuriken hits extend your combo window and boost combo finisher damage.',
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
    effect: 'Your attacks deal bonus Light damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shimmering Shield',
    type: 'light',
    slot: 'ability',
    effect: 'Generate a protective shield of light that absorbs incoming damage.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Light - Secondary
  {
    name: 'Ancestral Guardian',
    type: 'light',
    slot: 'ability',
    effect: 'Your shield summons an ancestral spirit that fights alongside you.',
    tier: 'secondary',
    requires: 'After Shimmering Shield',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Daybreak',
    type: 'light',
    slot: 'ability',
    effect: 'Light attacks build up energy that releases as a radiant burst, damaging all nearby enemies.',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Eternal Light',
    type: 'light',
    slot: 'passive',
    effect: 'Light damage effects last longer and fade more slowly.',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Light Embrace',
    type: 'light',
    slot: 'passive',
    effect: 'Dealing Light damage gradually restores your health.',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Radiant Warrior',
    type: 'light',
    slot: 'passive',
    effect: 'Your attack damage increases proportional to your remaining shield strength.',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Revival',
    type: 'light',
    slot: 'passive',
    effect: 'Upon taking fatal damage, revive once with a portion of your health restored.',
    tier: 'secondary',
    requires: 'After Light Attacks',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Astral Insight',
    type: 'light',
    slot: 'passive',
    effect: 'While shielded, gain the ability to see enemy weak points for bonus damage.',
    tier: 'secondary',
    requires: 'After Shimmering Shield',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Illumination',
    type: 'light',
    slot: 'ability',
    effect: 'Your shield pulses with light, dealing damage to enemies that attack you.',
    tier: 'secondary',
    requires: 'After Shimmering Shield',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Revved Up',
    type: 'light',
    slot: 'passive',
    effect: 'Daybreak bursts increase your attack speed and damage temporarily.',
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
    slot: 'passive',
    effect: 'Periodically cloak yourself in darkness, reducing damage taken.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Nightfall',
    type: 'dark',
    slot: 'ability',
    effect: 'Create an area of darkness that damages enemies within it over time.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },

  // Dark - Secondary
  {
    name: 'Call of the Void',
    type: 'dark',
    slot: 'ability',
    effect: 'Darkness pulls enemies toward its center, grouping them together.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Core Collapse',
    type: 'dark',
    slot: 'ability',
    effect: 'Darkness areas implode after a delay, dealing massive damage.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dark Attacks',
    type: 'dark',
    slot: 'strike',
    effect: 'Your attacks deal bonus Dark damage.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dark Embrace',
    type: 'dark',
    slot: 'passive',
    effect: 'While inside darkness areas, you regenerate health over time.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Dark Star',
    type: 'dark',
    slot: 'ability',
    effect: 'Darkness coalesces into a dark star that orbits you, damaging nearby enemies.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: "Dragon's Claw",
    type: 'dark',
    slot: 'strike',
    effect: 'Dark-empowered strikes hit in a wide claw pattern, dealing area damage.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Eternal Darkness',
    type: 'dark',
    slot: 'passive',
    effect: 'Darkness areas last significantly longer before dissipating.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Gift of the Dragon',
    type: 'dark',
    slot: 'passive',
    effect: 'Dark damage powers are stronger and have reduced cooldowns.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Lingering Darkness',
    type: 'dark',
    slot: 'passive',
    effect: 'Enemies leaving darkness areas remain debuffed, taking increased damage.',
    tier: 'secondary',
    requires: 'After Darkness',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Shifting Shadow',
    type: 'dark',
    slot: 'dash',
    effect: 'Dashing through darkness areas resets your dash cooldown and deals Dark damage.',
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
    effect: 'Defeating enemies has a chance to drop bonus currency.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Ascendancy',
    type: 'robotics',
    slot: 'passive',
    effect: 'Gain increased damage for each floor cleared without taking a hit.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Blade Matrix',
    type: 'robotics',
    slot: 'strike',
    effect: 'Strikes create energy blades that spin around you briefly, hitting nearby enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Challenge Seeker',
    type: 'robotics',
    slot: 'passive',
    effect: 'Gain bonus rewards and damage when fighting elite enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Compound Interest',
    type: 'robotics',
    slot: 'passive',
    effect: 'Unspent currency provides a small passive damage bonus.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Laser Strike',
    type: 'robotics',
    slot: 'strike',
    effect: 'Periodically fire a laser beam alongside your attacks.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Last Stand Protocol',
    type: 'robotics',
    slot: 'passive',
    effect: 'When at low health, gain a significant boost to damage and defense.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Overdrive',
    type: 'robotics',
    slot: 'passive',
    effect: 'After a combo finisher, enter Overdrive for increased attack speed.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Regular Customer',
    type: 'robotics',
    slot: 'passive',
    effect: 'Shop prices are reduced and you get better item selections.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Spare Bot',
    type: 'robotics',
    slot: 'ability',
    effect: 'Deploy a small bot companion that attacks nearby enemies.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Survival Matrix',
    type: 'robotics',
    slot: 'passive',
    effect: 'Gain a small amount of damage reduction that stacks with each room cleared.',
    tier: 'initial',
    requires: null,
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Wireless Charging',
    type: 'robotics',
    slot: 'passive',
    effect: 'Slowly regenerate health while not taking damage.',
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
    effect: 'Charge effects increase your movement and attack speed.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Charge Attacks',
    type: 'robotics',
    slot: 'strike',
    effect: 'Your attacks build up a Charge that releases as bonus damage at full stacks.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Empowerment',
    type: 'robotics',
    slot: 'passive',
    effect: 'At full Charge, all your damage is amplified for a short duration.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Photon Lance',
    type: 'robotics',
    slot: 'ability',
    effect: 'At full Charge, fire a powerful photon lance that pierces all enemies in a line.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Power Surge',
    type: 'robotics',
    slot: 'ability',
    effect: 'Charge release creates an energy surge that damages and pushes back enemies.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Synthetic Rush',
    type: 'robotics',
    slot: 'passive',
    effect: 'Building Charge increases your critical hit chance.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'System Calibration',
    type: 'robotics',
    slot: 'passive',
    effect: 'Charge builds faster and its bonuses are more effective.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Thunderheart',
    type: 'robotics',
    slot: 'passive',
    effect: 'At full Charge, gain a periodic lightning pulse that damages nearby enemies.',
    tier: 'secondary',
    requires: 'After Charge',
    combo: null,
    requiredPowers: null
  },
  {
    name: 'Quick Study',
    type: 'robotics',
    slot: 'passive',
    effect: 'Charge stacks grant bonus experience and power effectiveness.',
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
    slot: 'ability',
    effect: 'Water and Light combine to create healing rain that damages enemies and restores your health.',
    tier: 'secondary',
    requires: null,
    combo: ['water', 'light'],
    requiredPowers: ['Water damage power', 'Light Attacks']
  },
  {
    name: 'Dark Flame',
    type: 'legendary',
    slot: 'ability',
    effect: 'Darkness and Flame merge into shadowy fire that deals heavy damage over time and reduces enemy vision.',
    tier: 'secondary',
    requires: null,
    combo: ['dark', 'flame'],
    requiredPowers: ['Darkness power', 'Flame damage power']
  },
  {
    name: 'Finisher',
    type: 'legendary',
    slot: 'strike',
    effect: 'Execute enemies below a health threshold with a devastating shadow-infused strike.',
    tier: 'secondary',
    requires: null,
    combo: ['dark', 'ninja'],
    requiredPowers: ['Darkness power', 'Any Ninja power']
  },
  {
    name: 'Frostfire',
    type: 'legendary',
    slot: 'ability',
    effect: 'Frost and Flame combine to create an unstable reaction that freezes then detonates enemies.',
    tier: 'secondary',
    requires: null,
    combo: ['water', 'flame'],
    requiredPowers: ['Frost', 'Flame damage power']
  },
  {
    name: 'Light Hammer',
    type: 'legendary',
    slot: 'strike',
    effect: 'Utrom energy and Light converge into a massive hammer strike that stuns and damages in a wide area.',
    tier: 'secondary',
    requires: null,
    combo: ['utrom', 'light'],
    requiredPowers: ['Utrom damage power', 'Light Attacks']
  },
  {
    name: 'Revolution',
    type: 'legendary',
    slot: 'dash',
    effect: 'Combine speed and Utrom energy to dash in a circle, creating an electrified arena that damages enemies.',
    tier: 'secondary',
    requires: null,
    combo: ['ninja', 'utrom'],
    requiredPowers: ['Quick Feet', 'Utrom damage power']
  },
  {
    name: 'Secret of the Ooze',
    type: 'legendary',
    slot: 'ability',
    effect: 'Ooze and Utrom energy react violently, causing Oozed enemies to discharge electricity to all nearby foes.',
    tier: 'secondary',
    requires: null,
    combo: ['ooze', 'utrom'],
    requiredPowers: ['Ooze applicator', 'Utrom damage power']
  },
  {
    name: 'Shatter',
    type: 'legendary',
    slot: 'strike',
    effect: 'Frozen enemies hit by Utrom damage shatter, dealing massive area damage.',
    tier: 'secondary',
    requires: null,
    combo: ['water', 'utrom'],
    requiredPowers: ['Frost', 'Utrom damage power']
  },
  {
    name: 'Slippery',
    type: 'legendary',
    slot: 'dash',
    effect: 'Combine Adrenaline speed with Ooze to become untouchable, leaving damaging trails and dodging attacks.',
    tier: 'secondary',
    requires: null,
    combo: ['ninja', 'ooze'],
    requiredPowers: ['Adrenaline', 'Ooze applicator']
  },
  {
    name: 'Solution to Pollution',
    type: 'legendary',
    slot: 'ability',
    effect: 'Potent Ooze dissolves in Water, creating a toxic wave that deals heavy damage across a wide area.',
    tier: 'secondary',
    requires: null,
    combo: ['ooze', 'water'],
    requiredPowers: ['Potency', 'Water damage power']
  },
  {
    name: 'Spontaneous Combustion',
    type: 'legendary',
    slot: 'ability',
    effect: 'Oozed enemies ignite, causing them to explode and spread fire to nearby foes.',
    tier: 'secondary',
    requires: null,
    combo: ['ooze', 'flame'],
    requiredPowers: ['Ooze applicator', 'Flame damage power']
  },
  {
    name: 'Tempered Shuriken',
    type: 'legendary',
    slot: 'ability',
    effect: 'Shurikens are forged in flame, dealing fire damage on impact and igniting enemies.',
    tier: 'secondary',
    requires: null,
    combo: ['ninja', 'flame'],
    requiredPowers: ['Shuriken Attacks', 'Furious Attacks']
  },
  {
    name: 'Critical Flow',
    type: 'legendary',
    slot: 'passive',
    effect: 'Charge and Flame synergize so that critical hits from Charge release fire explosions.',
    tier: 'secondary',
    requires: null,
    combo: ['robotics', 'flame'],
    requiredPowers: ['Charge power', 'Flame damage power']
  },
  {
    name: 'Cascade Drive',
    type: 'legendary',
    slot: 'ability',
    effect: 'Charge releases trigger cascading water waves that damage and push back enemies.',
    tier: 'secondary',
    requires: null,
    combo: ['robotics', 'water'],
    requiredPowers: ['Charge power', 'Water damage power']
  },
  {
    name: 'Shocking',
    type: 'legendary',
    slot: 'ability',
    effect: 'Robotics and Utrom energy combine to create a persistent electrical field that shocks all nearby enemies.',
    tier: 'secondary',
    requires: null,
    combo: ['robotics', 'utrom'],
    requiredPowers: ['Robotics power', 'Utrom power']
  }
];
