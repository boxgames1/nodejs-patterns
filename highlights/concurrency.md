* Even being single thread, node can achieve concurrency, thanks to the non-blocking nature
* A task gives control back to the event loop when it requests a new async operation allowing the event loop to execute another task. That's concurreny
* Synchronous (blocking) operations can not run concurrently in node, unless is interleaved with an async operation or deferred 
* Running multiple asyn tasks in parallel is in straightforward and cheap in terms of resources.  This is one of the most strengths of node.


### Paralell Execution pattern

```js
const tasks = [...]
let completed = 0;
tasks.forEach(
    task => {
        task(()=>{
            if(++completed === tasks.length){
                finish()
            }
        })
    }
)

function finish(){
    // all the tasks completed ...
}
```

- Run a set of async tasks in parallel by spawning them all at once, and then wait for all ofthem to complete by counting the number of times their callbacks are invoked


### Race condition issues

* Problem: The root of the problem is the delay between the invocation of an async operation and the notification of its result. It can lead in data corruption and are very hard to debug. E.g.: Tasks that are downloading files and 2 of them are equal. It 'd download the file twice.
* Solution: Mapping tasks before running to avoid duplications or collisions.
