import { Square, getImage } from './square';

const DELTAS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

class TernaryTown {
  constructor(start = 6) {
    this.canvas = new createjs.Stage('game-canvas');
    this.grid = [];
    this.scoreboard = document.getElementById('score');
    this.levelBoard = document.getElementById('level');
    this.pieceBoard = document.getElementById('current-piece');
    this.score = 0;
    this.level = 0;
    this.nextPiece();
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
    this.updateScore(0);
  };

  setStartingPieces(start) {
    for (var i = 0; i < start; i++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      const val = (Math.floor(Math.random() * i)) + 1;
      this.grid[y][x].val = val;
    }
  }

  startGameListeners() {
    const self = this;
    this.canvas.on('stagemousemove', function(evt) {
      self.drawSquares();
      const sqX = Math.floor(evt.stageX / 50);
      const sqY = Math.floor(evt.stageY / 50);
      const hoverSq = self.grid[sqY][sqX];
      hoverSq.hoverPiece(self.currentPiece);
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
      let matches = this.findMatches(sqX, sqY);
      if (matches.length >= 2) {
        while (matches.length >= 2) {
          this.renderMatch(clickedSq, matches);
          this.updateScore((clickedSq.val - 1) * 100 * (matches.length + 1));
          matches = this.findMatches(sqX, sqY);
        }
      } else {
        this.updateScore(clickedSq.val * 10);
      }
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

  findMatches(sqX, sqY) {
    const clicked = this.grid[sqY][sqX];
    const matchVal = clicked.val;

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
    return matches;
  }

  updateScore(num) {
    this.score += num;
    this.level = Math.floor(this.score / 10000);
    this.scoreboard.innerHTML = this.score;
    this.levelBoard.innerHTML = this.level;
  }

  renderMatch(clickedSq, matches) {
    if (clickedSq.val < 9) {
      clickedSq.val += 1;
    } else {
      clickedSq.val = '';
    }
    matches.forEach((match) => {
      match.val = '';
    });
    this.drawSquares();
  }

  nextPiece() {
    const i = this.level + 1;
    const randomVal = Math.ceil(Math.random() * i * Math.random())
    this.currentPiece = randomVal;
    const imageSrc = getImage(this.currentPiece);
    this.pieceBoard.innerHTML = `<img src=\"${imageSrc}\">`
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
