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

    function floodFill() {
        const q = new Queue();
        const visited = new Set();

        function fill(cell, origin) {
            // compare cell and origin
            const shouldFill = true;
            if (shouldFill) {
                visited.add(cell);
                grid[idx].filled = true;
            }
            return shouldFill;
        }

        q.enqueue(SOURCE);

        while (!q.isEmpty()) {
            // get next queue item
            const origin = q.dequeue();
            visited.add(origin);

            q.enqueue(neighbors(origin));
            const curr = q.dequeue();

            if (fill(curr, origin)) q.enqueue(neighbors(curr));
        }

        function neighbors(cell) {
            return getAdjCells(grid, COLS, cell);
        }
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