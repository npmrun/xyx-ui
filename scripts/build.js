const glob = require("glob");
const path = require("path");
const fs = require("fs");
const execa = require("execa");
const chalk = require("chalk");
console.log(chalk.red(`====>开始生成组件树...........`));
const files = glob.sync("**/*.vue", {
  cwd: "./source/publish",
  ignore: "node_modules/**",
});
let exportCom = [];
const str = files.map((file) => {
  const f = path.parse(file);
  let name = "";
  if (path.parse(f.dir)&&path.parse(f.dir).name) {
    name = path.parse(f.dir).name;
  }else{
    name = f.name
  }
  exportCom.push(`${name}`);
  return `import ${name} from "./${file}"`;
});
str.push(`export { \n ${exportCom.join(",\n ")} \n}`);

fs.writeFileSync("./source/publish/all.js", str.join("\n"));
console.log(chalk.green(`====>生成成功(build success)!`));
console.log(chalk.red(`====>开始打包(build success)!`));

const isRunConfig = process.env.CONFIG == "true" ? true : false;
if (isRunConfig) {
  // 配置文件打包
  (async () => {
    try {
      await execa("rollup", ["-c", "rollup.config.js","--environment","NODE_ENV:production"], {
        stdio: "inherit",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(chalk.green(`====>打包完成(build success)!`));
  })();
} else {
  // 代码打包
  (async () => {
    try {
      await execa("node", ["./scripts/run.js"], {
        stdio: "inherit",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(chalk.green(`====>打包完成(build success)!`));
  })();
}
