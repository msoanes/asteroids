(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameInterval = null;
    this.timerInterval = null;
  };

  GameView.prototype.start = function () {
    this.time = 0;
    this.movements = {};
    this.game = new Asteroids.Game();
    this.isOver = false;
    var gameview = this;

    gameview.bindKeyHandlers();
    this.gameInterval = setInterval(function () {
      gameview.game.moveObjects();
      gameview.game.draw(gameview.ctx);
      gameview.game.checkCollisions();
      gameview.checkGameOver();
      gameview.updateStats();
    }, 20 );

    this.timerInterval = setInterval(function () {
      gameview.updateTimer();
      console.log('timer');
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
        gameview.movements[char] = -1;
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

  GameView.prototype.updateStats = function () {
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

  GameView.prototype.newGame = function () {
    $(document).unbind();
    $('.game-over-message').addClass('hidden');
    this.game = new Asteroids.Game();
    this.start();
  };

  GameView.prototype.gameOver = function () {
    if (this.isOver) { return; }
    this.isOver = true;
    var gameview = this;
    clearInterval(gameview.gameInterval);
    clearInterval(gameview.timerInterval);
    clearInterval(gameview.movements['W']);
    clearInterval(gameview.movements['A']);
    clearInterval(gameview.movements['S']);
    clearInterval(gameview.movements['D']);

    gameview.ctx.clearRect(0, 0, gameview.canvas.width, gameview.canvas.height);
    $('.game-over-message').removeClass('hidden');
    $(document).unbind();

    setTimeout( function () {
      $(document).on('keypress', function(event) {
        if (String.fromCharCode(event.keyCode) === ' ') {
          console.log("hi");
          gameview.newGame();
        }
      });
    }, 500);
  };

})();
