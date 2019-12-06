const WebSocketServer = require("ws").Server;
const redis = require("redis");
const redisSub = redis.createClient(); //Sub connection
const redisPub = redis.createClient(); // Pub connection

const server = require("http").createServer(
  require("ecstatic")({ root: `${__dirname}/www` })
);

const wss = new WebSocketServer({ server: server });

wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("message", msg => {
    console.log(`Message: ${msg}`);
    // When a new message is received from a connected client, we publish a message in the chat_messages channel.
    // We don't directly broadcast the message to clients because the server is subscribed to the same channel
    // so it will come back to us through Redis.
    redisPub.publish("chat_messages", msg);
  });
});

// Server is suscribed to chat_messages channel
redisSub.subscribe("chat_messages");

// Listens messages and broadcasts it to all clients
redisSub.on("message", (channel, msg) => {
  wss.clients.forEach(client => {
    client.send(msg);
  });
});

server.listen(process.argv[2] || 8080);
