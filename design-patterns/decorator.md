## Decorator

Similar to proxy, butinstead of enhacing or modyfing the behavior, it augments with new functionalities.

Techniques:

- Composition:

```js
function decorate(component) {
  const proto = Object.getPrototypeOf(component);
  function Decorator(component) {
    this.component = component;
  }
  Decorator.prototype = Object.create(proto);

  // new method
  Decorator.prototype.greetings = () => "Hi!";

  // delegated method
  Decorator.prototype.hello = () =>
    this.component.apply(this.component, arguments);

  return new Decorator(component);
}
```

- Object augmentation

```js
function decorate(component) {
  // new method
  component.greetings = () => "Hi";
  return component;
}
```
