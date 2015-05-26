(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.game = params.game;
    this.isWrappable = true;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else if (this.game.isOutOfBounds(this.pos)) {
      this.game.remove(this);
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var xDistance = this.pos[0] - otherObject.pos[0];
    var yDistance = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    return distance < this.radius + otherObject.radius;
  };

  // MovingObject.prototype.collideWith = function(otherObject) {
  //   //console.log("In moving objects")
  //   // this.game.remove(otherObject);
  //   // this.game.remove(this);
  // };

})();
