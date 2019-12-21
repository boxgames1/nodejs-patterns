const cluster = require("cluster");
const os = require("os");

// Only fork into workers the master thread
if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Clustering to ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    // Create one worker by CPU
    // Each worker will have his own event loop, memory space and loaded modules
    cluster.fork();
  }
  cluster.on("exit", (worker, code) => {
    // worker finished because of an error
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log("Worker crashed. Starting a new one");
      cluster.fork();
    }
  });
  //signal of workers restart
  process.on("SIGUSR2", () => {
    const workers = Object.keys(cluster.workers);
    console.log("workers: ", workers);

    //recursive function over workers
    const restartWorker = workerIndex => {
      if (workerIndex >= workers.length) return;
      const worker = cluster.workers[workers[workerIndex]];
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect(); // disconnect task
      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        // when the worker was disconnected we can start a new one
        const newWorker = cluster.fork();
        newWorker.on("listening", () => {
          // once the new worker is listerning we can restart the next worker
          restartWorker(workerIndex + 1);
        });
      });
    };
    restartWorker(0);
  });
} else {
  // Workers will enter app
  require("./app");
}

/**
 * node clusteredApp
 * ps af to find the master process
 * kill -SIGUSR2 <PID>
 * execute siege -c200 -t10S http://localhost:8080 from CLI to check load
 */
