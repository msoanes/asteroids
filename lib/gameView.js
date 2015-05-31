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
    // on keydown, set an interval to run gameview.game.ship.power every ?? ms
    // on keyup, clear relevant timer

    $(document).on('keydown', function(event) {
      var id;
      var char = String.fromCharCode(event.keyCode);
      if (gameview.movements[char]) { return; }
      switch (char) {
        case 'W': // w
          id = setInterval(function() {
            gameview.game.ship.power([0, -0.1]);
          }, 20);
          break;
        case 'A': // a
          id = setInterval(function() {
            gameview.game.ship.power([-0.1, 0]);
          }, 20);
          break;
        case 'S': // s
          id = setInterval(function() {
            gameview.game.ship.power([0, 0.1]);
          }, 20);
          break;
        case 'D': // d
          id = setInterval(function() {
            gameview.game.ship.power([0.1, 0]);
          }, 20);
          break;
        case ' ':
          gameview.game.ship.fireBullet();
          break;
      }
      if (id) { gameview.movements[char] = id; }
    });

    $(document).on('keyup', function(event) {
      var char = String.fromCharCode(event.keyCode);
      var id = gameview.movements[char];
      if (id) {
        clearInterval(id);
        gameview.movements[char] = null;
      }
    });
    // key('w, up', function() { gameview.game.ship.power([0, -0.2]); });
    // key('a, left', function() { gameview.game.ship.power([-0.2, 0]); });
    // key('s, down', function() { gameview.game.ship.power([0, 0.2]); });
    // key('d, right', function() { gameview.game.ship.power([0.2, 0]); });
    // key('space', function() { gameview.game.ship.fireBullet() })
  };
})();
