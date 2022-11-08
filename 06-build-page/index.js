const path = require("path");
const {
  readdir,
  mkdir,
  readFile,
  writeFile,
  copyFile,
  rm,
} = require("fs/promises");

const templatePath = path.join(__dirname, "template.html");
const assetsPath = path.join(__dirname, "assets");
const componentsPath = path.join(__dirname, "components");
const stylesPath = path.join(__dirname, "styles");
const buildPath = path.join(__dirname, "project-dist");

copyDir();

// 04-copy-directory
async function copyDir() {
  try {
    const assetsDirs = await readdir(assetsPath, {
      withFileTypes: true,
    });

    await mkdir(buildPath, {
      recursive: true,
    });

    // clean dist
    await rm(buildPath, { recursive: true });

    assetsDirs.forEach((dir) => {
      if (dir.isDirectory()) {
        copyFileToNewDirectory(dir);
      }
    });

    await makeCSSBundle();
    await makeHTMLfile();
  } catch (err) {
    console.error(err.message);
  }
}

async function copyFileToNewDirectory(dir) {
  try {
    await mkdir(path.join(buildPath, "assets", dir.name), {
      recursive: true,
    });

    for (const file of await readdir(path.join(assetsPath, dir.name), {
      withFileTypes: true,
    })) {
      await copyFile(
        path.join(assetsPath, dir.name, file.name),
        path.join(buildPath, "assets", dir.name, file.name)
      );
    }
  } catch (err) {
    console.error(err.message);
  }
}

// 05-merge-styles script
let cssData = "";

async function makeCSSBundle() {
  try {
    const cssParts = await readdir(stylesPath, {
      withFileTypes: true,
    });

    for (const file of cssParts) {
      const fileInfo = file.name.split(".");

      if (file.isFile() && fileInfo[1] === "css") {
        const styles = await readFile(path.join(stylesPath, file.name));
        cssData += `\n${styles}`;
      }
    }

    await writeFile(path.join(buildPath, "style.css"), cssData);
  } catch (err) {
    console.error(err.message);
  }
}

// build index.html
async function makeHTMLfile() {
  try {
    let template = await readFile(templatePath, { encoding: "utf8" });

    const regexp = /{{\w*}}/gi;
    const components = template.match(regexp);

    for (let component of components) {
      const componentHTML = await readFile(
        path.join(componentsPath, `${component.slice(2, -2)}.html`),
        "utf-8"
      );
      template = template.replace(component, componentHTML);
    }
    await writeFile(path.join(buildPath, "index.html"), template);
  } catch (err) {
    console.error(err.message);
  }
}
