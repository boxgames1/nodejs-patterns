const zmq = require("zeromq");
const variationsStream = require("variations-stream");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const BATCH_SIZE = 10000;
const maxLength = process.argv[2];
const searchHash = process.argv[3];

// Create PUSH socket and bind to 5000 port
const ventilator = zmq.socket("push");
ventilator.bindSync("tcp://*:5000");
let batch = [];

variationsStream(alphabet, maxLength)
  .on("data", combination => {
    console.log(combination);

    batch.push(combination);
    // Group the generated variations in batches of 10,000 items
    if (batch.length === BATCH_SIZE) {
      const msg = { searchHash: searchHash, variations: batch };
      // Send task object to the next available worker
      ventilator.send(JSON.stringify(msg));
      batch = [];
    }
  })
  .on("end", () => {
    //send remaining combinations
    const msg = { searchHash: searchHash, variations: batch };
    ventilator.send(JSON.stringify(msg));
  });

/**
 * To run:
 * node worker
 * node worker
 * node worker
 * node sink
 * node ventilator [chars] [searchSHA1]
 */
