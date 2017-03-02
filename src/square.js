class Square {
  constructor(x, y, canvas) {
    this.square = new createjs.Shape();
    this.sqNumber = ((y / 50) * 6) + (x / 50) + 1;
    this.x = x;
    this.y = y;
    this.val = '';
    canvas.addChild(this.square);
    this.addListeners();
  }

  addListeners() {
    this.square.addEventListener('click', this.clickedSquare.bind(this));
  }

  clickedSquare(evt) {
    if (this.validMove()) {
      this.val = "1";
      this.drawSquare();
    }
  }

  validMove() {
    return this.val ? false : true;
  }

  drawSquare() {
    let color;
    switch (this.val) {
      case '1':
        color = '#FF0000';
        break;
      case '2':
        color = '#00FF00';
        break;
      case '3':
        color = '#0000FF';
        break;
      default:
        color = '#FFF';
        break;
    }
    this.square.graphics.clear().beginStroke('#000').beginFill(color).drawRect(this.x,this.y,50,50);
  }

  changeColor() {
    this.square.graphics.beginFill('#000').drawRect(this.x,this.y,50,50);
  }

}

export default Square;
