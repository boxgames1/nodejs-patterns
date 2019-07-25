class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }
  start() {
    this.lastTime = process.hrtime();
  }
  end() {
    const diff = process.hrtime(this.lastTime);
    console.log(
      `Timer ${this.label} took ${diff[0]} seconds and ${diff[1]} ns`
    );
  }
}

function createProfiler(label) {
  if (process.env.NODE_ENV === "development") {
    return new Profiler(label);
  } else if (process.env.NODE_ENV === "production") {
    // we dont want logging in prod
    // so thanks to dynamic typing
    // we can do duck typing here
    return {
      start: () => {},
      end: () => {}
    };
  } else {
    throw new Error("Env not set");
  }
}

function getRandomArray(len) {
  const p = createProfiler(`Generating a ${len} items long array`);
  p.start();
  const arr = [].fill(null, len);
  for (let i = 0; i < arr; i++) {
    arr[i] = Math.random();
  }
  p.end();
}

process.env.NODE_ENV = "development";
getRandomArray(1e6);
console.log("Done");

module.exports = createProfiler;
