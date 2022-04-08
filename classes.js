import { canvas, c, gravity, unit } from "./globals.js";

export class Sprite {
  constructor({
    position,
    src,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = src;
    this.scale = scale;

    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;

    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.animateFrames();
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) this.framesCurrent++;
      else this.framesCurrent = 0;
    }
  }
}

export class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    src,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    healthbar,
    sprites,
  }) {
    super({
      position,
      src,
      scale,
      framesMax,
      offset,
    });

    this.velocity = velocity;
    this.attackBox = {
      position: this.position,
      width: unit * 1,
      height: unit / 2,
    };

    this.damage = 15;
    this.jumpSpeed = 20;
    this.health = 100;
    this.healthbar = healthbar;

    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;

    this.sprites = sprites;
  }

  update() {
    this.draw();
    this.animateFrames();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.healthbar.style.width = `${this.health}%`;

    //check if object would go out of screen
    if (this.position.y + this.height >= canvas.height) {
      this.velocity.y = 0;
      return;
    }

    //add gravity
    this.velocity.y += gravity;
  }

  attack(fighter) {
    fighter.health -= this.damage;

    if (fighter.health < 0) fighter.health = 0;
  }

  setAnimation(animation) {
    if (this.image.getAttribute("src") == animation.src) return;

    this.framesCurrent = 0;
    this.image.src = animation.src;
    this.framesMax = animation.framesMax;
  }
}
