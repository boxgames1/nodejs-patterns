function createProxy(subject) {
  const proto = Object.getPrototypeOf(subject);

  function Proxy(subject) {
    this.subject = subject;
  }

  Proxy.prototype = Object.create(proto);

  //proxied method
  Proxy.prototype.hello = function() {
    return `${this.subject.hello()} world!`;
  };

  //delegated method
  Proxy.prototype.goodbye = function() {
    return this.subject.goodbye.apply(this.subject, arguments);
  };

  return new Proxy(subject);
}

// or

function createProxy(subject) {
  return {
    // proxied method
    hello: () => `${subject.hello()} world!`,
    // delegated method
    goodby: () => subject.goodbye.apply(subject, arguments)
  };
}
