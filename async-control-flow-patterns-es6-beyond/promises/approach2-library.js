function asyncdivision(dividend, divisor, callback) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      const result = dividend / divisor;
      if (isNaN(result) || !Number.isFinite(result)) {
        const error = new Error("Invalid operands");
        if (callback) {
          callback(error);
        }
        return reject(error);
      }
      if (callback) {
        callback(null, result);
      }
      return resolve(result);
    });
  });
}

// No callback case

let result;
asyncdivision(4, 2)
  .then(value => {
    console.log(value);
    result = value;
  })
  .catch(err => console.log(err));

// With callback

asyncdivision(4, 2, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(value);
  result = value;
});

// Error management

asyncdivision(4, 0)
  .then(value => {
    console.log(value);
    result = value;
  })
  .catch(err => console.log(err));

asyncdivision(4, 0, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(value);
  result = value;
});

module.exports = asyncdivision;
