import Square from './square';
import Audio from './audio';
import Badges from './badges';

const DELTAS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

class Board {
  constructor(numStartingPieces) {
    this.score = 0;
    this.scoreboard = document.getElementById('score');
    this.addedScore = document.getElementById('added-score');

    this.grid = [];
    this.carts = [];

    this.level = 0;
    this.levelBoard = document.getElementById('level');
    this.pieceBoard = document.getElementById('current-piece');
    this.currentPieceVal = '';

    this.audio = new Audio();
    this.badges = new Badges();

    this.nextPiece();
    this.createBoard(numStartingPieces);
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
        sq.drawPiece(this.currentPieceVal);
      })
    });
  }

  getSquare(x,y) {
    return this.grid[y][x];
  }

  populateStartingPieces(numStartingPieces) {
    for (var i = 0; i < numStartingPieces; i++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      const val = (Math.floor(Math.random() * i)) + 1;
      const square = this.getSquare(x,y);
      if (!square.val) square.val = val;
    }
  }

  nextPiece() {
    const randomVal = this.getRandomVal();
    this.currentPieceVal = randomVal;
    this.pieceBoard.innerHTML = `<img src=\"../assets/img/icons/${randomVal}.png\">`
  }

  getRandomVal() {
    let randomVal = 10;
    const notEnemy = Math.random();
    if (notEnemy < .93) {
      const i = this.level + 1;
      randomVal = Math.ceil((Math.random() ** 2) * i)
    }
    return randomVal > 10 ? 1 : randomVal;
  }

  makeMove(coords) {
    const clickedSq = this.getSquare(coords[0], coords[1]);
    if (this.validMove(clickedSq)) {
      clickedSq.val = this.currentPieceVal;
      this.makeMatches(clickedSq);
      this.moveCarts();
      if (clickedSq.val === 10) {
        if (this.checkTrapped(clickedSq)) {
          this.makeFlower(clickedSq);
        } else {
          this.carts.push(clickedSq);
        }
      }
      this.nextPiece();
    }
    this.drawSquares();
  }

  validMove(clickedSq) {
    if (clickedSq.val) {
      this.audio.playSound('invalid');
      return false;
    }
    return true;
  }

  getNeighbors(square) {
    const neighbors = []
    DELTAS.forEach((d) => {
      const x = square.col + d[0];
      const y = square.row + d[1];
      if (x >= 0 && x <= 5 && y >= 0 && y <= 5) {
        const neighSq = this.getSquare(x,y);
        neighbors.push(neighSq);
      }
    });
    return neighbors;
  }

  getMatches(targetSq, matchVal) {
    if (!matchVal) {
      matchVal = targetSq.val;
    }
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
    let matches = this.getMatches(targetSq);
    if (matches.length >= 2) {
      while (matches.length >= 2) {
        this.renderMatch(targetSq, matches);
        addedScore += ((targetSq.val - 1) * 100 * (matches.length + 1));
        matches = this.getMatches(targetSq);
      }
    } else {
      addedScore += (targetSq.val * 10);
      this.audio.playSound('build');
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
      if (clickedSq.val < 10 && clickedSq.val > 1) this.badges.updateBadge(clickedSq.val);
      matches.forEach((match) => {
        match.val = '';
      });
    }
    if (clickedSq.val > 6 && clickedSq.val < 10) {
      this.audio.playSound('cheer');
    } else {
      this.audio.playSound('build');
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
          this.makeFlower(cart);
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
    });
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

  makeFlower(targetSq) {
    targetSq.val = 11;
    this.makeMatches(targetSq);
  }

  boardFull() {
    let full = true;
    this.grid.forEach((row) => {
      row.forEach((sq) => {
        if (!sq.val) full = false;
      });
    });
    return full;
  }
}

export default Board;
