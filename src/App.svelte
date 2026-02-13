<script>
    import { onMount } from "svelte";

    const ROWS = 7;
    const COLS = 7;
    let grid = [];

    const initGrid = () => {
        let tmp = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                tmp.push({
                    id: `cell-${r}-${c}`,
                    r, c,
                    type: (r === 0 && c === 0) ? 'source' : 'path',
                    rotation: 0,
                });
            }
        }
        grid = tmp;
    }

    const handleRotate = (idx) => {
        grid[idx].rotation = grid[idx].rotation + 90;
        grid = grid;

        console.log(`Rotated cell at index ${idx} to ${grid[idx].rotation}deg`);
    }

    onMount(initGrid);
</script>

<main>
    <div class="grid" style="grid-template-columns: repeat({COLS}, 60px);">
        {#each grid as cell, i (cell.id)}
            <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
            <div
                class="cell {cell.type}"
                id={cell.id}
                role="button"
                tabindex="0"
                aria-label="Grid cell"
                on:click={() => handleRotate(i)}
            >
                <div class="tile-content" style="transform: rotate({cell.rotation}deg)">
                    {#if cell.type === 'source'} 🌊 {:else} ┓ {/if}
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    :global(body) {
    background: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .grid {
    display: grid;
    gap: 4px;
    padding: 10px;
    background: #333;
    border-radius: 8px;
  }

  .cell {
    width: 60px;
    height: 60px;
    background: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .cell:hover { background: #555; }
  .source { background: #2980b9; }

  .tile-content {
    font-size: 24px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>