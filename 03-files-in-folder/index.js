const path = require("path");
const fs = require("fs");
const { readdir } = require("fs/promises");

readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true }).then(
  (files) => {
    for (const file of files) {
      if (file.isFile()) {
        showInfo(file);
      }
    }
  }
);

function showInfo(file) {
  fs.stat(path.join(__dirname, "secret-folder", file.name), (err, stats) => {
    if (err) throw err;
    const info = file.name.split(".");
    console.log(
      `${info[0]} - ${info[1]} - ${(stats.size / 1024).toFixed(2)}kb`
    );
  });
}
