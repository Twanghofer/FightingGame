import { canvas, c, unit } from "./globals.js";
import { Sprite, Fighter } from "./classes.js";
import checkCollision from "./functions.js";

//get DPI
let dpi = window.devicePixelRatio;

//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas)
  .getPropertyValue("height")
  .slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(canvas)
  .getPropertyValue("width")
  .slice(0, -2);
//scale the canvas
canvas.setAttribute("height", style_height * dpi);
canvas.setAttribute("width", style_width * dpi);

//instantiate player
const player = new Fighter({
  position: {
    x: 50,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  src: "./img/fighter/Idle.png",
  framesMax: 8,
  scale: 2,
  offset: {
    x: 215,
    y: 120,
  },
  sprites: {
    idle: {
      src: "./img/fighter/Idle.png",
      framesMax: 8,
    },
    run: {
      src: "./img/fighter/Run.png",
      framesMax: 8,
    },
    jump: {
      src: "./img/fighter/Jump.png",
      framesMax: 2,
    },
  },
  healthbar: document.querySelector("[data-healthbar-player]"),
});

//instantiate enemy
const enemy = new Fighter({
  position: {
    x: 500,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  src: "./img/fighter/Idle.png",
  framesMax: 8,
  scale: 2,
  healthbar: document.querySelector("[data-healthbar-enemy]"),
});

const stage = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  scale: 0.8,

  src: "./img/background.jpg",
});

const input = {
  left: false,
  right: false,
};

//player vars
const moveSpeed = 8;

function animate() {
  //clear canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  stage.update();
  player.update();
  enemy.update();

  //vertical movement player
  player.velocity.x = 0;
  if (input.right && input.left) player.velocity.x = 0;
  else if (input.right) player.velocity.x = moveSpeed;
  else if (input.left) player.velocity.x = -moveSpeed;

  //animation
  if (player.velocity.y !== 0) player.setAnimation(player.sprites.jump);
  else if (player.velocity.x !== 0) player.setAnimation(player.sprites.run);
  else {
    player.setAnimation(player.sprites.idle);
  }

  window.requestAnimationFrame(animate);
}

animate();

window.onkeydown = (e) => {
  switch (e.key) {
    case "a":
      input.left = true;
      break;
    case "d":
      input.right = true;
      break;
    case " ":
      if (player.velocity.y === 0) {
        player.velocity.y = -player.jumpSpeed;
      }
      break;
    case "c":
      //detect collision
      if (checkCollision(player, enemy)) player.attack(enemy);
      break;
    default:
      break;
  }
};

window.onkeyup = (e) => {
  switch (e.key) {
    case "a":
      input.left = false;
      break;
    case "d":
      input.right = false;
      break;

    default:
      break;
  }
};
