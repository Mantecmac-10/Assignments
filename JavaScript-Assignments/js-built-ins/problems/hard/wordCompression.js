/*
  Write a function `compressWords` which takes an array of strings as input and returns a new array with consecutive duplicate elements compressed. If an element appears consecutively, it is replaced by the element followed by the count of its occurrences.

  Example:
  - Input: ["apple", "apple", "banana", "banana", "banana", "cherry", "apple", "apple"]
  - Output: ["apple2", "banana3", "cherry", "apple2"]

  - Input: ["cat", "dog", "dog", "dog", "cat"]
  - Output: ["cat", "dog3", "cat"]

  - Input: ["one", "two", "three"]
  - Output: ["one", "two", "three"]

  - Input: []
  - Output: []

  Note:
  - The function should handle empty arrays and arrays with no consecutive duplicates.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressWord`
*/

function compressWords(arr) {
  // Your code here
  let newarr = [];
  for (i = 0; i < arr.length; i++) {
    let count = 1;
    while (arr[i] === arr[i + 1]) {
      count++;
      i++;
    }
    if (count > 1) {
      newarr.push(arr[i] + count);
    }

    if (count === 1) {
      newarr.push(arr[i]);
    }
  }
  return newarr;
}

module.exports = compressWords;
