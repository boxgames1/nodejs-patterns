class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket;
    // Two empty lists that will contain middleware functions
    this.inboundMiddleware = [];
    this.outboundMiddleware = [];
    // Starts listening
    socket.on("message", message => {
      this.executeMiddleware(this.inboundMiddleware, {
        data: message
      });
    });
  }

  /**
   * Executes the middleware when a new message
   * is sent through the socket
   * @param {*} data
   */
  send(data) {
    const message = {
      data
    };
    this.executeMiddleware(this.outboundMiddleware, message, () => {
      this.socket.send(message.data);
    });
  }

  /**
   * Appends middleware functions to pipelines
   * @param {Array} middleware
   */
  use(middleware) {
    if (middleware.inboud) {
      this.inboundMiddleware.push(middleware.inboud);
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound);
    }
  }

  /**
   * Executes the middleware functions
   *
   * @param {Array} middleware
   * @param {*} arg
   * @param {Function} finish
   */
  executeMiddleware(middleware, arg, finish) {
    function iterator(index) {
      if (index === middleware.length) {
        return finish && finish();
      }
      middleware[index].call(this, arg, err => {
        if (err) {
          return console.error(`There was an error: ${err.message}`);
        }
        iterator.call(this, ++index);
      });
    }
    iterator.call(this, 0);
  }
}

module.exports = ZmqMiddlewareManager;
