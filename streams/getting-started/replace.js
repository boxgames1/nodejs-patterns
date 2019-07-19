const ReplaceStream = require("./transformStream");

process.stdin
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .pipe(process.stdout);

/* In console:
    echo Hello World! | node replace World Node.js
*/
