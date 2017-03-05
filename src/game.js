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
    this.fruitStands = [];
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
      square.hoverPiece(self.currentPieceVal);
    });

    this.htmlElement.addEventListener('click', function(evt) {
      const clickedSq = self.getSquare(evt);
      const square = self.getSquare(evt);
      self.makeMove(square);
    });
  }

  getSquare(evt) {
    const mouseX = evt.pageX - this.htmlElement.offsetLeft;
    const mouseY = evt.pageY - this.htmlElement.offsetTop;
    const sqX = Math.floor(mouseX / 75.1);
    const sqY = Math.floor(mouseY / 75.1);
    return this.grid[sqY][sqX];
  }

  makeMove(clickedSq) {
    if (this.validMove(clickedSq)) {
      clickedSq.val = this.currentPieceVal;
      this.makeMatches(clickedSq);
      // this.matchEnemies();
      this.checkOver();
      this.moveCarts();
      if (clickedSq.val === 10) {
        if (this.checkTrapped(clickedSq)) {
          this.makeFruitStand(clickedSq);
        } else {
          clickedSq.age = new Date();
          this.carts.push(clickedSq);
        }
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

  getNeighbors(square) {
    const neighbors = []
    DELTAS.forEach((d) => {
      const neighX = square.col + d[0];
      const neighY = square.row + d[1];
      if (neighX >= 0 && neighX <= 5 && neighY >= 0 && neighY <= 5) {
        const neighSq = this.grid[neighY][neighX]
        neighbors.push(neighSq);
      }
    });
    return neighbors;
  }

  findMatches(targetSq) {
    const matchVal = targetSq.val;

    const matches = this.getNeighbors(targetSq).filter((neigh) => {
      return (neigh.val === matchVal && matchVal !== 10)
    });

    matches.forEach((match) => {
      this.getNeighbors(match).forEach((neigh) => {
        if (!matches.includes(neigh) && neigh.sqNumber !== targetSq.sqNumber) {
          if (neigh.val === matchVal) {
            matches.push(neigh);
          }
        }
      });
    });
    return matches;
  }

  makeMatches(targetSq) {
    let addedScore = 0;
    let matches = this.findMatches(targetSq);
    if (matches.length >= 2) {
      while (matches.length >= 2) {
        this.renderMatch(targetSq, matches);
        addedScore += ((targetSq.val - 1) * 100 * (matches.length + 1));
        matches = this.findMatches(targetSq);
      }
    } else {
      addedScore += (targetSq.val * 10);
    }
    this.updateScore(addedScore);
  }

  updateScore(num) {
    this.score += num;
    this.level = Math.floor(this.score / 10000) + 1;
    window.setTimeout(() => {
      this.addedScore.innerHTML = `&nbsp;`;
      this.scoreboard.innerHTML = this.score;
    }, 1100);
    this.addedScore.innerHTML = `+ ${num}!`;
    this.levelBoard.innerHTML = this.level;
  }

  renderMatch(clickedSq, matches) {
    if (clickedSq.val === 9 || clickedSq.val === 12) {
      clickedSq.val = '';
    } else {
      clickedSq.val += 1;
      matches.forEach((match) => {
        match.val = '';
      });
    }
  }

  moveCarts() {
    const self = this;
    const newCarts = [];
    this.carts.forEach((cart) => {
      const posMoves = this.posCartMoves(cart);
      if (posMoves.length > 0) {
        const destinationSq = posMoves[Math.floor(Math.random() * posMoves.length)]
        destinationSq.val = cart.val;
        cart.val = "";
        newCarts.push(destinationSq);
      } else {
        if (this.checkTrapped(cart, cart.col, cart.row)) {
          this.makeFruitStand(cart);
        } else {
          newCarts.push(cart);
        }
      }
    });
    this.carts = newCarts;
  }

  posCartMoves(cart) {
    return this.getNeighbors(cart).filter((neigh) => {
      return !neigh.val;
    })
  }

  checkTrapped(cart) {
    let trapped = false;
    const neighbors = this.getNeighbors(cart);
    if (neighbors.every((neighbor) => { return neighbor.val && neighbor.val !== cart.val})) {
      return true;
    } else {
      const posTrapped = [cart];
      const self = this;
      neighbors.forEach((neighbor) => {
        if (neighbor.val === 10) {
          posTrapped.push(neighbor);
          const cartNeighbors = self.getNeighbors(neighbor);
          cartNeighbors.forEach((n) => {
            if (n.val === 10 && !posTrapped.includes(n)) {
            }
          });
        }
      });
    }
    return trapped;
  }

  makeFruitStand(targetSq) {
    targetSq.val = 11;
    targetSq.age = new Date();
    this.makeMatches(targetSq);
  }

  nextPiece() {
    let randomVal = 10;
    const notEnemy = Math.random();
    // % chance piece will be an enemy... will evenutally increase w level as well
    if (notEnemy < .93) {
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
