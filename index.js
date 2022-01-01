import { adaptColors } from './lib.js';

const contrastLevel = 4;
const color2 = '#5EBA7D'; // greenish, dark
const color1 = '#FDF7E2'; // yellowish, light

const res = adaptColors(color1, color2, contrastLevel);

console.log(`RES: ${JSON.stringify(res, null, 2)}`);
