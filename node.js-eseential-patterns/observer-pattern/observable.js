/**
 * In OOP it requires interfaces. In node is much simpler.
 * It comes in the core with the EventEmitter class
 */

const EventEmitter = require("events").EventEmitter;
const fs = require("fs");

class FindPattern extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
    return this; // this is needed to allow chaining
  }

  find() {
    this.files.forEach(file => {
      fs.readFile(file, "utf8", (err, content) => {
        if (err) return this.emit("error", err);
        this.emit("fileread", file);
        let match;
        if ((match = content.match(this.regex))) {
          match.forEach(elem => this.emit("found", file, elem));
        }
      });
    });
    return this; // this is needed to allow chaining
  }
}

const file = "README.md";
const regex = /.*?# Node.*?/;

const findPatternObj = new FindPattern(regex);

findPatternObj
  .addFile(file)
  .find()
  .on("fileread", file => console.log("file was read: ", file))
  .on("found", (file, match) => console.log("file was found: ", file, match))
  .on("err", err => console.log("error was found: ", err));
