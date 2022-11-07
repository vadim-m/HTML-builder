const stdout = process.stdout;
const path = require("path");
const fs = require("fs");

let data = "";
const stream = fs.createReadStream(path.join(__dirname, "text.txt"));
stream.on("data", (chunk) => (data += chunk));
stream.on("end", () => stdout.write(data));
stream.on("error", (error) => console.log(error.message));
