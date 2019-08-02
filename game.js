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
        let col = 15 * this.speed;
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
            Math.ceil(Math.random() * 10),
            world);
    }
}


class Laser {
    constructor(x, y, angle, speed, world) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;

        this.image = new Image(45, 45);
        this.image.src = "spaceshooter_ByJanaChumi/items/bullets/1.png";      
        this.visible = false;  
    }

    draw() {
        if(this.visible) {
            this.x -= Math.sin(this.angle) * this.speed;
            this.y -= Math.cos(this.angle) * this.speed;
    
            this.world.ctx.save();
            this.world.ctx.translate(this.x, this.y);
            this.world.ctx.rotate((2*Math.PI) - this.angle);
            this.world.ctx.drawImage(this.image, 0-(this.image.width/2), 0-(this.image.height/2));
            this.world.ctx.restore();

            if (this.x < 0 || this.y < 0 || this.x > window.innerWidth || this.y > window.innerHeight) {
                this.visible = false;
            }
        }

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
        this.worldWidth = 2000;
        this.worldHeight = 2000;

        this.playerImage = new Image(114, 114);
        this.playerImage.src = "spaceshooter_ByJanaChumi/items/8.png";
        
        this.stars = [];
        for(let i=0; i<300; i++) {
            this.stars.push(Star.createRandom(this));
        }

        this.lasers = [];
        for(let i=0; i<20; i++) {
            this.lasers.push(new Laser(0, 0, 0, 0, this));
        }

        this.isFiring = false;
        this.isRecoil = false;
        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.isSpeedingUp = false;
        this.isSlowingDown = false;

        this.playerWorldPositionX = 10;
        this.playerWorldPositionY = 10;
    }

    clearScreen() {
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleInput() {
        if (this.isFiring && !this.isRecoil) {
            for(let i=0; i<this.lasers.length; i++) {
                if(!this.lasers[i].visible) {
                    this.lasers[i].angle = this.playerDirection;
                    this.lasers[i].x = this.canvas.width/2;
                    this.lasers[i].y = this.canvas.height/2;
                    this.lasers[i].speed = (this.playerSpeed * 4);
                    this.lasers[i].visible = true;
                    this.isRecoil = true;
                    setTimeout(() => {this.isRecoil = false;}, 200);                           
                    break;        
                }
            } 
        }

        if(this.isTurningLeft) {
            this.playerDirection += (Math.PI/360)*this.playerSpeed;
            if(this.playerDirection > 2*Math.PI) this.playerDirection = 0;
        }

        if(this.isTurningRight) {
            this.playerDirection -= (Math.PI/360)*this.playerSpeed;
            if(this.playerDirection < 0) this.playerDirection = 2*Math.PI;
        }

        if(this.isSpeedingUp) {
            this.playerSpeed++;
            if(this.playerSpeed > 10) this.playerSpeed = 10;
        }

        if(this.isSlowingDown) {
            this.playerSpeed--;
            if(this.playerSpeed < 2) this.playerSpeed = 2;
        }       
    }

    draw() {
        this.handleInput();

        this.clearScreen();
        this.stars.forEach(s => s.draw());
        this.lasers.forEach(l => l.draw());

        this.ctx.save();
        this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
        this.ctx.rotate((2*Math.PI) - this.playerDirection);
        this.ctx.drawImage(this.playerImage, 0-(this.playerImage.width/2), 0-(this.playerImage.height/2));
        this.ctx.restore();

        this.ctx.font = "30px Arial Bold";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("World " + this.playerWorldPositionX + ", Y: " + this.playerWorldPositionY, 40, 40);
 
        this.playerWorldPositionX += Math.sin(this.playerDirection) * this.playerSpeed;
        this.playerWorldPositionY += Math.cos(this.playerDirection) * this.playerSpeed;

        if (this.playerWorldPositionX < 0) {
            this.playerWorldPositionX = this.worldWidth;
        }

        if (this.playerWorldPositionY > this.worldWidth) {
            this.playerWorldPositionX = 0;
        }

        if (this.playerWorldPositionY < 0) {
            this.playerWorldPositionY = this.worldHeight;
        }

        if (this.playerWorldPositionY > this.worldHeight) {
            this.playerWorldPositionY = 0;
        }
    }

    run() {
        this.renderLoop = setInterval(this.draw.bind(this), 50);
        document.addEventListener("keydown", e => {
            switch(e.code) {
                case "Space":
                    this.isFiring = true;
                    break;
                case "ArrowUp":
                    this.isSpeedingUp = true;
                    break;
                case "ArrowDown":
                    this.isSlowingDown = true;
                    break;
                case "ArrowLeft":
                    this.isTurningLeft = true;
                    break;
                case "ArrowRight":
                    this.isTurningRight = true;
            }
        });

        document.addEventListener("keyup", e => {
            switch(e.code) {
                case "Space":
                    this.isFiring = false;
                    break;
                case "ArrowUp":
                    this.isSpeedingUp = false;
                    break;
                case "ArrowDown":
                    this.isSlowingDown = false;
                    break;
                case "ArrowLeft":
                    this.isTurningLeft = false;
                    break;
                case "ArrowRight":
                    this.isTurningRight = false;
            }
        });   
    }
}

let w = new World();
w.run();