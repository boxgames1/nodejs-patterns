### Event emitter versus callbacks

* The general differentiating rules is semantic: callbacks should be used when a result must be returned in an async way; events should instead be used when there is a need to communicate that something just happened
* A callback is expected to be called only once

* Pattern. Create a function that accepts a callback and returns EventEmitter. Thus, providing a siimple and clear entry point for the main functionallity, while emitting more fine-grained events using EventEmitter.