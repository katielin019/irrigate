<script>
    let { data, onClick = () => { console.log("No event callback passed"); } } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
 <div class="cell {data.portalIndex ? 'portal' : ''}"
    id="cell-{data.x}-{data.y}"
    onclick={onClick}>
    <div class="tile-content"
        style="transform: rotate({data.rotation}deg);">
        {data.type} / {data.shape}
    </div>
</div>

<!-- using portalIndex (and relative dimensions?), can calculate what side the portal is on (fixed! doesn't rotate with the tile) -->

<style>
    .cell {
        aspect-ratio: 1;
        border: 1px solid blue;
        display: flex;
        justify-content: space-around;
		align-items: center;
        cursor: pointer;
        padding: 1.5rem;
    }

    .portal {
        background: purple;
    }
    
    .tile-content {
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: white;
	}
</style>