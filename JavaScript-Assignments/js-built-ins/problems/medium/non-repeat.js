/*
  Write a function `nonrepeat` which takes a string as input and returns the first non-repeating character in the string.

  What is a non-repeating character?
  - A character that appears only once in the entire string.

  Example:
  - Input: "abcab"
  - Output: "c"

  - Input: "aabbcc"
  - Output: null

  - Input: "abcdef"
  - Output: "a"

  - Input: ""
  - Output: null

  Once you've implemented the logic, test your code by running
  - `npm run test-nonrepeat`
*/
const nonrepeat = (str) => {
    const chars = str.split("");

    const firstUnique = chars.find((char) => {
        return str.indexOf(char) === str.lastIndexOf(char);
    });

    return firstUnique || null;
};
module.exports = nonrepeat;
