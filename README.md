# irrigate

working on a game prototype

- using anime.js for flood fill animation
- using vite for dev server
- using svelte for UI: components, state synchronization

## todo

- [ ] figure out how i want to handle portal visualization
- [ ] add walls?

## notes

- currently only handles one plant variant; may have to update schema if i decide to add 2+ plant types
- initial game state has all tiles facing "up"; might be nice to add some randomized rotation (that doesn't make the solution obvious)
    - may need to actually just write the solution state and then add moves to it to perform randomization/scrambling
    - not sure how i want to encode solution state since current data schema doesn't take orientation into account, just type and relative position (grid index)