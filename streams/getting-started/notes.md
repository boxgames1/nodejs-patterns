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