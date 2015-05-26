(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(params) {
    Asteroids.MovingObject.call(this, {
      game: params.game,
      pos: params.pos,
      vel: Asteroids.Util.randomVec(params.vel),
      color: Asteroids.Asteroid.COLOR,
      radius: Asteroids.Asteroid.RADIUS
    });
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject === this.game.ship){
      this.game.ship.relocate();
    }
  };


  Asteroid.COLOR = "#CC6622";
  Asteroid.RADIUS = 20;

})();
