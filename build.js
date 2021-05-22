var swig = require("swig-templates");
var path = require("path");
var { mkdirSync, readdirSync, writeFileSync } = require("fs");

readdirSync("src")
  .filter((f) => f.match(/\.html/))
  .map((f) => ["src", "build"].map((d) => path.resolve(__dirname, d, f)))
  .forEach(([srcFilename, destFilename]) => {
    // const filename = path.resolve(__dirname, "src", "i5.html");
    var tpl = swig.compileFile(srcFilename);
    mkdirSync(path.dirname(destFilename), { recursive: true });
    console.log({ srcFilename, destFilename });
    writeFileSync(destFilename, tpl({}));
  });
