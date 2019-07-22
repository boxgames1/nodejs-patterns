const fs = require("fs");
const zlib = require("zlib");
const file = "README.md"; // Select a file over 1GB

fs.readFile(file, (err, buffer) => {
  if (err) console.log(err);
  zlib.gzip(buffer, (err, buffer) => {
    if (err) console.log(err);
    fs.writeFile(`${file}.gz`, buffer, err => {
      if (err) console.log(err);
      console.log("successfully compressed");
    });
  });
});
