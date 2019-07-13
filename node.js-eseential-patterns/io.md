`process.tick(function)`
 Defers the execution of a function until the next pass of the event loop. It takes a callback as an argument and pushes it to the top of the event queue, in front of any pending I/O event, and returns inmediately. The callback will be invoked as soon as the event loop runs again. It has danger if has the chance of cut a recursive call


`setInmediate(function)`
Similar to the previous, but with the difference that with this, the execution is queued behind any I/O event that is already in the queue



