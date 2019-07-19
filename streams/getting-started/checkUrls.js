const fs = require("fs");
const split = require("split");
const request = require("request");
const ParallelStream = require("./parallelStream");

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(
    new ParallelStream((url, enc, push, done) => {
      if (!url) return done && done();
      request.head(url, (err, response) => {
        push(`${url} is ${err ? "down" : "up"} \n`);
        done && done();
      });
    })
  )
  .pipe(fs.createWriteStream("results.txt"))
  .on("finish", () => console.log("All urls were checked"));

// Execution in CLI: node checkUrls urlList.txt
// Results order should be different in each execution
// as they are async sequential jobs.
