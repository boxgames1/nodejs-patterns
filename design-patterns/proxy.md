# Proxy pattern

A Proxy (or middleware) is an object that controls the access to another object, called subject.
Proxy and subject have an identical interface.
The proxy pattern involves wrapping actual instances of the subject, thus preserving its state.
It's useful for several circumstances like the folowwing:
- Data validation
- Security
- Caching
- Lazy load
- Logging
- Remote objects

## Techniques for implementing

- Object composition: composition-proxy.js
- Object augmentation (or monkey patching) is probably the most pragmatic way of proxying individual methods of an object and consists of modifying the subject directly by replacing a method with its proxied implementation. Example:
```js
function createProxy(subject){
    const helloOrig = subject.hello;
    subject.hello = () => `${helloOrig.call(this)} world!`
    return subject;
}
```

## Logging writable stream

Example: logging-proxy.js

## Proxy ES6

```js
const scientist = {
    name: 'nikola',
    surname: 'tesla'
}
const uppercaseScientist = new Proxy(scientist, {
    get: (target, property) => target[property].toUpperCase()
})

console.log(uppercaseScientist.name, uppercaseScientist.surname) 
// prints NIKOLA TESLA
```

It allows developers to intercept access to generic attributes in target object

Another clarifying example

```js
const evenNumbers = new Proxy([], {
    get: (target, index) => index * 2,
    has: (target, number) => number % 2 === 0
})

console.log(2 in evenNumbers) // true
console.log(5 in evenNumbers) // false
console.log(evenNumbers[7]) // 14
```