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

        // q contains ORIGIN cells; we visit neighbors
        const q = new Queue();
        q.enqueue(SOURCE);
        // const visited = new Set();

        const visited = new Set();
        visited.add(SOURCE);

        // function fill(cell, origin) {
        //     // compare cell and origin
        //     // make sure cell isn't already filled??? (maybe add this as a later optimization)
        //     const shouldFill = handshake(origin, cell);
        //     if (shouldFill) {
        //         // visited.add(cell);
        //         grid[cell].filled = true;
        //         console.log(`Filling cell at index ${cell}`);
        //     } else {
        //         console.log(`Skipping cell at index ${cell}`);
        //     }
        //     return shouldFill;
        // }

        while (!q.isEmpty()) {
            // get next queue item
            const currIdx = q.dequeue();
            // if (!grid[curr].filled) break;

            // don't check neighbors if the current cell isn't filled?
            const adjMap = neighbors(currIdx);

            // // loop through adjacent cells; if any of them get filled, we add that cell to our queue
            // adjacent.forEach((neighbor) => {
            //     if (fill(neighbor, curr)) {
            //         q.enqueue(neighbor);
            //     }
            // });

            for (const [dir, neighborIdx] of adjMap) {
                if (visited.has(neighborIdx)) continue;

                if (handshake(currIdx, neighborIdx, dir)) {
                    grid[neighborIdx].filled = true;
                    visited.add(neighborIdx);
                    q.enqueue(neighborIdx);
                }
            }
        }

        function neighbors(cellIdx) {
            return getAdjCells(grid, COLS, cellIdx);
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