// Requirement: Having a rabbit running on local environment

const WebSocketServer = require("ws").Server;
const server = require("http").createServer(
  require("ecstatic")({ root: `${__dirname}/www` })
);
const level = require("level");
const timestamp = require("monotonic-timestamp");
const JSONStream = require("JSONStream");
const amqp = require("amqplib");
const db = level("./msgHistory");

const port = process.argv[2] || 8080;

let channel, queue;

amqp
  // Establish connection with amqp broker (Rabbit)
  .connect("amqp://localhost")
  // And create channel
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch;
    // Set up fanout exchange, named chat.
    return channel.assertExchange("chat", "fanout");
  })
  .then(() => channel.assertQueue(`chat_srv_${port}`, { exclusive: true }))
  .then(q => {
    queue = q.queue;
    // Bind queue to the chat exchange
    return channel.bindQueue(queue, "chat");
  })
  .catch(err => console.log(err));

const ws = new WebSocketServer({ server: server });

ws.on("connection", ws => {
  console.log("Client connected");
  ws.on("message", msg => {
    console.log(`Message: ${msg}`);
    channel.publish("chat", "", new Buffer(msg));
  });
});

server.listen(port);
