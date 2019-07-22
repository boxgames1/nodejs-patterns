const fs = require("fs");
const combine = require("multipipe");

const compresssAndEncryptStream = require("./combinedStreams")
  .compressAndEncrypt;

combine(
  fs
    .createReadStream(process.argv[3])
    .pipe(compresssAndEncryptStream(process.argv[2]))
    .pipe(fs.createWriteStream(process.argv[3] + ".gz.enc"))
).on("error", err => console.log(err));

// 2 run in the CLI: node archive [password] file.txt
