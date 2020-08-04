const path = require('path');
// https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer
module.exports = {
  stories: ["../stories/**/*.stories.@(js|ts|mdx)"],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-backgrounds/register',
    // '@storybook/addon-viewport/register',
    '@storybook/addon-storysource/register',
    'storybook-addon-vue-info/lib/register',
    '@storybook/addon-knobs/register',
    {
      name: '@storybook/preset-scss',
      options: {
        // cssLoaderOptions: {
        //    modules: true,
        //    localIdentName: '[name]__[local]--[hash:base64:5]',
        // }
      }
    },
    {
      name: '@storybook/preset-typescript',
      // options: {
      //   tsLoaderOptions: {
      //     configFile: path.resolve(__dirname, './tsconfig.json'),
      //   },
      //   forkTsCheckerWebpackPluginOptions: {
      //     colors: false, // disables built-in colors in logger messages
      //   },
      //   include: [path.resolve(__dirname, '../src')],
      //   transpileManager: true,
      // },
    },
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        vueDocgenOptions: {
          alias: {
            "@": path.resolve(__dirname, "../"),
          },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.vue$/,
      loader: "vue-docgen-loader",
      enforce: "post",
    });
    config.resolve.extensions.push(".vue");
    config.resolve.extensions.push(".js");
    config.resolve.extensions.push(".ts");
    config.resolve.alias["@source"] = path.resolve(__dirname,"../source")
    config.resolve.alias["@story"] = path.resolve(__dirname,"../stories")
    config.resolve.alias["@publish"] = path.resolve(__dirname,"../source/publish/")
    config.resolve.alias["@unpublish"] = path.resolve(__dirname,"../source/unpublish/")
    return config;
  }
};
