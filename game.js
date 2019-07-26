"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Star = function () {
    function Star(x, y, speed, ctx) {
        _classCallCheck(this, Star);

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.starSize = 5 - Math.round(5 / speed);
    }

    _createClass(Star, [{
        key: "draw",
        value: function draw() {
            var col = 50 * this.speed;
            this.ctx.fillStyle = "rgb(" + col + ", " + col + ", " + col + ")";
            this.ctx.fillRect(this.x, this.y, this.starSize, this.starSize);
            this.x -= this.speed;
            if (this.x < 0) this.x = window.innerWidth;
        }
    }], [{
        key: "createRandom",
        value: function createRandom(ctx) {
            return new Star(Math.ceil(Math.random() * window.innerWidth), Math.ceil(Math.random() * window.innerHeight), Math.ceil(Math.random() * 5), ctx);
        }
    }]);

    return Star;
}();

var Renderer = function () {
    function Renderer() {
        _classCallCheck(this, Renderer);

        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        this.stars = [];
        for (var i = 0; i < 100; i++) {
            this.stars.push(Star.createRandom(this.ctx));
        }
    }

    _createClass(Renderer, [{
        key: "clearScreen",
        value: function clearScreen() {
            this.ctx.fillStyle = "rgb(0, 0, 0)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, {
        key: "draw",
        value: function draw() {
            this.clearScreen();
            this.stars.forEach(function (s) {
                return s.draw();
            });
        }
    }, {
        key: "run",
        value: function run() {
            this.renderLoop = setInterval(this.draw.bind(this), 50);
        }
    }]);

    return Renderer;
}();

var r = new Renderer();
r.run();
