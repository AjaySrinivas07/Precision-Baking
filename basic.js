const path = require('path');
const os = require('os');
console.log(path.parse(__filename));
console.log(os.freemem())
console.log(os.totalmem())