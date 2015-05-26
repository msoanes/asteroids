(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(params) {
    Asteroids.MovingObject.call(this, {
      game: params.game,
      pos: params.pos,
      vel: [0, 0],
      color: Asteroids.Ship.COLOR,
      radius: Asteroids.Ship.RADIUS
    });
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.collideWith = function(otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

  Ship.prototype.power = function(impulse) {
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  }

  Ship.prototype.fireBullet = function() {
    var params = {};
    params.pos = this.pos;
    params.vel = [this.vel[0] * 2, this.vel[1] * 2];
    params.game = this.game;
    var bullet = new Asteroids.Bullet(params);
    this.game.add(bullet);
  }


  Ship.COLOR = "#000000";
  Ship.RADIUS = 10;


})();
