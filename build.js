var swig = require("swig-templates");
var path = require("path");
var { mkdirSync, writeFileSync } = require("fs");

const index = ["./src/index.html", {}];
const i5 = ["./src/i5.html", require("./src/i5.json")];
const pages = [i5, index];

pages
  .map(([f, data]) => {
    return [f, path.resolve(__dirname, f.replace('src', 'build')), data];
  })
  .forEach(([srcFilename, destFilename, data]) => {
    // const filename = path.resolve(__dirname, "src", "i5.html");
    var tpl = swig.compileFile(srcFilename);
    mkdirSync(path.dirname(destFilename), { recursive: true });
    console.log({ srcFilename, destFilename });
    writeFileSync(destFilename, tpl(data));
  });
