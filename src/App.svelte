<script>
    import Grid from "./Grid.svelte";
    import { levelData } from "./data.js";

    const ROWS = 7;
    const COLS = 7;

    let grid = $state(Array.from({ length: ROWS * COLS }, (_, i) => ({
        x: Math.floor(i / COLS),
        y: i % COLS,
        rotation: 0,
        type: levelData.layout[i],
        portalIndex: levelData.portals[i] ?? null,
    })));

    const rotate = (idx) => {
        grid[idx].rotation += 90;
    };
</script>

<div id="app">
    <Grid cells={grid} width={COLS} onCellClick={rotate} />
</div>

<style>
    :global(body) {
        margin: 0;
        background: #1a1a1a;
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1.5rem;
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
