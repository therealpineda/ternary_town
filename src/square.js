class Square {
  constructor(row, col) {
    this.htmlElement = document.getElementById(`${row}-${col}`);
    this.row = row;
    this.col = col;
    this.sqNumber = (row * 6) + col;
    this.val = '';
  }

  drawPiece(hoverVal) {
    const square = this.htmlElement;
    square.className = 'square';
    if (this.val) {
      square.style.backgroundImage = `url(\"assets/img/icons/${this.val}.png\")`;
    } else {
      square.style.backgroundImage = '';
      square.classList.add(`hover-${hoverVal}`);
    }
  }
}

export default Square;
