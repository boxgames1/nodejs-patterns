// This represents a transient node in the architecture
const zmq = require("zeromq");
const crypto = require("crypto");
const fromVentilator = zmq.socket("pull");
const toSink = zmq.socket("push");

// Sockets will connect to a remote node
// instead of listening for the incoming connections
fromVentilator.connect("tcp://localhost:5016"); // PULL socket
toSink.connect("tcp://localhost:5017"); // PUSH socket

fromVentilator.on("message", buffer => {
  // For each message received, it iterates over the batch of words it contains,
  // then for each word it calculates the SHA1 checksum and tries to match it
  // against searchHash passed with the message.
  // When a match is found, the result is forwarded to the sink

  const msg = JSON.parse(buffer);
  const variations = msg.variations;
  variations.forEach(word => {
    console.log(`Processing: ${word}`);
    const shasum = crypto.createHash("sha1");
    shasum.update(word);
    const digest = shasum.digest("hex");
    if (digest === msg.searchHash) {
      console.log(`Found! => ${word}`);
      toSink.send(`Found! ${digest} => ${word}`);
    }
  });
});
