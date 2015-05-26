(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
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

    key('w', function() { gameview.game.ship.power([0, -0.2]); });
    key('a', function() { gameview.game.ship.power([-0.2, 0]); });
    key('s', function() { gameview.game.ship.power([0, 0.2]); });
    key('d', function() { gameview.game.ship.power([0.2, 0]); });
    key('space', function() { gameview.game.ship.fireBullet() })

    key('wa', function() { gameview.game.ship.power([-0.2, -0.2]); });
    key('wd', function() { gameview.game.ship.power([0.2, -0.2]); });
    key('sa', function() { gameview.game.ship.power([-0.2, 0.2]); });
    key('sd', function() { gameview.game.ship.power([0.2, 0.2]); });

  }
})();
