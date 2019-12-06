const level = require("level");
const timestamp = require("monotonic-timestamp");
const JSONStream = require("JSONStream");
const amqp = require("amqplib");
const db = level("./msgHistory");

require("http")
  .createServer((req, res) => {
    res.writeHead(200);
    db.createValueStream()
      .pipe(JSONStream.stringify())
      .pipe(res);
  })
  .listen(8090);

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
  .then(() => channel.assertQueue("chat_history"))
  // Create queue, durable by default
  .then(q => {
    queue = q.queue;
    // Bind queue to the chat exchange
    return channel.bindQueue(queue, "chat");
  })
  .then(() => {
    // Listen for messages
    return channel.consume(queue, msg => {
      const content = msg.content.toString();
      console.log(`Saving message: ${content}`);
      // Store in history db
      db.put(timestamp(), content, err => {
        //  If the ACK (acknowledgment) is not received by the broker, the message is kept in the queue for being processed again.
        if (!err) channel.ack(msg);
      });
    });
  })
  .catch(err => console.log(err));
