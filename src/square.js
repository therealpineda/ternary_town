export class Square {
  constructor(row, col) {
    this.htmlElement = document.getElementById(`${row}-${col}`);
    this.row = row;
    this.col = col;
    this.sqNumber = (row * 6) + col;
    this.val = '';
  }

  drawSquare(val) {
    const square = this.htmlElement;
    if (!val) {
      val = this.val
      square.style.backgroundColor = '#fff';
    } else {
      square.style.backgroundColor = 'lightblue';
    }
    const img = new Image();
    img.src = getImage(val);
    square.innerHTML = '';
    square.appendChild(img);
  }

  hoverPiece(currentPieceVal) {
    if (!this.val) {
      this.drawSquare(currentPieceVal);
      this.htmlElement.addEventListener('mouseleave', this.drawSquare.bind(this));
    }
  }
}

export const getImage = (pieceVal) => {
  switch (pieceVal) {
    case 1:
      return 'assets/img/icons/004-circus.png';
    case 2:
      return 'assets/img/icons/006-house.png';
    case 3:
      return 'assets/img/icons/005-house-1.png';
    case 4:
      return 'assets/img/icons/007-building-2.png';
    case 5:
      return 'assets/img/icons/009-school.png';
    case 6:
      return 'assets/img/icons/010-building-1.png';
    case 7:
      return 'assets/img/icons/011-building.png';
    case 8:
      return 'assets/img/icons/008-skyscraper.png';
    case 9:
      return 'assets/img/icons/012-city.png';
    case 10:
      return 'assets/img/icons/003-hot-dog-cart.png';
    default:
      return 'assets/img/icons/blank.png';
  }
};
