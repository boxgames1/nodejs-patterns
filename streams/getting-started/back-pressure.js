/**
 * Usage:
 * curl localhost:8082
 * or
 * entering localhost:8082 in the browser
 */

const Chance = require("chance");
const http = require("http");

const chance = new Chance();

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    function generateMore() {
      while (chance.bool({ likelihood: 95 })) {
        let shouldContinue = res.write(
          chance.string({ length: 16 * 1024 - 1 })
        );
        if (!shouldContinue) {
          console.log("backpressure");
          return res.once("drain", generateMore);
        }
      }
      res.end("\nThe end \n", () => {
        console.log("All data was sent");
      });
    }
    generateMore();
  })
  .listen("8082", () => {
    console.log("Listening on 8082");
  });
