const path = require("path");
const { mkdir, readdir, copyFile, unlink } = require("fs/promises");

copyDir();

async function copyDir() {
  try {
    const filesStartInFolder = await readdir(path.join(__dirname, "files"));

    await mkdir(path.join(__dirname, "files-copy"), {
      recursive: true,
    });

    const filesInCopyFolder = await readdir(path.join(__dirname, "files-copy"));
    await Promise.all(
      filesInCopyFolder.map((f) =>
        unlink(path.join(__dirname, "files-copy", f))
      )
    );

    filesStartInFolder.forEach((file) => {
      copyFileToNewDirectory(file);
    });
  } catch (err) {
    console.error(err.message, "turtu");
  }
}

async function copyFileToNewDirectory(file) {
  await copyFile(
    path.join(__dirname, "files", file),
    path.join(__dirname, "files-copy", file)
  );
}
