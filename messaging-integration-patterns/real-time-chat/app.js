const WebSocketServer = require("ws").Server;

/**
 * create an HTTP server and attach middleware
 * called ecstatic to serve static files.
 * This is needed to serve the client-side resources
 * of our application (JS and CSS)
 */
const server = require("http").createServer(
  require("ecstatic")({ root: `${__dirname}/www` })
);

// Create WS and attach to server
const wss = new WebSocketServer({ server: server });

// Listen connection event
wss.on("connection", ws => {
  console.log("Client connected");
  // Listen for new messages
  ws.on("message", msg => {
    console.log(`Message: ${msg}`);
    // and send to connected clients
    broadcast(msg);
  });
});

/**
 * Iterate through clients and send passed msg
 */
const broadcast = msg => {
  wss.clients.forEach(client => {
    client.send(msg);
  });
};

server.listen(process.argv[2] || 8080);
