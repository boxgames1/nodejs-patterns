const fs = require("fs");
const zlib = require("zlib");
const file = "README.md"; // Select a file over 1GB

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(`${file}.gz`))
  .on("finish", () => console.log("Successfully compressed"));
