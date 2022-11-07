const { stdin, stdout, exit } = require("process");
const path = require("path");
const fs = require("fs");

const closeApp = () => {
  stdout.write("\nНу вот и всё, спасибо!\n");
  exit();
};

const output = fs.createWriteStream(path.join(__dirname, "output.txt"));
stdout.write("Тект, который добавится в файл output.txt:\n");
stdin.on("data", (data) => {
  const text = data.toString();
  if (text === "exit\n") {
    closeApp();
  }
  output.write(text);
});

process.on("SIGINT", closeApp);
