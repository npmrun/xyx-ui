import * as components from "./all";
// import pkg from "../../package.json";
export default {
  // 版本
  // version: pkg.version,
  install(Vue) {
    if (typeof Vue !== "undefined") {
      for (const name in components) {
        Vue.component(components[name].name || name, components[name]);
      }
    }
  },
};
