* `then()`  synchronously returns a promise
* A thenable is a promise-like object with a `then()`  method. This term is used to indicate a promise that is foreign to the particular promise implementation in use.
* `onFulfilled` and `onRejected`are invoked asynchronously
* If a throw is called from `onFulfilled` or `onRejected` handler, the promise returned by `then()` will be automatically reject, with the exception thrown as the rejection reason. It means that with promises, errors will propagate through the chain.

## ES6 Promises

### Static methods if the Promise object

* `Promise.resolve(obj)`: Creates a new promise from a thenable or a value
* `Promise.reject(err)`: Creates a promise that rejects with err as a reason
* `Promise.all(iterable)`: Creates a promise that fulfills with an iterable of fulfillment values when every item in the iterable object fulfills, and rejects with the first rejectio reason if any item rejects. Each item in the iterable object can be a promise, a generic thenable or a value
* `Promise.race(iterable)`: Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects with value mor reason from that promise.

### Methods of promise instance:

* `promise.then(onFullfilled,onRejected)`: Essential method of a promise
* `promise.catch(onRejected)`: This is just syntactic sugar for `promise.then(onFullfilled,onRejected)`

### Sequential iteration pattern

It dinamically builds a chain of promises using a loop.

Standard:

```js
let tasks = [...]
let promise = Promise.resolve(); // empty promise as entry point
tasks.forEach(task => {
    promise = promise.then(()=> task())
})
promise.then(()=>{
    // ... All Tasks completed
})
```

Compact mode: 

```js
let tasks = [...]
let promise = tasks.reduce((acc, task) => (
    prev.then(() => task())
), Promise.resolve())
promise.then(()=>{
    // ... All Tasks completed
})
```


### Paralell execution

Just using `Promise.all([task1, task2, task3])`

### Limited paralell execution

There isnt a native way in ES6 to limit the number of concurrent tasks.
It's similar that with callbacks but switching them for `then`


### Callback vs Promises in public APIs

#### Approach 1

Offering a simple API that is only based on callbacks and leave the developer the option to promisifythe exposed functions if needed.

#### Approach 2

It also offers a callback-oriented API, but it makes the callback argument optional. Whenever the callback is passed as an argument , the function will behave normally, executing the callback on completion or on failure. 
When the callback is not passed, the function will inmediatelly return a Promise object. 
It combines callbacks and Promises without the need of promisifying.

Check example in approach2-library.js