import { adaptColors } from './lib.js';

const contrastLevel = 4.5;
const color2 = '#5EBA7D'; // greenish, dark
const color1 = '#FDF7E2'; // yellowish, light
const res = adaptColors(color1, color2, contrastLevel);
