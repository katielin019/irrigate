<script>
    import { onMount } from 'svelte';
    import Grid from "./lib/Grid.svelte";
    import { levelData, SHAPES, CARDINALS, CONNECTED } from "./lib/data.js";
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
        floodFill();
    };

    const handshake = (sourceIdx, neighborIdx, dir) => {
        const source = grid[sourceIdx];
        const neighbor = grid[neighborIdx];

        // Does the source have an opening facing dir?
        const hasExit = (source.mask & CARDINALS[dir]) !== 0;

        // Does the neighbor have an opening in the opposite direction?
        const oppositeDir = CONNECTED[dir];
        const hasEntrance = (neighbor.mask & CARDINALS[oppositeDir]) !== 0;

        return hasExit && hasEntrance;
    }

    function floodFill() {
        console.log("Running flood fill");
        // reset fill status for all cells except source
        grid.forEach((cell, i) => {
            cell.filled = (i === SOURCE);
        });

        const q = new Queue();
        q.enqueue(SOURCE);

        const visited = new Set();
        visited.add(SOURCE);

        while (!q.isEmpty()) {
            const currIdx = q.dequeue();

            const adjMap = getAdjCells(grid, COLS, currIdx);

            for (const [dir, neighborIdx] of adjMap) {
                if (visited.has(neighborIdx)) continue;

                if (handshake(currIdx, neighborIdx, dir)) {
                    grid[neighborIdx].filled = true;
                    visited.add(neighborIdx);
                    q.enqueue(neighborIdx);
                }
            }
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