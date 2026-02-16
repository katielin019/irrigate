<script>
    import Grid from "./lib/Grid.svelte";
    import { levelData, SHAPES } from "./lib/data.js";
    import { rotateDeg, rotateMask, getAdjCells } from "./lib/helpers.js";
    import Queue from "./lib/queue";

    const ROWS = levelData.rows;
    const COLS = levelData.cols;
    const SOURCE = levelData.origin;

    let grid = $state(Array.from({ length: ROWS * COLS }, (_, i) => ({
        x: Math.floor(i / COLS),
        y: i % COLS,
        type: levelData.layout[i],
        rotation: 0,
        shape: SHAPES[levelData.layout[i]],
        mask: SHAPES[levelData.layout[i]],
        filled: levelData.layout[i] === "O" ? true : false,
        portalIndex: levelData.portals[i] ?? null,
    })));

    const rotate = (idx) => {
        grid[idx].rotation = rotateDeg(grid[idx].rotation);
        grid[idx].mask = rotateMask(grid[idx].mask);
    };

    const fill = () => {
        // start from source (origin), move outwards with bfs
        // getAdjCells takes grid, width, idx as args
        const neighbors = getAdjCells(grid, COLS, SOURCE);
        const q = new Queue();
        const visited = new Set();
        neighbors.forEach((curr) => {
            // check if curr's mask algns w/ source's mask
        });
    }

    const fillHelper = (curr, source) => {
        // see if we should fill the curr cell
        // if we do fill it, modify state accordingly
        // and return true so the main function knows to queue it

    }

    const otherFillHelper = (source, queue, visited) => {
        // get neighbors
        // loop through neighbors to see if masks align
        // don't visit if in visited set
        // return updated visited set and queue (should i just make a function and nest these items?)
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