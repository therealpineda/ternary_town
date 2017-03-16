class Square {
  constructor(row, col) {
    this.htmlElement = document.getElementById(`${row}-${col}`);
    this.row = row;
    this.col = col;
    this.sqNumber = (row * 6) + col;
    this.val = '';
    this.age = new Date();
  }

  drawSquare(val) {
    const square = this.htmlElement;
    if (!val) {
      val = this.val
    }
    const img = new Image();
    img.src = Square.getImage(val);
    square.innerHTML = '';
    square.style.backgroundColor = "transparent";
    square.className = "square";
    square.appendChild(img);
  }

  hoverPiece(currentPieceVal) {
    if (!this.val) {
      this.drawSquare(currentPieceVal);
      this.htmlElement.addEventListener('mouseleave', this.drawSquare.bind(this));
    }
  }

  hoveredRowColumn() {
    this.htmlElement.style.backgroundColor = "rgba(154, 146, 122, 0.09)";
    this.htmlElement.addEventListener('mouseleave', this.drawSquare.bind(this));
  };

  static getImage(pieceVal) {
    switch (pieceVal) {
      case 1:
        return 'assets/img/icons/1.png';
      case 2:
        return 'assets/img/icons/2.png';
      case 3:
        return 'assets/img/icons/3.png';
      case 4:
        return 'assets/img/icons/4.png';
      case 5:
        return 'assets/img/icons/5.png';
      case 6:
        return 'assets/img/icons/6.png';
      case 7:
        return 'assets/img/icons/7.png';
      case 8:
        return 'assets/img/icons/8.png';
      case 9:
        return 'assets/img/icons/9.png';
      case 10:
        return 'assets/img/icons/e1.png';
      case 11:
        return 'assets/img/icons/e2.png';
      case 12:
        return 'assets/img/icons/e3.png';
      default:
        return 'assets/img/icons/blank.png';
    }
  }
}

export default Square;
