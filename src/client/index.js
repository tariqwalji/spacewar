import spaceship from "./assets/spaceships_spritesheet.png";
import Phaser from "Phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade"
  }
}

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet("ships", spaceship, {frameWidth: 32, frameHeight: 32});

  this.anims.create({
    key: "ship1",
    frames: [ { key: "ships", frame: 1 }],
    frameRate: 1
  });  
}

function create() {
   this.physics.add.sprite(100, 100, "ship1");
}

function update() {

}