import { adaptColors } from './lib.js';
import meow from 'meow';
const cli = meow(`
	Usage
	  $ adapt-colors <color1> <color2> [contrast]

	Examples
	  $ adapt-colors "#ad5a5a" "#de0d0d" 3
`, {
	importMeta: import.meta,
});
console.log(cli.input);
const knownContrasts = [3, 4.5];
const color1 = cli.input[0] || cli.showHelp();
const color2 = cli.input[1] || cli.showHelp();
const contrastLevel = knownContrasts.includes(parseFloat(cli.input[2])) ? parseFloat(cli.input[2]) : 4.5;
adaptColors(color1, color2, contrastLevel);
