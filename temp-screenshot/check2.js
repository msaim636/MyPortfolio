const fs = require('fs');
const buffer = fs.readFileSync('phone-frame.png');
// We can't easily parse PNG pixels without a library, let's use jimp or canvas.
