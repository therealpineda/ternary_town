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
      const coords = self.getCoords(evt);
      self.board.hoverPiece(coords);
    });

    this.htmlElement.addEventListener('click', function(evt) {
      const coords = self.getCoords(evt);
      self.board.makeMove(coords);
      self.gameOver();
    });
  }

  getCoords(evt) {
    const mouseX = evt.pageX - this.htmlElement.offsetLeft;
    const mouseY = evt.pageY - this.htmlElement.offsetTop;
    const x = Math.floor(mouseX / 75.1);
    const y = Math.floor(mouseY / 75.1);
    return [x,y];
  }

  gameOver() {
    if (this.board.boardFull()) {
      const alert = document.getElementById('game-over');
      alert.className = "";
    }
  }

};

export default TernaryTown;
