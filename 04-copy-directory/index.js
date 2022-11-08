const path = require("path");
const { mkdir, readdir, copyFile } = require("fs/promises");

copyDir();

async function copyDir() {
  try {
    const filesInFolder = await readdir(path.join(__dirname, "files"));
    const createNewDir = await mkdir(path.join(__dirname, "files-copy"), {
      recursive: true,
    });

    filesInFolder.forEach((file) => {
      copyFileToNewDirectory(file);
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function copyFileToNewDirectory(file) {
  await copyFile(
    path.join(__dirname, "files", file),
    path.join(__dirname, "files-copy", file)
  );
}
