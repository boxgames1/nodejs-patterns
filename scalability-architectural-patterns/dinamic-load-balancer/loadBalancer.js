const http = require("http");
const httpProxy = require("http-proxy");
const consul = require("consul")();

const proxy = httpProxy.createProxyServer({});

const routing = [
  {
    path: "/api",
    service: "api-service",
    index: 0
  },
  {
    path: "/",
    service: "webapp-service",
    index: 0
  }
];

http
  .createServer((req, res) => {
    let route;
    routing.some(entry => {
      // Match URL against route table
      route = entry;
      //Starts with the route path?
      return req.url.indexOf(route.path) === 0;
    });
    // Get list of servers
    consul.agent.service.list((err, services) => {
      const servers = [];
      // Filter services by tag of the required service
      Object.keys(services).filter(id => {
        if (services[id].Tags.indexOf(route.service) > -1) {
          servers.push(`http://${services[id].Address}:${services[id].Port}`);
        }
      });
      // If no servers found with the tag, an error is thrown
      if (!servers.length) {
        res.writeHead(502);
        return res.end("Bad gateway");
      }
      // Update route index pointing to the next server, following a round robin approach
      route.index = (route.index + 1) % servers.length;
      // Select that server
      proxy.web(req, res, { target: servers[route.index] });
    });
  })
  .listen(8080, () => console.log("Load balancer started on port 8080"));
