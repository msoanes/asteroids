(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(params) {
    params.radius = Bullet.RADIUS;
    params.color = Bullet.COLOR;
    Asteroids.MovingObject.call(this, params);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(Asteroids.Asteroid);
    }
    // body...
  };
  Bullet.RADIUS = 3;
  Bullet.COLOR = "#220000";

})();
