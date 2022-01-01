import Color from 'color';
import chalk from 'chalk';
const log = console.log;

const getSmallerColor = (c1, c2) => {
    c1 = c1.startsWith('#') ? c1.substring(1) : c1
    c2 = c2.startsWith('#') ? c2.substring(1) : c2
    return parseInt(c1, 16) > parseInt(c2, 16) 
        ? `#${c2}`
        : `#${c1}`;
};
const hexSubtract = (c1, c2) => {
    c1 = c1.startsWith('#') ? c1.substring(1) : c1
    c2 = c2.startsWith('#') ? c2.substring(1) : c2
    return `#${(parseInt(c1, 16) - parseInt(c2, 16)).toString(16).toUpperCase().padStart(6, '0')}`;
}
const rgbAdd = (rgb, value) => {
    try {
        
        return {
            r: rgb.r + value,
            g: rgb.g + value,
            b: rgb.b + value
        }
    } catch(e) {
        throw Error(e);
    }
};

const rgbSubtract = (rgb, value) => {
    try {
        if (rgb.r - value <= 0 || rgb.g - value <= 0 || rgb.b - value <= 0) {
            throw Error(`Minimal value found, cannot subtract further: ${JSON.stringify(rgb)}`)
        }
        return {
            r: rgb.r - value,
            g: rgb.g - value,
            b: rgb.b - value
        }
    } catch(e) {
        throw e;
    }
};

/**
 * 
 * c1 > c2  => 1
 * c1 < c2  => -1
 * c1 == c2 => 0
 */
 const hexCompare = (c1, c2) => {
    c1 = c1.startsWith('#') ? c1.substring(1) : c1
    c2 = c2.startsWith('#') ? c2.substring(1) : c2
    const p1 = parseInt(c1, 16)
    const p2 = parseInt(c2, 16)
    if (p1 == p2) return 0
    return p1 > p2 ? 1 : -1
}

// select color to change - select the one that is furthest from white or black
const selectColorToChange = (color1, color2) => {
    const darkerColor = Color(getSmallerColor(color1.hex(), color2.hex()));
    const lighterColor = color1.hex() == darkerColor.hex() ? color2 : color1;
    const distanceFromBlack = darkerColor.hex();
    const distanceFromWhite = hexSubtract('#ffffff', lighterColor.hex());

    const colorToChange = (hexCompare(distanceFromBlack, distanceFromWhite) > 0)
        ? darkerColor
        : lighterColor

    return {
        colorToChange,
        otherColor: colorToChange.hex() == darkerColor.hex() ? lighterColor : darkerColor,
        operation: (hexCompare(distanceFromBlack, distanceFromWhite) > 0) ? 'subtract' : 'add'
    }
};


const colorLog = (i, bg, fg, contrast) => {
    log(
        chalk.bgHex(bg).hex(fg)
            .visible(`${i.toString().padStart(3, '0')} contrast: ${contrast} colorToChange before: ${bg}`)
    );
};

// constants used
const contrastNormal = 4.5;
const contrastBig = 3;
const knownContrasts = [contrastNormal, contrastBig];
const step = 1;

////////////////////////////////////////////////
const adaptColors = (c1, c2, contrastLevel) => {
    const color1 = Color(c1);
    const color2 = Color(c2);

    log(`\n`);

    if (!contrastLevel) contrastLevel = contrastNormal;
    if (!(knownContrasts.includes(contrastLevel))) contrastLevel = contrastNormal;

    // check contrast is not already sufficient
    let contrast = color1.contrast(color2).toFixed(1);
    if (contrast >= contrastLevel) 
    {
        log(`no need to adapt as contrast is ${contrast}`);
        return {
            original: { color1: color1.hex(), color2: color2.hex() },
        }
    }

    // decide which color to change
    let { colorToChange, otherColor, operation } = selectColorToChange(color1, color2);

    // change colors to achieve sufficient contrast
    let iteration = 0;
    colorLog(iteration, colorToChange.hex(), otherColor.hex(), contrast);
    while (contrast < contrastLevel) {
        colorToChange = operation == 'subtract'
            ? Color(rgbSubtract(colorToChange.object(), step))
            : Color(rgbAdd(colorToChange.object(), step));
        contrast = colorToChange.contrast(otherColor).toFixed(1);
        if (iteration > 255) throw Error(`Too many iterations`);
        iteration++;
        colorLog(iteration, colorToChange.hex(), otherColor.hex(), contrast);
    }
    colorLog(iteration, colorToChange.hex(), otherColor.hex(), contrast);

    // prepare result object
    const adapted = { color1: color1.hex(), color2: color2.hex() };
    if (color1.hex() == otherColor.hex()) {
        adapted.color2 = colorToChange.hex();
    } else {
        adapted.color1 = colorToChange.hex();
    }

    return {
        original: {
            color1: color1.hex(),
            color2: color2.hex()
        },
        adapted
    }
};

export {
    adaptColors
};
