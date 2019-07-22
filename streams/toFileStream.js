const stream = require("stream");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

class ToFileStream extends stream.Writable {
  constructor() {
    super({
      objectMode: true
    });
  }

  _write(chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), err => {
      if (err) return callback(err);
      fs.writeFile(chunk.path, chunk.content, callback);
    });
  }
}

const toFileStream = new ToFileStream();

toFileStream.write({
  path: "file",
  content: "Helloooooooooooo Dolly"
});
toFileStream.write({
  path: "file2",
  content: "Fire in the hol3"
});
toFileStream.write({
  path: "file3",
  content: "Streamssss in the night"
});

toFileStream.end(() => console.log("AllFiles created"));
