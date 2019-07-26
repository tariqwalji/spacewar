class Star {
    constructor(x, y, speed, world) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.starSize = 5 - Math.round(5/speed);
        this.angle = world.playerDirection;
    }

    draw() {
        let col = 50 * this.speed;
        this.world.ctx.fillStyle = `rgb(${col}, ${col}, ${col})`;
        this.world.ctx.fillRect(this.x, this.y, this.starSize, this.starSize);
        this.x += Math.sin(this.world.playerDirection) * (this.speed + this.world.playerSpeed);
        this.y += Math.cos(this.world.playerDirection) * (this.speed + this.world.playerSpeed);

        if (this.x < 0) this.x = window.innerWidth;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y > window.innerHeight) this.y = 0;

    }

    static createRandom(world) {
        return new Star(
            Math.ceil(Math.random() * window.innerWidth),
            Math.ceil(Math.random() * window.innerHeight), 
            Math.ceil(Math.random() * 5),
            world);
    }
}

class World {
    constructor() {
        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.playerSpeed = 10;
        this.playerSpeed = 5;
        this.playerDirection = Math.PI;

        this.playerImage = new Image(114, 114);
        this.playerImage.src = "spaceshooter_ByJanaChumi/items/8.png";
        
        this.stars = [];
        for(let i=0; i<100; i++) {
            this.stars.push(Star.createRandom(this));
        }
    }

    clearScreen() {
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clearScreen();
        this.stars.forEach(s => s.draw());

        this.ctx.save();
        this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
        this.ctx.rotate(1 - (2*Math.PI) * this.playerDirection);
        this.ctx.drawImage(this.playerImage, 0-(this.playerImage.width/2), 0-(this.playerImage.height/2));
        this.ctx.restore();
    }

    run() {
        this.renderLoop = setInterval(this.draw.bind(this), 50);
        document.addEventListener("keydown", e => {
            switch(e.code) {
                case "ArrowUp":
                    this.playerSpeed++;
                    if(this.playerSpeed > 10) this.playerSpeed = 10;
                    break;
                case "ArrowDown":
                        this.playerSpeed--;
                        if(this.playerSpeed < 2) this.playerSpeed = 2;
                        break;
                case "ArrowLeft":
                    this.playerDirection += (Math.PI/360)*this.playerSpeed;
                    if(this.playerDirection > 2*Math.PI) this.playerDirection = 0;
                    break;
                case "ArrowRight":
                    this.playerDirection -= (Math.PI/360)*this.playerSpeed;
                    if(this.playerDirection < 0) this.playerDirection = 2*Math.PI;
                    break;
                }
        });
    }
}

let w = new World();
w.run();