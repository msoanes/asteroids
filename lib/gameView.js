(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.movements = {};
    this.time = 0;
    this.gameInterval = null;
    this.timerInterval
  };

  GameView.prototype.start = function () {
    var gameview = this;
    gameview.bindKeyHandlers();
    this.gameInterval = setInterval(function () {
      gameview.game.moveObjects();
      gameview.game.draw(gameview.ctx);
      gameview.game.checkCollisions();
      gameview.checkGameOver();
      gameview.updateDeaths();
    }, 20 );

    this.timerInterval = setInterval(function () {
      gameview.updateTimer();
    }, 100);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var gameview = this;
    var powerLevels = {
      'W': [0, -0.1],
      'A': [-0.1, 0],
      'S': [0, 0.1],
      'D': [0.1, 0]
    };
    $(document).on('keydown', function(event) {
      var id;
      var char = String.fromCharCode(event.keyCode);
      if (gameview.movements[char]) { return; }
      if (powerLevels[char]) {
        id = setInterval(function() {
          gameview.game.ship.power(powerLevels[char]);
        }, 20);
        gameview.movements[char] = id;
      }
      if (char === ' ') {
        gameview.game.ship.fireBullet();
        gameview.movements[char] = 10;
      }
    });

    $(document).on('keyup', function(event) {
      var char = String.fromCharCode(event.keyCode);
      var id = gameview.movements[char];
      if (id) {
        clearInterval(id);
        gameview.movements[char] = null;
      }
    });
  };

  GameView.prototype.updateDeaths = function () {
    $('.death-count').text(this.game.deaths);
    $('.timer').text(this.time);
    $('.bullet-count').text(this.game.bulletCount);
  };

  GameView.prototype.updateTimer = function () {
    this.time = (this.time * 10 + 1) / 10;
  };

  GameView.prototype.checkGameOver = function () {
    if (this.game.asteroids.length === 0) {
      setTimeout(this.gameOver.bind(this), 40);
    }
  };

  GameView.prototype.gameOver = function () {
    console.log('Game Over');
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
  };

})();
