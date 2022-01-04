import { adaptColors } from './lib.js';
import test from 'ava';

test('1) Adapts colours as expected (green/yellow) for 4.5', t => {
    const contrastLevel = 4.5;
    const color2 = '#5EBA7D'; // greenish, dark
    const color1 = '#FDF7E2'; // yellowish, light
    const res = adaptColors(color1, color2, contrastLevel);
    t.is(res.contrast, contrastLevel);
    t.is(res.original.color1, color1);
});

test('2) Adapts colours for contrast of 3', t => {
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

test('3) No adaptation is need if black and white', t => {
    const contrastLevel = 4.5;
    const color5 = '#ffffff';
    const color6 = '#000000';
    const res = adaptColors(color5, color6, contrastLevel);
    t.truthy(res);
    t.truthy(res.original.color1);
    t.truthy(res.original.color2);
    t.is(res.contrast, 21);
    t.falsy(res.adapted);
});

test('4) Same color twice should yield a contrast', t => {
    const color1 = '#ffffff';
    const color2 = '#ffffff';
    const res = adaptColors(color1, color2);
    t.truthy(res);
    t.truthy(res.original.color1);
    t.truthy(res.original.color2);
    t.is(res.contrast, 4.5);
    t.truthy(res.adapted);
    t.truthy(res.adapted.color1);
    t.truthy(res.adapted.color2);
    t.is(res.operation, "subtract");
    t.is(res.iterations, 136);
})

test('5) Problematic color combination', t => {
    const color1 = '#ad5a5a';
    const color2 = '#de0d0d';
    const res = adaptColors(color1, color2, 4.5);
    t.truthy(res);
})

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
