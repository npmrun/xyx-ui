import SendCode from "@publish/sendcode";
import {
  boolean,
  color,
  number,
  object,
  text,
  withKnobs,
} from "@storybook/addon-knobs";
import { withInfo } from "storybook-addon-vue-info";
import { withA11y } from "@storybook/addon-a11y";
export const Basic = () => ({
  template: "<send-code ref='av' :border='true'>witext</send-code>",
  components: {
    SendCode,
  },
  mounted() {
    this.$refs.av.run();
  },
  parameters: {
    info: true,
  },
});

export const diy = () => {
  const btnText = text("btnText", "DIY Button"); //文字控件
  const bold = boolean("Bold", false); //启用控件
  const selectedBgColor = color("bgColor", "#fff"); //颜色选择器
  const selectedColor = color("Color", "black");
  const fontSize = number("fontSize", 20); //数字
  const customStyle = object("Style", {
    fontFamily: "Arial",
    padding: "20px",
  });
  const style = {
    ...customStyle,
    fontWeight: bold ? 800 : 400,
    fontSize: fontSize + "px",
    color: selectedColor,
    backgroundColor: selectedBgColor,
  };
  return {
    components: {
      SendCode,
    },
    docs: {},
    props: {
      btnText: {
        default: btnText,
      },
      styles: {
        default: style,
      },
    },
    template: '<send-code :style="styles">{{btnText}}</send-code>',
  };
};

export default {
  name: "发送验证码ss按钮",
  title: "发送验证码ss按钮",
  decorators: [withKnobs, withInfo, withA11y],
  parameters: { info: true },
};
