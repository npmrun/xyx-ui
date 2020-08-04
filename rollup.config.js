const path = require("path");
const glob = require("glob");
const {buildConfig} = require("./scripts/util");
const clear = require("rollup-plugin-clear");

const files = glob.sync("source/publish/**/*.vue", {
  ignore: "node_modules/**",
});
const allConfigs = [];
files.forEach((file) => {
  const f = path.parse(file);
  const temp = path.join(
    f.dir.replace("source", ".").replace("publish", "lib"),
    "index" + ".js"
  );
  let name = "";
  if (path.parse(f.dir)&&path.parse(f.dir).name) {
    name = path.parse(f.dir).name;
  }else{
    name = f.name
  }
  let config = buildConfig("esm", file, temp,name).config;
  allConfigs.push(config);
});
allConfigs.unshift(buildConfig("esm","source/publish/main.js","lib/abc.js",'',true).config);
allConfigs.unshift(buildConfig("esm","source/publish/index.js","lib/library.js",'ABC',true).config);
allConfigs.unshift(buildConfig("esm","source/publish/main.js","lib/library.udm.js",'ABC',true).config);

if (process.env.NODE_ENV === "development") {
  if (allConfigs.length) {
    allConfigs[0].plugins.push(clear({
      // required, point out which directories should be clear.
      targets: ['lib'],
      // optional, whether clear the directores when rollup recompile on --watch mode.
      watch: false, // default: false
    }),)
  }
}

export default [
  ...allConfigs,
];
