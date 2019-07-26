class Star {
    constructor(x, y, speed, ctx) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    draw() {
        let col = 50 * this.speed;
        this.ctx.fillStyle = `rgb(${col}, ${col}, ${col})`;
        this.ctx.fillRect(this.x, this.y, 2, 2);
        this.x -= this.speed;
        if (this.x < 0) this.x = window.innerWidth;
    }

    static createRandom(ctx) {
        return new Star(
            Math.ceil(Math.random() * window.innerWidth),
            Math.ceil(Math.random() * window.innerHeight), 
            Math.ceil(Math.random() * 5),
            ctx);
    }
}

class Renderer {
    constructor() {
        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        
        this.stars = [];
        for(let i=0; i<100; i++) {
            this.stars.push(Star.createRandom(this.ctx));
        }
    }

    clearScreen() {
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clearScreen();
        this.stars.forEach(s => s.draw());
    }

    run() {
        this.renderLoop = setInterval(this.draw.bind(this), 50);
    }
}

let r = new Renderer();
r.run();