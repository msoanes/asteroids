(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.movements = [];
  };

  GameView.prototype.start = function () {
    var gameview = this;
    gameview.bindKeyHandlers();
    setInterval(function () {
      gameview.game.moveObjects();
      gameview.game.draw(gameview.ctx);
      gameview.game.checkCollisions();
    }, 20 );
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
})();
