const Invoker = require("./invoker");
const createSendStatusCmd = require("./command");
const statusUpdateService = require("./target");

const invoker = new Invoker();
const command = createSendStatusCmd(statusUpdateService, "Hi!");

function test() {
  invoker.run(command);
  invoker.undo();
  invoker.delay(command, 1000 * 60 * 60);
  invoker.runRemotely(command);
}

test();
