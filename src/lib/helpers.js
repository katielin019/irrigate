import { CARDINALS, SHIFT } from "./data.js";

const rotateDeg = (deg) => deg + 90;

const rotateMask = (mask) => {
    // Shift bits: N->E, E->S, S->W, W->N
    // (mask << 1) performs the shift, then we wrap the 5th bit back to the 1st
    let rotated = (mask << 1);
    // if (rotated & 16) rotated = (rotated % 16) + 1;
    return (rotated & 16) ? (rotated % 16) | 1 : rotated;
}


const checkBounds = (grid, width, pos) => {
    const bounds = new Map();
    const nRows = grid.length / width;
    const [r, c] = pos;
    bounds.set("North", (r - 1 >= 0));
    bounds.set("East", (c + 1 < width));
    bounds.set("South", (r + 1 < nRows));
    bounds.set("West", (c - 1 >= 0));
    return bounds;
}

const getAdjCells = (grid, width, idx) => {
    const adj = new Map();
    const [row, col] = getPosition(width, idx);
    const inBounds = checkBounds(grid, width, [row, col]);
    const openChannels = decodeMask(grid[idx].mask);

    for (const key in CARDINALS) {
        if (openChannels.get(key) && inBounds.get(key)) {
            const [deltaR, deltaC] = SHIFT.get(key);
            const pos = [row + deltaR, col + deltaC];
            adj.set(key, getIdx(width, pos));
        }
    }
    return adj;
}

export { rotateDeg, rotateMask, getAdjCells };