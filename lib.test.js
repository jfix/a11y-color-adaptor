import { adaptColors } from './lib.js';
import test from 'ava';

test('Adapts colours as expected (green/yellow) for 4.5', t => {
    const contrastLevel = 4.5;
    const color2 = '#5EBA7D'; // greenish, dark
    const color1 = '#FDF7E2'; // yellowish, light
    const res = adaptColors(color1, color2, contrastLevel);
    t.is(res.contrast, contrastLevel);
    t.is(res.original.color1, color1);
});

test('Adapts colours for contrast of 3', t => {
    const contrastLevel = 3;
    const color1 = '#3b3735' // grayish
    const color2 = '#000000' // black
    const res = adaptColors(color1, color2, contrastLevel);
    t.is(res.contrast, contrastLevel);
    t.is(res.original.color1, color1.toUpperCase());
    t.is(res.original.color2, color2.toUpperCase());
    t.assert(res.step);
    t.true(res.iterations > 1);
    t.is(res.operation, 'add');
});

test('No adaptation is need if black and white', t => {
    const contrastLevel = 4.5;
    const color5 = '#ffffff';
    const color6 = '#000000';
    const res = adaptColors(color5, color6, contrastLevel);
    t.truthy(res);
    t.truthy(res.original.color1);
    t.truthy(res.original.color2);
    t.is(res.contrast, 21);
    t.falsy(res.adapted);
    // console.log(JSON.stringify(res, null, 2));
    console.log(`PROC ENV: ${(process.env.NODE_ENV)}`)
});
/*
{
  "original": {
    "color1": "#FDF7E2",
    "color2": "#5EBA7D"
  },
  "adapted": {
    "color1": "#FDF7E2",
    "color2": "#268245"
  },
  "operation": "subtract",
  "iterations": 56,
  "contrast": 4.5,
  "step": 1
}
*/

// const color7 = '#ffffff'
// const color8 = '#ffffff'
// adaptColors(color7, color8, contrastLevel);

// const color9 = '#ad5a5a';
// const color0 = '#de0d0d';
