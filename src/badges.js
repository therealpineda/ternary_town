class Badges {
  constructor() {
    this.progress = new Array(9).fill(false);
    this.updateBadge(1);
  }

  updateBadge(val) {
    if (!this.progress[val - 1]) {
      this.progress[val - 1] = true;
      const badge = document.getElementById(`b-${val}`);
      badge.classList.remove('locked');
    }
  }

}

export default Badges;
