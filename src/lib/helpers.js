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
    // return an array of boolean values: [north, east, south, west]
    return [
        r - 1 >= 0,
        c + 1 < width,
        r + 1 < nRows,
        c - 1 >= 0
    ];
}

const getAdjCells = (grid, width, idx) => {
    const adj = [];
    const [row, col] = getPosition(width, idx);
    const inBounds = checkBounds(grid, width, [row, col]);
    if (inBounds[0]) adj.push([row - 1, col]);
    if (inBounds[1]) adj.push([row, col + 1]);
    if (inBounds[2]) adj.push([row + 1, col]);
    if (inBounds[3]) adj.push([row, col - 1]);
    // returns an array of adjacent cell indices
    // (contains 2-4 values since some cells have fewer adjacent cells)
    return adj.map((pos) => getIdx(width, pos));
}

export { rotateDeg, rotateMask, getAdjCells };