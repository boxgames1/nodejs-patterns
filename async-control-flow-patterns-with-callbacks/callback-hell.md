### Callback Hell and closures

* One of the most severe and well-recognized anti-patterns in node and JS in general
* Making bad use of closures can lead to incredibly bad code
* Chained callbacks in a same function is really hard to read
* Substitute with asynchronous code


### Typical example

```js
asyncFoo(err => {
    asyncFoo2(err => {
        asyncFoo3(err => {
            ...
        })
    })
})
```

* It's called pyramid of doom and the most evident problem is the poor readability. Also the overlapping of variables used in different nested levels.
* Closures are good in performance ways but can cause memory leaks very hard to identify because we shouldn't forget that any context referenced by an active closure is retained from garbage collection.


### Callback discipline

* You should exit ASAP using `return` instead executing only the callback
* Avoid completing `if...else` statements
* Keep using modularity to have simpler and shorter functions
* Use named functions instead so much arrow functions. It will keep a more clear code and a better stack trace


### Sequential execution

There are different variations of the flow:

* Executing a set of known tasks in squence, without chaining or propagating results. It passes the callback through the tasks.
* Using the output of a task as the input for the next. Also known as chaining, pipeline or waterfall.
* Iterating over a collection while running an async task on each element, one after the other.

### Sequential iteration pattern

```js
function iterate(index){
    if(index === tasks.length){
        // The return here is crucial to avoid the function to keep running
        return finish(); 
    }
    const task = tasks[index];
    task(function(){
        iterate(index + 1);
    })
}

function finish(){
    // iteration completed
}
iterate(0);
```

NOTE: This type of algorithm becomes really recursive if `task` is a synchronous operation. In such a case, the stack won't unwind at every cicle and there might be a risk of itting the maximum call stack size limit.

* This is a very powerful pattern that can be adapted to several situations