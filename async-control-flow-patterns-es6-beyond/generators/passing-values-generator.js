function* twoWay() {
  const arg = yield "Pow";
  return yield Math.pow(arg, arg);
}

const callPow = twoWay();
console.log(callPow.next());
console.log(callPow.next(4));

// We can also use a throw

const callPow2 = twoWay();
console.log(callPow2.next());
callPow2.throw(new Error("Forced error"));
