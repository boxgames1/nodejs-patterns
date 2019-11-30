const http = require("http");
const servers = [
  { host: "localhost", port: "8004" },
  { host: "localhost", port: "8003" }
];

let i = 0;

module.exports = (options, callback) => {
  i = (i + 1) % servers.length;
  options.hostname = servers[i].host;
  options.port = servers[i].port;
  // Wrap original http.request to override hostname and port using round robin algorithm
  return http.request(options, callback);
};
