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
    inspirations: ['Mikey Inspiration 1', 'Mikey Inspiration 2']
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
    inspirations: ['Leo Inspiration 1', 'Leo Inspiration 2']
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
    inspirations: ['Raph Inspiration 1', 'Raph Inspiration 2']
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
    inspirations: ['Donnie Inspiration 1', 'Donnie Inspiration 2']
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
    inspirations: ['Casey Inspiration 1', 'Casey Inspiration 2']
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

// Theme mapping for character selection
export const characterThemeMap = {
  michelangelo: 'michelangelo',
  leonardo: 'leonardo',
  raphael: 'raphael',
  donatello: 'donatello',
  casey: 'casey-jones',
  metalhead: 'metalhead'
};
