const stream = require("stream");
const Chance = require("chance");

const chance = new Chance();

class RandomString extends stream.Readable {
  constructor(options) {
    super(options);
  }

  // size is an advisory parameter
  _read(size) {
    const chunk = chance.string();
    console.log(`Pushing chunk of size ${chunk.length}`);
    this.push(chunk, "utf8");
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

const randomString = new RandomString();

randomString.on("readable", () => {
  let chunk;
  while ((chunk = randomString.read()) !== null) {
    console.log(`Chunk received: ${chunk.length}`);
  }
});

randomString.on("data", chunk => {
  console.log(chunk.toString());
});
