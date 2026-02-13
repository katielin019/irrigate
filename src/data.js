export const levelData = {
    layout: [
        "P", "L", "L", "T", "L", "T", "L",  // index 0-6
        "P", "P", "L", "T", "I", "P", "I",  // 7-13
        "T", "T", "T", "P", "T", "P", "P",  // 14-20
        "I", "P", "T", "P", "T", "T", "P",  // 21-27
        "P", "O", "L", "P", "P", "T", "L",  // 28-34
        "T", "P", "L", "T", "T", "T", "T",  // 35-41
        "L", "L", "P", "L", "L", "P", "P"   // 42-48
    ],
    rows: 7,
    cols: 7,
    portals: {
        1: 43,  // cell index 1 teleports to index 43
        43: 1,  // backwards link for bidirectional flow
        2: 44,
        44: 2,
        3: 45,
        45: 3,
        35: 41,
        41: 35,
    }
};

// North:   1 (2^0)
// East:    2 (2^1)
// South:   4 (2^2)
// West:    8 (2^3)

export const SHAPES = {
    I: 5,   // N (1) + S (4)
    L: 3,   // N (1) + E (2)
    T: 7,   // N (1) + E (2) + S (4)
    P: 1,   // Plant only takes water from N
    O: 4    // Source only gives water from S
}