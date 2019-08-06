## Strategy

It enables an object called *context* to support variations in its logic by extracting the variable parts into separate, interchangeable objects called strategies.

Particularly useful in all those situations where supporting variations of an algorithm requires complex conditional logic like lots of `if..else` or `switch`. Or mixing together different algorithms of the same family. 

### Multi-format configuration objects

Example: config.js
Having different strategies to serialize and deserialize.