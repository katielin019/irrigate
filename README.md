# garden-game

working on a game prototype

- using anime.js for flood fill animation
- using vite for dev server
- using svelte for UI: components, state synchronization

## schema (cells)

```js
const cell = {
    id: `cell-${r}-${c}`,
    row: r,
    col: c,
    type: (r === 0 && c === 0) ? 'source' : 'path',
    rotation: 0,
}
```

## notes

- need to figure out how to handle tunnels