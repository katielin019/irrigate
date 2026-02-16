<script>
    import Cell from "./Cell.svelte";

    let { cells = [], width, onCellClick } = $props();
</script>

<div id="grid" style="grid-template-columns: repeat({width}, 1fr);">
    {#each cells as cell, i}
        <Cell data={cell} onClick={() => onCellClick(i)} />
    {/each}
</div>

<style>
    #grid {
        display: grid;
        width: min(85vh, 90vw);
        column-gap: 8px;
        row-gap: 8px;
    }
</style>