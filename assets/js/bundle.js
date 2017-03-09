/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TernaryTown = function () {
  function TernaryTown() {
    var numStartingPieces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;

    _classCallCheck(this, TernaryTown);

    this.htmlElement = document.getElementById('game-board');
    this.board = new _board2.default(numStartingPieces);
    this.startGameListeners();
  }

  _createClass(TernaryTown, [{
    key: 'startGameListeners',
    value: function startGameListeners() {
      var self = this;
      this.htmlElement.addEventListener('mousemove', function (evt) {
        self.board.drawSquares();
        var coords = self.getCoords(evt);
        self.board.hoverPiece(coords);
      });

      this.htmlElement.addEventListener('click', function (evt) {
        var coords = self.getCoords(evt);
        self.board.makeMove(coords);
        self.gameOver();
      });
    }
  }, {
    key: 'getCoords',
    value: function getCoords(evt) {
      var mouseX = evt.pageX - this.htmlElement.offsetLeft;
      var mouseY = evt.pageY - this.htmlElement.offsetTop;
      var x = Math.floor(mouseX / 75.1);
      var y = Math.floor(mouseY / 75.1);
      return [x, y];
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      if (this.board.boardFull()) {
        alert('Game Over!');
      }
    }
  }]);

  return TernaryTown;
}();

;

exports.default = TernaryTown;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Audio = function () {
  function Audio() {
    _classCallCheck(this, Audio);

    this.music = document.getElementById('music-player');
    this.music.src = "assets/sound/bgm.ogg";
    this.music.loop = true;
    this.sounds = document.getElementById('sound-player');
    this.sounds.sound = 0.1;
    this.musicOn();
    this.musicControl = document.getElementById('music-control');
    this.soundControl = document.getElementById('sound-control');
    this.addMusicOffListener();
    this.addSoundOffListener();
    this.soundMuted = false;
  }

  _createClass(Audio, [{
    key: 'addMusicOffListener',
    value: function addMusicOffListener() {
      var self = this;
      this.musicControl.addEventListener('click', function (evt) {
        self.musicOff();
        self.musicControl.className = "fa fa-music inactive-control";
        self.addMusicOnListener();
      });
    }
  }, {
    key: 'addMusicOnListener',
    value: function addMusicOnListener() {
      var self = this;
      this.musicControl.addEventListener('click', function (evt) {
        self.musicOn();
        self.musicControl.className = "fa fa-music active-control";
        self.addMusicOffListener();
      });
    }
  }, {
    key: 'addSoundOffListener',
    value: function addSoundOffListener() {
      var self = this;
      this.soundControl.addEventListener('click', function (evt) {
        self.soundMuted = true;
        self.soundControl.className = "fa fa-volume-off inactive-control";
        self.addSoundOnListener();
      });
    }
  }, {
    key: 'addSoundOnListener',
    value: function addSoundOnListener() {
      var self = this;
      this.soundControl.addEventListener('click', function (evt) {
        self.soundMuted = false;
        self.soundControl.className = "fa fa-volume-up active-control";
        self.addSoundOffListener();
      });
    }
  }, {
    key: 'musicOn',
    value: function musicOn() {
      this.music.play();
    }
  }, {
    key: 'musicOff',
    value: function musicOff() {
      this.music.pause();
    }
  }, {
    key: 'build',
    value: function build() {
      if (!this.soundMuted) {
        this.sounds.src = "assets/sound/build.wav";
        this.sounds.play();
      }
    }
  }, {
    key: 'invalid',
    value: function invalid() {
      if (!this.soundMuted) {
        this.sounds.src = "assets/sound/invalid.wav";
        this.sounds.play();
      }
    }
  }, {
    key: 'cheer',
    value: function cheer() {
      if (!this.soundMuted) {
        this.sounds.src = "assets/sound/cheer.wav";
        this.sounds.play();
      }
    }
  }]);

  return Audio;
}();

exports.default = Audio;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _square = __webpack_require__(3);

var _square2 = _interopRequireDefault(_square);

var _audio = __webpack_require__(1);

