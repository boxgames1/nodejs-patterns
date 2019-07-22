/**
 * Usage:
 * curl localhost:8080
 * or
 * entering localhost:8080 in the browser
 */

const Chance = require("chance");
const http = require("http");

const chance = new Chance();

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    while (chance.bool({ likelihood: 95 })) {
      res.write(chance.string() + "\n");
    }
    res.end("\nThe end \n");
    res.on("finish", () => {
      console.log("All data was sent");
    });
  })
  .listen("8080", () => {
    console.log("Listening on 8080");
  });
