import { CARDINALS, SHIFT } from "./data.js";

const rotateDeg = (deg) => {
    const rotated = deg + 90;
    return rotated;
}

const rotateMask = (mask) => {
    // Shift bits: N->E, E->S, S->W, W->N
    // (mask << 1) performs the shift, then we wrap the 5th bit back to the 1st
    let rotated = (mask << 1);
    if (rotated & 16) rotated = (rotated % 16) + 1;
    return rotated;
}

const getIdx = (width, pos) => {
    const [row, col] = pos;
    return row * width + col;
}

const getPosition = (width, idx) => {
    return [Math.floor(idx / width), idx % width];
}

const checkBounds = (grid, width, pos) => {
    const nRows = grid.length / width;
    const [r, c] = pos;
    return {
        "North": r - 1 >= 0,
        "East":  c + 1 < width,
        "South": r + 1 < nRows,
        "West": c - 1 >= 0
    };
}

// N = 1; E = 2; S = 4; W = 8;
const decodeMask = (bitmask) => {
    const directions = new Map();
    for (const [dir, value] of Object.entries(CARDINALS)) {
        directions.set(dir,
            ((bitmask & value) === value)
        );
    }
    return directions;
}

const getAdjCells = (grid, width, idx) => {
    const adj = [];
    const [row, col] = getPosition(width, idx);
    const inBounds = checkBounds(grid, width, [row, col]);
    const openChannels = decodeMask(grid[idx].mask);

    for (const key in CARDINALS) {
        if (openChannels.get(key) && inBounds.get(key)) {
            const [deltaR, deltaC] = SHIFT.get(key);
            adj.push([row + deltaR, col + deltaC]);
        }
    }

    // returns an array of adjacent cell indices
    // (contains 2-4 values since some cells have fewer adjacent cells)
    return adj.map((pos) => getIdx(width, pos));
}

export { rotateDeg, rotateMask, getAdjCells };