<script>
    let { data, onClick = () => { console.log("No event callback passed"); } } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
 <div class="cell"
    id="cell-{data.x}-{data.y}"
    onclick={onClick}>
    <div class="tile-content"
        style="transform: rotate({data.rotation}deg);">
        L
    </div>
</div>

<style>
    .cell {
        aspect-ratio: 1;
        border: 1px solid blue;
        display: flex;
        justify-content: space-around;
		align-items: center;
        cursor: pointer;
        padding: 1rem;
    }
    
    .tile-content {
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: white;
	}
</style>