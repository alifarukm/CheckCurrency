var Converter = require("./converter");
var converter = Converter();
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (line) => {
  let val = await converter.convert(line);
  console.log(val);
});

/**
 * 1. get string from stdin
 * 2. get exchange rate
 * 3. convert the string with rate
 * 4. write string from stdout
 */
