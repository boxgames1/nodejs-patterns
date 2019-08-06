const zmq = require("zeromq");
const ZmqMiddlewareManager = require("./zmqMiddleware");
const jsonMiddleware = require("./jsonMiddleware");
const reply = zmq.socket("rep");

async function run() {
  await reply.bind("tcp://127.0.0.1:7000");
  const zmqm = new ZmqMiddlewareManager(reply);
  zmqm.use(jsonMiddleware.json());

  zmqm.use({
    inbound: function(message, next) {
      console.log("Received: ", message.data);
      if (message.data.action === "ping") {
        this.send({ action: "pong", echo: message.data.echo });
      }
      next();
    }
  });
}

run();
