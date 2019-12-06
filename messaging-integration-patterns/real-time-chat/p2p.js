const args = require("minimist")(process.argv.slice(2));
const zmq = require("zeromq");
const WebSocketServer = require("ws").Server;

const pubSocket = zmq.socket("pub"); // PUB socket
pubSocket.bind(`tcp://127.0.0.1:${args["pub"]}`); // Binded to passed port as arg

const subSocket = zmq.socket("sub"); // SUB socket
const subPorts = [].concat(args["sub"]); // Get SUB ports from args
subPorts.forEach(p => {
  console.log(`Subscribing to ${p}`);
  // Connect SUB ports to the PUB sockets of the other instances of our application
  subSocket.connect(`tcp://127.0.0.1:${p}`);
});

const server = require("http").createServer(
  require("ecstatic")({ root: `${__dirname}/www` })
);

const ws = new WebSocketServer({ server: server });

// Set chat as filter
subSocket.subscribe("chat");

ws.on("message", msg => {
  // When a new message is received by our WebSocket,
  // we broadcast it to all the connected clients
  console.log(`Message: ${msg}`);
  broadcast(msg);
  // we also publish it through our PUB socket using chat as aprefix followed by a space,
  // so the message will be published to all the
  // subscriptions using chat as a filter
  pubSocket.send(`chat ${msg}`);
});

subSocket.on("message", msg => {
  // We start listening for messages that arrive at our SUB socket,
  // we do some simple parsing of the message to remove the chat prefix,
  // and then we broadcast it to all the clients connected to the current WebSocket server
  console.log(`From other server: ${msg}`);
  broadcast(msg.toString().split(" ")[1]);
});

const broadcast = msg => {
  wss.clients.forEach(client => {
    client.send(msg);
  });
};

server.listen(args["http"] || 8080);

/* Run this file with 3 instances:
 * node p2p --http 8080 --pub 5000 --sub 5001 --sub 5002
 * node p2p --http 8081 --pub 5001 --sub 5000 --sub 5002
 * node p2p --http 8082 --pub 5002 --sub 5000 --sub 5001
 */
