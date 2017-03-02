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
    default:
      return 'assets/img/icons/blank.png';
  }
};

export class Square {
  constructor(x, y, canvas) {
    this.square = new createjs.Shape();
    this.sqNumber = ((y / 50) * 6) + (x / 50) + 1;
    this.x = x;
    this.y = y;
    this.val = '';
    canvas.addChild(this.square);
    this.canvas = canvas;
  }

  drawSquare() {
    this.populateImage(this.val);
  }

  populateImage(val) {
    const img = new Image();
    img.src = getImage(val);
    img.onload = () => {
      const x = this.x;
      const y = this.y;
      const matrix = new createjs.Matrix2D();
      matrix.translate(x + 2.5, y + 2.5);
      matrix.scale(45/img.width, 45/img.height);
      this.square.graphics
        .clear()
        .beginStroke("black")
        .beginBitmapFill(img, "no-repeat", matrix)
        .drawRect(x, y, 50, 50);
      this.canvas.update();
    }
  }

  hoverPiece(currentPiece) {
    if (!this.val) {
      this.populateImage(currentPiece);
    }
  }
}

// export default Square;
