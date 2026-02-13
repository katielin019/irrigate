<script>
    import Grid from "./Grid.svelte";
    import { levelData, SHAPES } from "./data.js";

    const ROWS = levelData.rows;
    const COLS = levelData.cols;

    let grid = $state(Array.from({ length: ROWS * COLS }, (_, i) => ({
        x: Math.floor(i / COLS),
        y: i % COLS,
        rotation: 0,
        type: levelData.layout[i],
        shape: SHAPES[levelData.layout[i]],
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
    :global(body) {
        margin: 0;
        background: #1a1a1a;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }

    #app {
        padding: 2rem;
    }
</style>
