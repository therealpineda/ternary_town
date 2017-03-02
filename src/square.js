class Square {
  constructor(x, y, canvas) {
    this.square = new createjs.Shape();
    this.sqNumber = ((y / 50) * 6) + (x / 50) + 1;
    this.x = x;
    this.y = y;
    this.val = '';
    canvas.addChild(this.square);
  }

  drawSquare() {
    const color = this.getColor(this.val);
    this.square.graphics.clear().beginStroke('#000').beginFill(color).drawRect(this.x,this.y,50,50);
  }

  getColor(pieceVal) {
    switch (pieceVal) {
      case 1:
        return '#FF0000';
      case 2:
        return '#00FF00';
      case 3:
        return '#0000FF';
      default:
        return '#FFF';
    }
  }

  hoverColor(currentPiece) {
    const color = this.getColor(currentPiece);
    this.square.graphics.beginFill(color).drawRect(this.x,this.y,50,50);
  }

}

export default Square;
