const path = require("path");
const { readdir, readFile, writeFile } = require("fs/promises");

let cssData = "";

async function makeCSSBundle() {
  try {
    const cssParts = await readdir(path.join(__dirname, "styles"), {
      withFileTypes: true,
    });

    for (const file of cssParts) {
      const fileInfo = file.name.split(".");

      if (file.isFile() && fileInfo[1] === "css") {
        const styles = await readFile(
          path.join(__dirname, "styles", file.name)
        );
        cssData += styles;
      }
    }

    await writeFile(
      path.join(__dirname, "project-dist", "bundle.css"),
      cssData
    );
  } catch (err) {
    console.error(err.message, "turtu");
  }
}

makeCSSBundle();
