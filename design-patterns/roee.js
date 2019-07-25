const EventEmitter = require("events");

class Roee extends EventEmitter {
  constructor(executor) {
    super();
    const emit = this.emit.bind(this);
    // emit can only be used with the executor
    this.emit = undefined;
    executor(emit);
  }
}

const ticker = new Roee(emit => {
  let tickCount = 0;
  setInterval(() => emit("tick", tickCount++), 1000);
});

ticker.on("tick", count => console.log(count, "Tick"));

// ticker.emit is undefined
// ticker.emit("Something",{}) also fails
