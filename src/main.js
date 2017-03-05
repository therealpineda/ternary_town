import TernaryTown from './game';

document.addEventListener('DOMContentLoaded', () => {
  new TernaryTown();
  window.setTimeout( () => {
    const app = document.getElementById('app-slide');
    app.className = 'main-app expandUp';
  }, 600);
});
