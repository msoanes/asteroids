(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 10;
    this.bullets = [];

    this.addAsteroids();
    this.addShip();
    this.deaths = 0;
  };

  Game.prototype.randomPosition = function() {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  };

  Game.prototype.add = function (obj) {
    console.l
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  };

  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship({game: this, pos: this.randomPosition() });
  };

  Game.prototype.addAsteroids = function() {
    this.asteroids = [];
    this.toRemove = [];
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this,
        vel: 1 + Math.random() * 2
      }));
    }
  };

  Game.prototype.allObjects = function() {
    return this.bullets.concat(this.asteroids).concat([this.ship]);
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for(var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }  // Draw ship
  };

  Game.prototype.moveObjects = function() {
    for(var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] > this.DIM_X || pos[1] > this.DIM_Y || pos[0] < 0 || pos[1] < 0;
  };

  Game.prototype.wrap = function(pos) {
    var result = [pos[0] % this.DIM_X, pos[1] % this.DIM_Y];
    return [
      result[0] < 0 ? result[0] + this.DIM_X : result[0],
      result[1] < 0 ? result[1] + this.DIM_Y : result[1]
    ];
  };

  Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
    this.removeObjects();
  };

  Game.prototype.removeObjects = function() {
    for(var k = 0; k < this.toRemove.length; k++) {
      var idx = this.asteroids.indexOf(this.toRemove[k]);
      if (idx >= 0) {
        var firstHalf = this.asteroids.slice(0, idx);
        this.asteroids = firstHalf.concat(this.asteroids.slice(idx + 1));
      } else {
        var idx = this.bullets.indexOf(this.toRemove[k]);
        var firstHalf = this.bullets.slice(0, idx);
        this.bullets = firstHalf.concat(this.bullets.slice(idx + 1));
      }
    }
    this.toRemove = [];
  };

  Game.prototype.remove = function(obj) {
    this.toRemove.push(obj);
  };
})();
