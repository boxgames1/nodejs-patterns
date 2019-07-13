function promisify(callbackBasedApi) {
  return function promisified() {
    // promisified version of callbackBasedApi
    const args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      args.push((err, result) => {
        if (err) {
          return reject(err);
        }
        if (arguments.length <= 2) {
          resolve(result);
        } else {
          resolve([].slice.call(arguments, 1));
        }
      });
      callbackBasedApi.apply(null, args);
    });
  };
}

const fs = require("fs");
const fileName = "README.md";

// Standard
const readFile = fs.readFile;
readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  return;
});

// Promisified
const readFilePromisified = promisify(fs.readFile);
readFilePromisified(fileName) //returns the promise
  .then(value => {
    console.log(typeof value);
    return value;
  })
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.log(err);
  });

// Failing case
readFilePromisified(`${fileName}2`)
  .then(value => {
    console.log(typeof value);
    return value;
  })
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.log(err);
  });
