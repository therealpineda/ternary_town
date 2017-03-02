import Square from './square';

class TernaryTown {
  constructor() {
    this.canvas = new createjs.Stage('game-canvas');
    this.grid = [];
    this.createBoard();
    this.setUpHover();
    this.playGame();
  }

  createBoard() {
    for (let y = 0; y < 300; y += 50) {
      const row = [];
      for (let x = 0; x < 300; x += 50) {
        const square = new Square(x, y, this.canvas);
        row.push(square);
      }
      this.grid.push(row);
    }
    this.setRandomStart();
    this.drawSquares();
  };

  drawSquares() {
    this.grid.forEach((row) => {
      row.forEach((sq) => {
        sq.drawSquare();
      })
    });
    this.canvas.update();
  }

  setRandomStart() {
    const startVals = ['1', '1', '1', '1', '2', '2', '3']
    for (var i = 0; i < startVals.length; i++) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 6);
      this.grid[y][x].val = startVals[i];
    }
  }

  setUpHover() {
    const self = this;
    const grid = this.grid;
    const canvas = this.canvas;
    this.canvas.on('stagemousemove', function(evt) {
      self.drawSquares();
      const sqX = Math.floor(evt.stageX / 50);
      const sqY = Math.floor(evt.stageY / 50);
      grid[sqY][sqX].changeColor();
      canvas.update();
    });
  }

  playGame() {
    setInterval(this.checkOver.bind(this),1000);
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
        if (!sq.val) {
          gameOver = false;
        }
      });
    });
    return gameOver;
  }
}

export default TernaryTown;
