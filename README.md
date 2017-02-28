## Ternary Town

### Background

Ternary Town is a single-player casual match-three game inspired by Triple Town. The player is given random items to play on a 6x6 grid, trying to match three like items. When three items match, they combine to form one item of the next highest tier. Combining higher-tier items earns more points. Gameplay continues until the board is full.

### MVP  

- [ ] 6x6 grid, initializes with random pieces
- [ ] random current piece on each turn
- [ ] users can place pieces in empty spots
- [ ] adjacently placing the third (or fourth) of the same piece makes a match that combines all items into one of the next highest tier
- [ ] visual feedback on hover if a match is possible
- [ ] enemies appear randomly to be placed, they also move randomly on the board and block moves
- [ ] users can utilize the top left slot as a holding place for a piece
- [ ] about section or modal that displays combinations and points
- [ ] production README

### Wireframes

Ternary Town will be played on a single page that will hold the 6x6 grid as well as the about section, and links to the project's Github.

![alt text](	https://s3.us-east-2.amazonaws.com/ternary--town/images/wireframe.png "Wireframe - Ternary Town")

### Architecture and Technologies

- `HTML` and `CSS` for rendering and styling
- `JavaScript` and `jQuery` for placing pieces and updating the board

`square.js`
- State: image, point value, match-able with neighbors
- Behavior: hover, move (for enemies)

`board.js`: will house the board, score, next piece, and rules
- State: pieces on the board, score, next piece
- Behavior: initialize, next random piece, hover, valid move, match made, game over

### Implementation Timeline

**Day 1**

- Set up HTML and basic CSS overlay
- Set up all necessary JS files and packages
- Lay out the basic structure of the code
- Begin on `square.js`

**Day 2**

- Finish `square.js`
- `board.js` state and initialize methods
- `board.js` next piece methods and placeable pieces to appear on the cursor
- Source image files for tiles

**Day 3**

- Matching pieces update the board
- Squares that would create possible matches have special hover effect toward cursor
- Finalize design
- Add rules
- Work on bonus

### Bonus features

- [ ] Piece that destroys pieces on the board
- [ ] Wildcard piece that can be used to make any match
- [ ] Random events that result in true/good or false/bad consequences
- [ ] Difficulty levels
- [ ] High scores board
