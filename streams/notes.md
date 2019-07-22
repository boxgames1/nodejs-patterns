### Buffers vs Streams

- Buffers only send the data once are chunks are collected
- Streams send data once received even if isn't the entire piece.

Adavantages of streams over Buffers:

- Spatial efficiency

V8 Buffers can not be bigger than 1GB, so you can run out of memory loading big files if using Buffers.
See gzip example

- Time efficiency

For combined operations, with buffers you need to finish the forst one to start the sencond, while with Streams you can start the second operation once you receive the first chunk.

- Composability

Using `pipe()` streams allows  to connect the different processing units, each responsible for one single responsibility.
Streams have a uniform interface. The only prerequisite is that the next stream in the pipeline has to support the data type produced by the previous stream

## Anatomy

Every stream in node is an implementation of one of the four base abstract classes availabel in the node core:

- stream.Readable
- stream.Writable
- stream.Duplex
- stream.Transform

Each one is also an instance of `EventEmitter`. Streams can produce severak types of event, such as `end`, when a readable stream has finished reading, or `error`when goes wrong.

Two modes:

- Binary mode: Data streamed in form of chunk, such as buffers or strings.
- Object mode: Where the streaming data is treated as a sequence of discrete objects (allowing to use almost any JS value).

### Redable streams

It represents a source of data.
Two ways of reading:

- Non-flowing mode 

Attaching a listener to the readable event that signals the availability of new data to read
See non-flowing.js

- Flowing mode 

Attaching a listener to the data event. Doesn't use `read()`, but it's pushed to the data as soon as it arrives.


### Implementing Readable Streams

`read()` is called by the stream consumers
`_read()` must be implemented by a stream subclass and should be never called directly. Underscore indicates that is a private method.

Example: randomString.js

### Writable streams

It uses `write()` to write and `end()` to signal that no more data will be written

Example: writable-server.js


### Backpressure

Streams can also suffer from botttlenecks, where data is written faster than the stream can consume it.
To solve it, you should buffer the incoming data.
`writable.write()` will return false when the internal buffer exceeds the `highWaterMark` limit. It indicates that the applicatioon should stop writting.
When the buffer is emptied, the drain event is emitted, communicating that it's safe to start writting again. 
This mechanism is called * back-pressure * 
Can be also used in readable streams.

Example: back-pressure.js

### Implementing Writable Streams

`writer()` is called by the stream consumers
`_writer()` must be implemented by a stream subclass.

Example: toFileStream.js


### Duplex Stream

- Readable + Writable. 
- Network sockets for example. 
- Inherits the methods of both parent classes. 
- Use `read()` and  `write()`
- `readable` and  `drain events`
- New option. `allowHalfOpen` (defaults to true) that if set to false will cause both parts to end if only one of them does.


### Transform Streams

- Special type of duplex streams to handle data transformations
- In a duplex, there isn't an intermediate relationship between the parts, but Transform, applies some type of transformation to each chunk of data received from Writable.
- Two different methods: `_transform()` and `flush()`

Example: transformStream.js


### Connecting streams with pipes

- They work like the pipe operator in UNIX. E.g.: `echo blahblah | sed s/bla/blo/g`
- In streams: `readable.pipe(writable, [options])` It gets the output of the readable stream and pumps up into the writable stream.
- Writable also ends when readable emits his `end()` event (unless `{end: false}` is specified in the options)
- Piping two streams together will create a *suction* which allow the data to flow and there is no need to control the back-presure anymore as it's automatically taken care of.

Example: replace.js

- Error events are not propagated automatically through the pipeline. In the following example we'll only catch errors from the `stream2` 

```js
stream1
    .pipe(stream2)
    .on('error', () => {})
```

### Unordered parallel execution

Parallel streams cannot be used when the order in which the data is processed is important.

Example: parallelStream.js and checkUrls.js


### Unordered limitedparallel execution

Similar to the previous but adding concurrency contorl.


### Ordered parallel execution

When unordered are not acceptable, we should use other techniques that involve the use of buffer to reoprder chunks whil emitted.
NPM package `through2-parallel` is specific for this purpose


### Combined streams

- When writting into a combined streams, we are writing into the first stream of the pipeline.
- When reading into a combined streams, we are reading from the last stream of the pipeline.
- It has to capture every error in the pipeline as they are not propagated.

Example: combinedStreams.js/archive.js