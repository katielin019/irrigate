# irrigate

working on a game prototype

- using anime.js for flood fill animation
- using vite for dev server
- using svelte for UI: components, state synchronization

## todo

- [x] translate bitmasked shape into visual representation
- [x] write `getAdjacentCells()` function (maybe as a helper?)
    - do i want to return the cells themselves or the indices? probably the indices...
    - takes 3 args: `grid`, `width`, and `idx`
        - we need `width` because the grid representation is a 1D array, so the grid width (number of cols) can't be derived
        - `idx` is the cell we're getting the neighbors for
    - [x] write function to check if `checkBounds()`
        - not just if `idx >= 0 && idx < grid.length` since we a cell that wraps to the next row isn't adjacent to a cell on the right border
- [ ] add initial flood fill using breadth-first search (don't worry about fixing broken paths yet)
    - my logic isn't logicing so i'm gonna simplify and skip the visited set for now
    - ok i wrote the implentation, but it's broken because i'm not doing bitmask comparison correctly
        - also, i'm visiting cells i shouldn't be visiting! i only need to check cells that are in the direction of the open channels
        - just fixed `getAdjCells` logic to only visit neighbors that can receive water
            - now i need to figure out how to compare adjacent cells directionally with bitmasks
- [ ] break paths and "drain" cells that are no longer connected to source
    - thinking about using a graph to trace flood fill steps, which should make it easy to prune broken paths (in theory)

## notes

- currently only handles one plant variant; may have to update schema if i decide to add 2+ plant types
- initial game state has all tiles facing "up"; might be nice to add some randomized rotation (that doesn't make the solution obvious)
    - may need to actually just write the solution state and then add moves to it to perform randomization/scrambling
    - not sure how i want to encode solution state since current data schema doesn't take orientation into account, just type and relative position (grid index)
- don't actually want to use the "mask" to render borders of a cell, because we need to rotate the cell div to have the corners rotate too
    - use `data-shape` to set the initial shape of a cell, and then continually rotate it based on user input
    - still need to keep updating `mask` because it represents the encoded channels that we use to determine the path for executing the flood fill
- ~~**important:** will have to adjust implementation of `getAdjCells` when portals are added since it uses short circuit evaluation based on `inBounds.get(key)` - should probably switch these~~
    - actually wait i could just switch them now