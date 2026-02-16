<script>
    import { onMount } from 'svelte';
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

    const compare = (source, neighbor) => {
        return (grid[source].mask & grid[neighbor].mask) !== 0;
    }

    function floodFill() {
        console.log("Running flood fill");
        // q contains ORIGIN cells; we visit neighbors
        const q = new Queue();
        q.enqueue(SOURCE);
        // const visited = new Set();

        function fill(cell, origin) {
            // compare cell and origin
            // make sure cell isn't already filled??? (maybe add this as a later optimization)
            const shouldFill = compare(origin, cell);
            if (shouldFill) {
                // visited.add(cell);
                grid[cell].filled = true;
                console.log(`Filling cell at index ${cell}`);
            } else {
                console.log(`Skipping cell at index ${cell}`);
            }
            return shouldFill;
        }

        while (!q.isEmpty()) {
            // get next queue item
            const curr = q.dequeue();
            if (!grid[curr].filled) break;

            // don't check neighbors if the current cell isn't filled?
            const adjacent = neighbors(curr);

            // loop through adjacent cells; if any of them get filled, we add that cell to our queue
            adjacent.forEach((neighbor) => {
                if (fill(neighbor, curr)) {
                    q.enqueue(neighbor);
                }
            });
        }

        function neighbors(cell) {
            return getAdjCells(grid, COLS, cell);
        }
    }

    onMount(() => {
        floodFill();
    });
</script>

<div id="app">
    <Grid cells={grid} width={COLS} onCellClick={rotate} />
</div>

<style>
    :global(svg) {
        max-width: 400px;
        display: block;
    }

    #app {
        width: 100%;
    }
</style>