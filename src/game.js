import Square from './square';

const DELTAS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

const SQ_VALUES = [1, 1, 1, 1, 2, 2, 3]

class TernaryTown {
  constructor(start = 6) {
    this.canvas = new createjs.Stage('game-canvas');
    this.grid = [];
    this.currentPiece = 1;
    this.createBoard(start);
    this.startGameListeners();
  }

  createBoard(start) {
    for (let y = 0; y < 300; y += 50) {
      const row = [];
      for (let x = 0; x < 300; x += 50) {
        const square = new Square(x, y, this.canvas);
        row.push(square);
      }
      this.grid.push(row);
    }
    this.setStartingPieces(start);
    this.drawSquares();
  };

  setStartingPieces(start) {
    const startVals = SQ_VALUES.slice(0, start + 1);
    for (var i = 0; i < startVals.length; i++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      this.grid[y][x].val = startVals[i];
    }
  }

  startGameListeners() {
    const self = this;
    this.canvas.on('stagemousemove', function(evt) {
      self.drawSquares();
      const sqX = Math.floor(evt.stageX / 50);
      const sqY = Math.floor(evt.stageY / 50);
      const hoverSq = self.grid[sqY][sqX];
      hoverSq.hoverColor(self.currentPiece);
      self.canvas.update();
    });

    this.canvas.on('click', function(evt) {
      const sqX = Math.floor(evt.stageX / 50);
      const sqY = Math.floor(evt.stageY / 50);
      self.makeMove(sqX, sqY);
    });
  }

  drawSquares() {
    this.grid.forEach((row) => {
      row.forEach((sq) => {
        sq.drawSquare();
      })
    });
    this.canvas.update();
  }

  makeMove(sqX, sqY) {
    const clickedSq = this.grid[sqY][sqX];
    if (this.validMove(clickedSq)) {
      clickedSq.val = this.currentPiece;
      this.findMatch(sqX, sqY);
      this.checkOver();
      this.nextPiece();
    }
  }

  validMove(clickedSq) {
    if (clickedSq.val) {
      alert('invalid move');
      return false;
    }
    return true;
  }

  findMatch(sqX, sqY) {
    const clicked = this.grid[sqY][sqX];
    const matchVal = this.currentPiece;

    const matches = [];
    DELTAS.forEach((d) => {
      const neighX = sqX + d[0];
      const neighY = sqY + d[1];
      if (neighX >= 0 && neighX <= 5 && neighY >= 0 && neighY <= 5) {
        const neighSq = this.grid[neighY][neighX]
        if (neighSq.val === matchVal) {
          matches.push(neighSq);
        }
      }
    });

    matches.forEach((match) => {
      DELTAS.forEach((d) => {
        const neighX = (match.x / 50) + d[0];
        const neighY = (match.y / 50) + d[1];
        if (neighX >= 0 && neighX <= 5 && neighY >= 0 && neighY <= 5) {
          const neighborSq = this.grid[neighY][neighX]
          if (!matches.includes(neighborSq) && neighborSq.sqNumber !== clicked.sqNumber) {
            if (neighborSq.val === matchVal) {
              matches.push(neighborSq);
            }
          }
        }
      });
    });

    if (matches.length >= 2) {
      this.renderMatch(clicked, matches);
    }
  }

  renderMatch(clickedSq, matches) {
    clickedSq.val += 1;
    matches.forEach((match) => {
      match.val = '';
    });
    this.drawSquares();
  }

  nextPiece() {
    this.currentPiece = SQ_VALUES[Math.floor(Math.random() * SQ_VALUES.length)];
  }

  checkOver() {
    if (this.gameOver()) {
      alert('game over');
    }
  }

  gameOver() {
    let gameOver = true;
    this.grid.forEach((row) => {
      row.forEach((sq) => {
        if (!sq.val) gameOver = false;
      });
    });
    return gameOver;
  }
}

export default TernaryTown;
