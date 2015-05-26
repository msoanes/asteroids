(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var randomX = 0.5 - Math.random();
    var randomY = 0.5 - Math.random();
    var randomLength = Math.sqrt(randomX * randomX + randomY * randomY);

    var ratio = length / randomLength;
    return [randomX * ratio, randomY * ratio];
  };

})();





// var canvas = document.getElementById('canvas');
// var c = canvas.getContext('2d');
// c.fillStyle = "red";
// c.beginPath();
// c.arc(
//   200,
//   300,
//   20,
//   0,
//   2 * Math.PI,
//   false
// );
//
// c.fill();
