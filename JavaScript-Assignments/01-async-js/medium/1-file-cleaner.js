// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");

// Step 1: Read the file
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  // Step 2: Remove extra spaces
  const cleanedData = data.split(/\s+/).join(" ");

  // Step 3: Write cleaned data back to the file
  fs.writeFile("example.txt", cleanedData, (err) => {
    if (err) {
      console.log("Error writing file:", err);
      return;
    }

    console.log("File cleaned successfully!");
  });
});