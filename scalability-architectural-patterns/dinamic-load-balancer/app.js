const http = require("http");
const pid = process.pid;
const consul = require("consul")();
const portfinder = require("portfinder");
const serviceType = process.argv[2];
portfinder.getPort((err, port) => {
  const serviceId = serviceType + port;
  // Register new service in the registry
  consul.agent.service.register(
    {
      id: serviceId,
      name: serviceType,
      address: "localhost",
      port: port,
      tags: [serviceType]
    },
    () => {
      // Function to remove the service from registry
      const unregisterService = err => {
        consul.agent.service.deregister(serviceId, () => {
          process.exit(err ? 1 : 0);
        });
      };
      // Call cleanup function on exit
      process.on("exit", unregisterService);
      process.on("SIGINT", unregisterService);
      process.on("uncaughtException", unregisterService);
      // Start server
      http
        .createServer((req, res) => {
          for (let i = 1e7; i > 0; i--) {}
          console.log(`Handling request from ${pid}`);
          res.end(`${serviceType} response from ${pid}\n`);
        })
        .listen(port, () => {
          console.log(`Started ${serviceType} (${pid}) on port ${port}`);
        });
    }
  );
});
