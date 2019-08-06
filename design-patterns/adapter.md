## Adapter pattern

It allows us to access the functionallity of an object so it can be used by components expecting a different interface.
The most common implementation technique is composition, where the methods of the adapter provides a bridge to the methods of the adaptee.
Example: bridging `readFile` and `writeFile` with `db.get` and `db.put` respectively.