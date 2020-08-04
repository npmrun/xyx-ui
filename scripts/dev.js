const glob = require("glob");
const path = require("path");
const fs = require("fs");
const execa = require("execa");
const chalk = require("chalk");
const files = glob.sync("**/*.vue", {
  cwd: "./source/publish",
  ignore: "node_modules/**",
});
let exportCom = [];
const str = files.map((file) => {
  const f = path.parse(file);
  exportCom.push(`${f.name}`);
  return `import ${f.name} from "./${file}"`;
});
str.push(`export { \n ${exportCom.join(",\n ")} \n}`);

fs.writeFileSync("./source/publish/all.js", str.join("\n"));

// 配置文件打包
(async () => {
  try {
    await execa("rollup", ["-wc","--environment","NODE_ENV:development"], {
      stdio: "inherit",
    });
  } catch (error) {
    console.log(error);
  }
})();