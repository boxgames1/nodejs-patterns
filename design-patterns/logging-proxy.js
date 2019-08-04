function createLoggingWritable(writableOrig) {
  const proto = Object.getPrototypeOf(writableOrig);
  function LoggingWritable(writableOrig) {
    this.writableOrig = writableOrig;
  }
  LoggingWritable.prototype = Object.create(proto);

  // Overwrite write method
  LoggingWritable.prototype.write = function(chunk, encoding, callback) {
    if (!callback && typeof encoding === "function") {
      callback = encoding;
      encoding = undefined;
    }
    console.log("Writing", chunk);
    return this.writableOrig.write(chunk, encoding, function() {
      console.log("Finished writing", chunk);
      callback && callback();
    });
  };

  // Delegated methods, not overwritten
  LoggingWritable.prototype.on = function() {
    return this.writableOrig.on.apply(this.writableOrig, arguments);
  };
  LoggingWritable.prototype.end = function() {
    return this.writableOrig.end.apply(this.writableOrig, arguments);
  };

  return new LoggingWritable(writableOrig);
}

const fs = require("fs");

const writable = fs.createWriteStream("test.txt");
const writableProxy = createLoggingWritable(writable);
writableProxy.write("First Chunk");
writableProxy.write("Second Chunk");
writableProxy.write("Third Chunk");
writable.write("Not logged");
writableProxy.end();
