<script>
    // import Source from "./tiles/Source.svelte";
    let { data, onClick = () => { console.log("No event callback passed"); } } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
 <div class="cell {data.portalIndex ? 'portal' : ''}"
    class:source={data.type === "O"}
    class:filled={data.filled}
    data-shape="{data.shape}"
    id="cell-{data.x}-{data.y}"
    onclick={onClick}
    style="transform: rotate({data.rotation}deg);">
    <div class="tile-content">
        <!-- {data.type}{data.shape} -->
    </div>
</div>

<!-- using portalIndex (and relative dimensions?), can calculate what side the portal is on (fixed! doesn't rotate with the tile) -->

<style>
    .cell {
        --bw: 8px;
        aspect-ratio: 1;
        border: var(--bw) solid black;
        display: flex;
        justify-content: space-around;
		align-items: center;
        cursor: pointer;
        padding: 1.5rem;
        transition: border 0.3s;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cell:not(.filled) {
        background: rgba(150, 75, 0, 0.95);
        /* color: white; */
    }

    .filled {
        background: dodgerblue;
        color: black;
    }

    .cell[data-shape="1"] { border-top: 0; }
    .cell[data-shape="2"] { border-right: 0; }
    .cell[data-shape="4"] { border-bottom: 0; }
    .cell[data-shape="8"] { border-left: 0; }

    .cell[data-shape="3"] {
        border-top: 0;
        border-right: 0;
    }

    .cell[data-shape="5"] {
        border-top: 0;
        border-bottom: 0;
    }

    .cell[data-shape="6"] {
        border-right: 0;
        border-bottom: 0;
    }

    .cell[data-shape="7"] {
        border-width: 0;
        border-left-width: var(--bw);
    }

    .cell[data-shape="9"] {
        border-top: 0;
        border-left: 0;
    }

    .cell[data-shape="10"] {
        border-right: 0;
        border-left: 0;
    }

    .cell[data-shape="11"] {
        border-width: 0;
        border-bottom-width: var(--bw);
    }

    .cell[data-shape="12"] {
        border-bottom: 0;
        border-left: 0;
    }

    .cell[data-shape="13"] {
        border-width: 0;
        border-right-width: var(--bw);
    }

    .cell[data-shape="14"] {
        border-width: 0;
        border-top-width: var(--bw);
    }

    .cell[data-shape="15"] {
        border-width: 0;
    }

    /* .portal {
        background: purple;
    } */
    
    .tile-content {
		/* transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); */
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
		align-items: center;
	}
</style>