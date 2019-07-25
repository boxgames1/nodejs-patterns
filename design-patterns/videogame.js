const stampit = require("stampit");

// Base character
const character = stampit().props({
  name: "anonymous",
  lifePoints: 100,
  x: 0,
  y: 0
});

// Behaviors
const mover = stampit().methods({
  move(xIncr, yIncr) {
    this.x += xIncr;
    this.y += yIncr;
    console.log(`${this.name} moved to [${this.x}, ${this.y}]`);
  }
});

const slasher = stampit().methods({
  slash(direction) {
    console.log(`${this.name} slashed to the ${direction}`);
  }
});

const shooter = stampit()
  .props({
    bullets: 6
  })
  .methods({
    shoot(direction) {
      if (this.bullets > 0) {
        --this.bullets;
        console.log(`${this.name} shoot to the ${direction}`);
      } else {
        console.log(`${this.name} is out of bullets`);
      }
    }
  });

// Characters

const runner = stampit.compose(
  character,
  mover
);
const samurai = stampit.compose(
  character,
  mover,
  slasher
);
const sniper = stampit.compose(
  character,
  shooter
);
const gunslinger = stampit.compose(
  character,
  mover,
  shooter
);
const westernSamurai = stampit.compose(
  gunslinger,
  samurai
);

// Instance

const gojiro = new westernSamurai();
gojiro.name = "Pepe";
gojiro.move(1, 3);
gojiro.slash("right");
gojiro.move(7, 2);
gojiro.shoot("left");
gojiro.shoot("front");
gojiro.shoot("back");
gojiro.shoot("right");
gojiro.shoot("left");
gojiro.shoot("front");
gojiro.shoot("back");
gojiro.shoot("right"); // Out of bullets
