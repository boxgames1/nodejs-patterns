### Thunks

A thunk used in the generator-based control flow is just a function that partially applies all the arguments of the original function except the callback. The return value is another function that only accepts the callback as an argument. E.g.: the thunkified version of `fs.readFile()` would be as follows:

```js
function readFileThunk(filename, options){
    return function(callback){
        fs.readFile(filename, options, callback)
    }
}
```