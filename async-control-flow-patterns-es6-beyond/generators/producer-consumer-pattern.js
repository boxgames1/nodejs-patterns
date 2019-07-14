/**
 * In the TaskQueue class, the workers have the role of consumers
 * while whoever uses pushTask() can be considered a producer.
 * This pattern shows us how a generator can be very similar to
 * a thread (or a process).
 */

const co = require("co");

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.taskQueue = [];
    this.consumerQueue = [];
    this.spawnWorkers(concurrency);
  }
  pushTask(task) {
    if (this.consumerQueue.length !== 0) {
      this.consumerQueue.shift()(null, task);
    } else {
      this.taskQueue.push(task);
    }
  }

  spawnWorkers(concurrency) {
    const self = this;
    for (let i = 0; i < concurrency; i++) {
      // wrapping with co to run in parallel
      co(function*() {
        while (true) {
          const task = yield self.nextTask();
          yield task;
        }
      });
    }
  }

  nextTask() {
    return callback => {
      if (this.taskQueue.length !== 0) {
        return callback(null, this.taskQueue.shift());
      }
      //if no tasks in the queue we push the callback
      // so the worker will be in idle mode
      this.consumerQueue.push(callback);
    };
  }
}
