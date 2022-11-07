const path = require("path");
const { readdir } = require("fs/promises");
const { stat } = require("fs/promises");

readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true }).then(
  (files) => {
    for (const file of files) {
      if (file.isFile()) {
        stat(path.join(__dirname, "secret-folder", file.name)).then((item) => {
          const info = file.name.split(".");
          console.log(
            `${info[0]} - ${info[1]} - ${(item.size / 1024).toFixed(3)}kb`
          );
        });
      }
    }
  }
);
