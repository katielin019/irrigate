import { CARDINALS, SHIFT } from "./data.js";

export const rotateDeg = (deg) => deg + 90;

export const rotateMask = (mask) => {
    // Shift bits: N->E, E->S, S->W, W->N
    // (mask << 1) performs the shift, then we wrap the 5th bit back to the 1st
    let rotated = (mask << 1);
    return (rotated & 16) ? (rotated % 16) | 1 : rotated;
}

export const getAdjCells = (grid, width, idx) => {
    const adj = new Map();
    const row = Math.floor(idx / width);
    const col = idx % width;
    const totalRows = grid.length / width;

    for (const [dir, bit] of Object.entries(CARDINALS)) {
        if ((grid[idx].mask & bit) !== 0) {
            const [dr, dc] = SHIFT[dir];
            const nr = row + dr;
            const nc = col + dc;

            if (nr >= 0 && nr < totalRows && nc >= 0 && nc < width) {
                const neighborIdx = nr * width + nc;
                adj.set(dir, neighborIdx);
            }
        }
    }
    return adj;
}