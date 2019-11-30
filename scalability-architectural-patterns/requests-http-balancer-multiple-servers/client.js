const request = require("./balancedRequest");

for (let i = 10; i >= 0; i--) {
  request({ method: "GET", path: "/" }, res => {
    let str = "";
    res
      .on("data", chunk => {
        str += chunk;
      })
      .on("end", () => {
        console.log(str);
      });
  }).end();
}

/**
 * To run.
 * Go to dinamic-load-balancer and execute:
 * node app 8003
 * node app 8004
 * Then in this folder execute:
 * node client
 *
 * You should notice how each request goes to a different server
 *
 * This is feasable without a reverse proxy and can be optimized adding a service registry
 */
