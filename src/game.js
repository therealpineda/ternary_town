import { Square, getImage } from './square';

const DELTAS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

class TernaryTown {
  constructor(numStartingPieces = 6) {
    this.htmlElement = document.getElementById('game-board');
    this.score = 0;
    this.scoreboard = document.getElementById('score');
    this.addedScore = document.getElementById('added-score');
    this.level = 0;
    this.levelBoard = document.getElementById('level');
    this.pieceBoard = document.getElementById('current-piece');
    this.grid = [];
    this.carts = [];
    this.createBoard(numStartingPieces);
    this.startGameListeners();
    this.nextPiece();
  }

  createBoard(numStartingPieces) {
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        const sq = new Square(i, j)
        row.push(sq);
      }
      this.grid.push(row);
    }
  this.populateStartingPieces(numStartingPieces);
  this.drawSquares();
  }

  drawSquares() {
    this.grid.forEach((row) => {
      row.forEach((sq) => {
        sq.drawSquare();
      })
    });
  }

  populateStartingPieces(numStartingPieces) {
    for (var i = 0; i < numStartingPieces; i++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      const val = (Math.floor(Math.random() * i)) + 1;
      const square = this.grid[y][x]
      if (!square.val) {
        square.val = val;
      }
    }
  }

  startGameListeners() {
    const self = this;
    this.htmlElement.addEventListener('mousemove', function(evt) {
      self.drawSquares();
      const square = self.getSquare(evt);
      square[0].hoverPiece(self.currentPieceVal);
    });

    this.htmlElement.addEventListener('click', function(evt) {
      const clickedSq = self.getSquare(evt);
      const square = self.getSquare(evt);
      self.makeMove(...square);
    });
  }

  getSquare(evt) {
    const mouseX = evt.pageX - this.htmlElement.offsetLeft;
    const mouseY = evt.pageY - this.htmlElement.offsetTop;
    const sqX = Math.floor(mouseX / 50.1);
    const sqY = Math.floor(mouseY / 50.1);
    return [this.grid[sqY][sqX], sqX, sqY];
  }

  makeMove(clickedSq, sqX, sqY) {
    if (this.validMove(clickedSq)) {
      clickedSq.val = this.currentPieceVal;
      let matches = this.findMatches(clickedSq, sqX, sqY);
      if (matches.length >= 2) {
        while (matches.length >= 2) {
          this.renderMatch(clickedSq, matches);
          this.updateScore((clickedSq.val - 1) * 100 * (matches.length + 1));
          matches = this.findMatches(clickedSq, sqX, sqY);
        }
      } else {
        this.updateScore(clickedSq.val * 10);
      }
      this.checkOver();
      this.moveCarts();
      if (clickedSq.val === 10) {
        this.carts.push(clickedSq);
      }
      this.nextPiece();
    }
    this.drawSquares();
  }

  validMove(clickedSq) {
    if (clickedSq.val) {
      alert('invalid move');
      return false;
    }
    return true;
  }

  findMatches(clickedSq, sqX, sqY) {
    const matchVal = clickedSq.val;

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
        const neighX = match.col + d[0];
        const neighY = match.row + d[1];
        if (neighX >= 0 && neighX <= 5 && neighY >= 0 && neighY <= 5) {
          const neighborSq = this.grid[neighY][neighX]
          if (!matches.includes(neighborSq) && neighborSq.sqNumber !== clickedSq.sqNumber) {
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
    window.setTimeout(() => {
      this.addedScore.innerHTML = `&nbsp;`;
      this.scoreboard.innerHTML = this.score;
    }, 1100);
    this.addedScore.innerHTML = `+ ${num}!`;
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
    // this.drawSquares();
  }

  moveCarts() {
    self = this;
    const newCarts = [];
    this.carts.forEach((cart) => {
      const posMoves = [];
      DELTAS.forEach((d) => {
        const neighX = cart.col + d[0];
        const neighY = cart.row + d[1];
        if (neighX >= 0 && neighX <= 5 && neighY >= 0 && neighY <= 5) {
          const neighSq = this.grid[neighY][neighX]
          if (!neighSq.val) {
            posMoves.push([neighX, neighY]);
          }
        }
      });
      console.log(posMoves);
      const randomMove = posMoves[Math.floor(Math.random() * posMoves.length)]
      console.log(randomMove);
      const destinationSq = self.grid[randomMove[1]][randomMove[0]];
      destinationSq.val = cart.val;
      cart.val = "";
      newCarts.push(destinationSq);
    });
    this.carts = newCarts;
  }

  nextPiece() {
    let randomVal = 10;
    const notEnemy = Math.random();
    if (notEnemy < .5) {
      const i = this.level + 1;
      randomVal = Math.ceil(Math.random() * i * Math.random())
    }
    this.currentPieceVal = randomVal;
    const imageSrc = getImage(this.currentPieceVal);
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


};

export default TernaryTown;
