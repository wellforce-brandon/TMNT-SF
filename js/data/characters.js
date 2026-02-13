// TMNT: Splintered Fate - Character Data
// 6 playable characters with base stats and default tools

export const characters = [
  {
    id: 'michelangelo',
    name: 'Michelangelo',
    theme: 'michelangelo',
    health: 110,
    maxHealth: 385,
    attackDamage: 18,
    dashAttack: 12,
    specialAttack: 40,
    specialChargeRate: 1.0,
    defaultTool: 'Taunt',
    inspirations: ['Michelangelo Inspiration 1', 'Michelangelo Inspiration 2']
  },
  {
    id: 'leonardo',
    name: 'Leonardo',
    theme: 'leonardo',
    health: 100,
    maxHealth: 350,
    attackDamage: 20,
    dashAttack: 14,
    specialAttack: 45,
    specialChargeRate: 1.0,
    defaultTool: 'Shuriken',
    inspirations: ['Leonardo Inspiration 1', 'Leonardo Inspiration 2']
  },
  {
    id: 'raphael',
    name: 'Raphael',
    theme: 'raphael',
    health: 120,
    maxHealth: 420,
    attackDamage: 24,
    dashAttack: 16,
    specialAttack: 50,
    specialChargeRate: 0.9,
    defaultTool: 'Turtle Line',
    inspirations: ['Raphael Inspiration 1', 'Raphael Inspiration 2']
  },
  {
    id: 'donatello',
    name: 'Donatello',
    theme: 'donatello',
    health: 140,
    maxHealth: 490,
    attackDamage: 16,
    dashAttack: 10,
    specialAttack: 55,
    specialChargeRate: 1.1,
    defaultTool: 'Hardened Shell',
    inspirations: ['Donatello Inspiration 1', 'Donatello Inspiration 2']
  },
  {
    id: 'casey',
    name: 'Casey',
    theme: 'casey-jones',
    health: 100,
    maxHealth: 350,
    attackDamage: 22,
    dashAttack: 15,
    specialAttack: 42,
    specialChargeRate: 1.0,
    defaultTool: 'The Juice',
    inspirations: ['Casey Jones Inspiration 1', 'Casey Jones Inspiration 2']
  },
  {
    id: 'metalhead',
    name: 'Metalhead',
    theme: 'metalhead',
    health: 80,
    maxHealth: 280,
    attackDamage: 26,
    dashAttack: 18,
    specialAttack: 60,
    specialChargeRate: 0.8,
    defaultTool: 'Landmines',
    inspirations: ['Metalhead Inspiration 1', 'Metalhead Inspiration 2']
  }
];

// Theme mapping for character selection (dark/light variants)
export const characterThemeMap = {
  michelangelo: { dark: 'michelangelo-dark', light: 'michelangelo' },
  leonardo:     { dark: 'leonardo-dark',     light: 'leonardo' },
  raphael:      { dark: 'raphael',           light: 'raphael-light' },
  donatello:    { dark: 'donatello',         light: 'donatello-light' },
  casey:        { dark: 'casey-jones',       light: 'casey-jones-light' },
  metalhead:    { dark: 'metalhead',         light: 'metalhead-light' }
};
