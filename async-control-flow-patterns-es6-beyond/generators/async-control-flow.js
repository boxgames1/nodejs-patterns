const fs = require("fs");

function asyncFlow(generatorFn) {
  function callback(err) {
    if (err) {
      return generator.throw(err);
    }
    const results = [].slice.call(arguments, 1);
    //Callback is called after every execution and is the one who goes for the next iteration
    generator.next(results.length > 1 ? results : results[0]);
  }
  const generator = generatorFn(callback);
  generator.next();
}

function* cloneGen(callback) {
  const fileName = "README.md";
  const myself = yield fs.readFile(fileName, "utf8", callback);
  yield fs.writeFile(`clone_of_${fileName}`, myself, callback);
  console.log("Clone created");
}

asyncFlow(cloneGen);
