const zmq = require("zeromq");
const ZmqMiddlewareManager = require("./zmqMiddleware");
const jsonMiddleware = require("./jsonMiddleware");
const request = zmq.socket("req");

async function run() {
  await request.connect("tcp://127.0.0.1:7000");

  const zmqm = new ZmqMiddlewareManager(request);
  zmqm.use(jsonMiddleware.json());

  zmqm.use({
    inbound: function(message, next) {
      console.log("Echoed back: ", message.data);
      next();
    }
  });

  setInterval(() => {
    zmqm.send({ action: "ping", echo: Date.now() });
  }, 1000);
}

run();
