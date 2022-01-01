import { adaptColors } from './lib.js';

const contrastLevel = 4.5;
const color2 = '#5EBA7D'; // greenish, dark
const color1 = '#FDF7E2'; // yellowish, light
adaptColors(color1, color2, contrastLevel);

const color3 = '#3b3735' // grayish
const color4 = '#000000' // black
adaptColors(color3, color4, contrastLevel);

const color5 = '#ffffff'
const color6 = '#000000'
adaptColors(color5, color6, contrastLevel);

const color7 = '#ffffff'
const color8 = '#ffffff'
adaptColors(color7, color8, contrastLevel);

const color9 = '#ad5a5a';
const color0 = '#de0d0d';
adaptColors(color9, color0, contrastLevel);
