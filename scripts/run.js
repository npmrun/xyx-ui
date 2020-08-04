const rollup = require('rollup');
const path = require("path");
const glob = require("glob");
const {buildConfig} = require("./util");
const chalk = require("chalk");

const clear = require("rollup-plugin-clear");

const files = glob.sync("source/publish/**/*.vue", {
  ignore: "node_modules/**",
});

const allConfigs = [];
files.forEach((file) => {
  const f = path.parse(file);
  const temp = path.join(
    f.dir.replace("source", ".").replace("publish", "lib"),
     "index.js"
  );
  let name = "";
  if (path.parse(f.dir)&&path.parse(f.dir).name) {
    name = path.parse(f.dir).name;
  }else{
    name = f.name
  }
  let config = buildConfig("esm", file, temp,name);
  allConfigs.push(config);
});

async function build() {
  if (allConfigs.length) {
    allConfigs[0].config.plugins.push(clear({
      // required, point out which directories should be clear.
      targets: ['lib'],
      // optional, whether clear the directores when rollup recompile on --watch mode.
      watch: true, // default: false
    }),)
  }
  for(var i = 0; i < allConfigs.length;i++){
      const one = allConfigs[i];
      console.log(chalk.green(`====>打包${one.name}库`));
      const bundle = await rollup.rollup(one.config);
      // or write the bundle to disk
      await bundle.write(one.config.output);
      console.log(chalk.red(`====>打包${one.name}库完成`));
  }
   // 全量库
   console.log(chalk.green(`====>打包全量库`));
   const c = buildConfig("esm","source/publish/main.js","lib/abc.js",'',true);
   const bundle = await rollup.rollup(c.config);
   await bundle.write(c.config.output);
   console.log(chalk.red(`====>打包全量库完成`));
    // Browser库
    console.log(chalk.green(`====>打包Browser库`));
    const b = buildConfig("iife","source/publish/index.js","lib/library.js",'ABC',true);
    const bundle2 = await rollup.rollup(b.config);
    await bundle2.write(b.config.output);
    console.log(chalk.red(`====>打包Browser库完成`));
    // 兼容库
    console.log(chalk.green(`====>打包兼容库`));
    const d = buildConfig("umd","source/publish/main.js","lib/library.udm.js",'ABC',true);
    const bundle3 = await rollup.rollup(d.config);
    await bundle3.write(d.config.output);
    console.log(chalk.red(`====>打包兼容库完成`));
}

build()