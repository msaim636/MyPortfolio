const fs = require('fs');
const buffer = fs.readFileSync('phone-frame.png');
// check if PNG has alpha channel
// IHDR chunk: width(4), height(4), bit depth(1), color type(1)
// color type 6 is RGBA.
const colorType = buffer[25];
console.log("Color type:", colorType);
