## Revealing contstructor

Used by some core libraries such as `Promise`

```js
const promise = new Promise((resolve, reject) => {
    // ...
})
```

It accepts a function in the constructor, which is called the *executor function*. It serves a mechanism to expose `resolve` and `reject` to change the internal state, which are the only public code, and the only that is able to change the internal state. Once the object is constructed it can be passed around safely.

Example: roee.js

Apart of promise it's hard to find common use cases like `Promise`
