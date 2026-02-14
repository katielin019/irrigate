<script>
    let { rotation = 0, waterColor = "#0288D1"} = $props();
</script>

<svg viewBox="0 0 100 100"
    style="transform: rotate({rotation}deg); transition: transform 0.3s;"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" fill="white" />
    <circle cx="50" cy="50" r="30" fill={waterColor} />
</svg>

<style>
    svg {
        z-index: 100;
    }
</style>