var _audio2 = _interopRequireDefault(_audio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DELTAS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

var Board = function () {
  function Board(numStartingPieces) {
    _classCallCheck(this, Board);

    this.score = 0;
    this.scoreboard = document.getElementById('score');
    this.addedScore = document.getElementById('added-score');

    this.grid = [];
    this.carts = [];

    this.level = 0;
    this.levelBoard = document.getElementById('level');
    this.pieceBoard = document.getElementById('current-piece');
    this.currentPieceVal = '';

    this.audio = new _audio2.default();

    this.createBoard(numStartingPieces);
    this.nextPiece();
  }

  _createClass(Board, [{
    key: 'createBoard',
    value: function createBoard(numStartingPieces) {
      for (var i = 0; i < 6; i++) {
        var row = [];
        for (var j = 0; j < 6; j++) {
          var sq = new _square2.default(i, j);
          row.push(sq);
        }
        this.grid.push(row);
      }
      this.populateStartingPieces(numStartingPieces);
      this.drawSquares();
    }
  }, {
    key: 'drawSquares',
    value: function drawSquares() {
      this.grid.forEach(function (row) {
        row.forEach(function (sq) {
          sq.drawSquare();
        });
      });
    }
  }, {
    key: 'getSquare',
    value: function getSquare(x, y) {
      return this.grid[y][x];
    }
  }, {
    key: 'populateStartingPieces',
    value: function populateStartingPieces(numStartingPieces) {
      for (var i = 0; i < numStartingPieces; i++) {
        var x = Math.floor(Math.random() * 6);
        var y = Math.floor(Math.random() * 6);
        var val = Math.floor(Math.random() * i) + 1;
        var square = this.getSquare(x, y);
        if (!square.val) {
          square.val = val;
        }
      }
    }
  }, {
    key: 'nextPiece',
    value: function nextPiece() {
      var randomVal = 10;
      var notEnemy = Math.random();
      // % chance piece will be an enemy... will evenutally increase w level as well
      if (notEnemy < .93) {
        var i = this.level + 1;
        randomVal = Math.ceil(Math.random() * i * Math.random());
      }
      this.currentPieceVal = randomVal;
      var imageSrc = _square2.default.getImage(this.currentPieceVal);
      this.pieceBoard.innerHTML = '<img src="' + imageSrc + '">';
    }
  }, {
    key: 'hoverPiece',
    value: function hoverPiece(coords) {
      var square = this.getSquare(coords[0], coords[1]);
      square.hoverPiece(this.currentPieceVal);
    }
  }, {
    key: 'makeMove',
    value: function makeMove(coords) {
      var clickedSq = this.getSquare(coords[0], coords[1]);
      if (this.validMove(clickedSq)) {
        clickedSq.val = this.currentPieceVal;
        this.makeMatches(clickedSq);
        this.moveCarts();
        if (clickedSq.val === 10) {
          if (this.checkTrapped(clickedSq)) {
            this.makeFlower(clickedSq);
          } else {
            clickedSq.age = new Date();
            this.carts.push(clickedSq);
          }
        }
        this.nextPiece();
      }
      this.drawSquares();
    }
  }, {
    key: 'validMove',
    value: function validMove(clickedSq) {
      if (clickedSq.val) {
        this.audio.invalid();
        return false;
      }
      return true;
    }
  }, {
    key: 'getNeighbors',
    value: function getNeighbors(square) {
      var _this = this;

      var neighbors = [];
      DELTAS.forEach(function (d) {
        var x = square.col + d[0];
        var y = square.row + d[1];
        if (x >= 0 && x <= 5 && y >= 0 && y <= 5) {
          var neighSq = _this.getSquare(x, y);
          neighbors.push(neighSq);
        }
      });
      return neighbors;
    }
  }, {
    key: 'findMatches',
    value: function findMatches(targetSq) {
      var _this2 = this;

      var matchVal = targetSq.val;

      var matches = this.getNeighbors(targetSq).filter(function (neigh) {
        return neigh.val === matchVal && matchVal !== 10;
      });

      matches.forEach(function (match) {
        _this2.getNeighbors(match).forEach(function (neigh) {
          if (!matches.includes(neigh) && neigh.sqNumber !== targetSq.sqNumber) {
            if (neigh.val === matchVal) {
              matches.push(neigh);
            }
          }
        });
      });
      return matches;
    }
  }, {
    key: 'makeMatches',
    value: function makeMatches(targetSq) {
      var addedScore = 0;
      var matches = this.findMatches(targetSq);
      if (matches.length >= 2) {
        while (matches.length >= 2) {
          this.renderMatch(targetSq, matches);
          addedScore += (targetSq.val - 1) * 100 * (matches.length + 1);
          matches = this.findMatches(targetSq);
        }
      } else {
        addedScore += targetSq.val * 10;
        this.audio.build();
      }
      this.updateScore(addedScore);
    }
  }, {
    key: 'updateScore',
    value: function updateScore(num) {
      var _this3 = this;

      this.score += num;
      this.level = Math.floor(this.score / 10000) + 1;
      window.setTimeout(function () {
        _this3.addedScore.innerHTML = '&nbsp;';
        _this3.scoreboard.innerHTML = _this3.score;
      }, 1100);
      this.addedScore.innerHTML = '+ ' + num + '!';
      this.levelBoard.innerHTML = this.level;
    }
  }, {
    key: 'renderMatch',
    value: function renderMatch(clickedSq, matches) {
      if (clickedSq.val === 9 || clickedSq.val === 12) {
        clickedSq.val = '';
      } else {
        clickedSq.val += 1;
        matches.forEach(function (match) {
          match.val = '';
        });
      }
      if (clickedSq.val > 6 && clickedSq.val < 10) {
        this.audio.cheer();
      } else {
        this.audio.build();
      }
    }
  }, {
    key: 'moveCarts',
    value: function moveCarts() {
      var _this4 = this;

      var self = this;
      var newCarts = [];
      this.carts.forEach(function (cart) {
        var posMoves = _this4.posCartMoves(cart);
        if (posMoves.length > 0) {
          var destinationSq = posMoves[Math.floor(Math.random() * posMoves.length)];
          destinationSq.val = cart.val;
          cart.val = "";
          newCarts.push(destinationSq);
        } else {
          if (_this4.checkTrapped(cart, cart.col, cart.row)) {
            _this4.makeFlower(cart);
          } else {
            newCarts.push(cart);
          }
        }
      });
      this.carts = newCarts;
    }
  }, {
    key: 'posCartMoves',
    value: function posCartMoves(cart) {
      return this.getNeighbors(cart).filter(function (neigh) {
        return !neigh.val;
      });
    }
  }, {
    key: 'checkTrapped',
    value: function checkTrapped(cart) {
      var trapped = false;
      var neighbors = this.getNeighbors(cart);
      if (neighbors.every(function (neighbor) {
        return neighbor.val && neighbor.val !== cart.val;
      })) {
        return true;
      } else {
        var posTrapped = [cart];
        var self = this;
        neighbors.forEach(function (neighbor) {
          if (neighbor.val === 10) {
            posTrapped.push(neighbor);
            var cartNeighbors = self.getNeighbors(neighbor);
            cartNeighbors.forEach(function (n) {
              if (n.val === 10 && !posTrapped.includes(n)) {}
            });
          }
        });
      }
      return trapped;
    }
  }, {
    key: 'makeFlower',
    value: function makeFlower(targetSq) {
      targetSq.val = 11;
      targetSq.age = new Date();
      this.makeMatches(targetSq);
    }
  }, {
    key: 'boardFull',
    value: function boardFull() {
      var full = true;
      this.grid.forEach(function (row) {
        row.forEach(function (sq) {
          if (!sq.val) full = false;
        });
      });
      return full;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Square = function () {
  function Square(row, col) {
    _classCallCheck(this, Square);

    this.htmlElement = document.getElementById(row + '-' + col);
    this.row = row;
    this.col = col;
    this.sqNumber = row * 6 + col;
    this.val = '';
    this.age = new Date();
  }

  _createClass(Square, [{
    key: 'drawSquare',
    value: function drawSquare(val) {
      var square = this.htmlElement;
      if (!val) {
        val = this.val;
      }
      var img = new Image();
      img.src = Square.getImage(val);
      square.innerHTML = '';
      square.appendChild(img);
    }
  }, {
    key: 'hoverPiece',
    value: function hoverPiece(currentPieceVal) {
      if (!this.val) {
        this.drawSquare(currentPieceVal);
        this.htmlElement.addEventListener('mouseleave', this.drawSquare.bind(this));
      }
    }
  }], [{
    key: 'getImage',
    value: function getImage(pieceVal) {
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
  }]);

  return Square;
}();

exports.default = Square;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  new _game2.default();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map