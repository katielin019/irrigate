<script>
    import Grid from "./lib/Grid.svelte";
    import { levelData, SHAPES } from "./lib/data.js";

    const ROWS = levelData.rows;
    const COLS = levelData.cols;

    let grid = $state(Array.from({ length: ROWS * COLS }, (_, i) => ({
        x: Math.floor(i / COLS),
        y: i % COLS,
        type: levelData.layout[i],
        rotation: levelData.initialRotation[i],
        shape: SHAPES[levelData.layout[i]],
        filled: levelData.layout[i] === "O" ? true : false,
        portalIndex: levelData.portals[i] ?? null,
    })));

    const rotate = (idx) => {
        grid[idx].rotation += 90;
        grid[idx].shape = rotateMask(grid[idx].shape);
    };

    const rotateMask = (mask) => {
        // Shift bits: N->E, E->S, S->W, W->N
        // (mask << 1) performs the shift, then we wrap the 5th bit back to the 1st
        let rotated = (mask << 1);
        if (rotated & 16) rotated = (rotated % 16) + 1;
        return rotated;
    }
</script>

<div id="app">
    <Grid cells={grid} width={COLS} onCellClick={rotate} />
</div>

<style>
    :global(svg) {
        max-width: 400px;
        display: block;
    }
</style>