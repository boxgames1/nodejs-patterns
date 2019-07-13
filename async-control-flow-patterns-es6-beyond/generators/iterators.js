function* iteratorGenerator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

const numbers = new Array(10).fill().map((value, index) => index + 1);
const iterator = iteratorGenerator(numbers);
let currentItem = iterator.next();
while (!currentItem.done) {
  console.log(currentItem);
  currentItem = iterator.next();
}
