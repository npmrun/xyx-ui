const commonjs = require("@rollup/plugin-commonjs");
const vue = require("rollup-plugin-vue");
const babel = require("rollup-plugin-babel");
// const postcss = require("rollup-plugin-postcss");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const alias = require("@rollup/plugin-alias");

const cssnext = require("postcss-cssnext");
const css = require("rollup-plugin-css-only");
const cssnano = require("cssnano");
const path = require("path");

module.exports = {
  buildConfig(type, input, output, name,isAll) {
    const p = path.parse(output);
    const c = isAll?{}:{output:path.join(p.dir, "style", "index.css")};
    return {
      name,
      config: {
        input: input,
        output: {
          format: type,
          file: output,
          name,
        },
        inlineDynamicImports: true,
        plugins: [
          alias({
            entries: [
              { find: '@source', replacement: path.resolve(__dirname, '../source') },
              { find: '@publish', replacement: path.resolve(__dirname, '../source/publish') },
              { find: '@unpublish', replacement: path.resolve(__dirname, '../source/unpublish') },
              { find: '@story', replacement: path.resolve(__dirname, '../stories') },
            ]
          }),
          nodeResolve(),
          vue({
            css: false,
            style: {
              postcssOptions: {},
              postcssPlugins: [
                cssnext(),
                cssnano({
                  preset: "default",
                }),
              ],
            },
            template: {
              transformAssetUrls: {
                video: ["src", "poster"],
                source: "src",
                img: "src",
                image: "xlink:href",
              },
            },
          }),
          css(c),
          commonjs(),
          babel({
            runtimeHelpers: true,
            exclude: "node_modules/**",
          }),
        ],
      },
    };
  },
};
