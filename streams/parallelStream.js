const stream = require("stream");

class ParallelStrem extends stream.Transform {
  constructor(userTransform) {
    super({ objectMode: true });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this.push.bind(this));
    this._onComplete.bind(this);
    done();
  }

  _flush(done) {
    if (this.running > 0) this.terminateCallback = done;
    else done();
  }

  _onComplete(err) {
    this.running--;
    if (err) return this.emit("error", err);
    if (this.running === 0) this.terminateCallback && this.terminateCallback();
  }
}

module.exports = ParallelStrem;
