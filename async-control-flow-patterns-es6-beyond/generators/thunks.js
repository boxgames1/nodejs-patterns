const fs = require("fs");

function asyncFlowWithThunk(generatorFn) {
  function callback(err) {
    if (err) {
      return generator.throw(err);
    }
    const results = [].slice.call(arguments, 1);
    const thunk = generator.next(results.length > 1 ? results : results[0])
      .value;
    thunk && thunk(callback);
  }
  const generator = generatorFn(callback);
  const thunk = generator.next().value;
  thunk && thunk(callback);
}

function* cloneGen(callback) {
  const fileName = "README.md";
  const myself = yield fs.readFile(fileName, "utf8", callback);
  yield fs.writeFile(`clone_of_${fileName}`, myself, callback);
  console.log("Clone created");
}

asyncFlowWithThunk(cloneGen);
