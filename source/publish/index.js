import * as components from "./all";

export default {
  install(Vue) {
    if (typeof Vue !== "undefined") {
      for (const name in components) {
        Vue.component(components[name].name || name, components[name]);
      }
    }
  },
};
