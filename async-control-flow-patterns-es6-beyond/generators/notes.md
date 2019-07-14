### Thunks

A thunk used in the generator-based control flow is just a function that partially applies all the arguments of the original function except the callback. The return value is another function that only accepts the callback as an argument. E.g.: the thunkified version of `fs.readFile()` would be as follows:

```js
function readFileThunk(filename, options){
    return function(callback){
        fs.readFile(filename, options, callback)
    }
}
```

It allows to run async functions in a generator synchronously, like an async await and with a sequential execution.


### Paralell execution

Generators are fine for sequential, but they cant be used to parallelize execution. The workaround is using callbacks or promises using `co` library.


### Generator-to-thunk pattern

It converts a generator to a thunk in order to be able to run it in parallel or utilize it for taking advantage of other callback or promise-based control flow algorithms.


### Limited parallel execution

There are several options. Based on the previous, you can also use a Queue (callback or promise-based), async+thunkify, `co-limiter` library or implement a custom algorithm.