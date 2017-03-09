import Board from './board';

class TernaryTown {
  constructor(numStartingPieces = 6) {
    this.htmlElement = document.getElementById('game-board');
    this.board = new Board(numStartingPieces);
    this.startGameListeners();
  }

  startGameListeners() {
    const self = this;
    this.htmlElement.addEventListener('mousemove', function(evt) {
      self.board.drawSquares();
      const square = self.getSquare(evt);
      self.board.hoverPiece(square);
    });

    this.htmlElement.addEventListener('click', function(evt) {
      const square = self.getSquare(evt);
      self.makeMove(square);
    });
  }

  getSquare(evt) {
    const mouseX = evt.pageX - this.htmlElement.offsetLeft;
    const mouseY = evt.pageY - this.htmlElement.offsetTop;
    const x = Math.floor(mouseX / 75.1);
    const y = Math.floor(mouseY / 75.1);
    return this.board.getSquare(x,y);
  }

  makeMove(square) {
    this.board.makeMove(square);
  }

  gameOver() {
    if (this.board.boardFull()) {
      alert('Game Over!');
    }
  }

};

export default TernaryTown;
