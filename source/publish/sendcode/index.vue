<template>
  <span
    class="sendcode component"
    :class="[border ? 'border' : '']"
    :disabled="isStart"
    :style="{ color: color, fontSize: fontSize }"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "SendCode",
  data() {
    return {
      timer: null,
      isStart: false,
      text: "获取短信验证码"
    };
  },
  props: {
     /**
     * Whether to disable button
     */
    initText: {
      type: String,
      description:"文本",
      default: "获取验证码"
    },
    second: {
      default: 60,
      validator(val) {
        return /^\d*$/.test(val);
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#00caff"
    },
    fontSize: {
      type: String,
      default: "20rpx"
    },
    runText: {
      type: String,
      default: "{%s}秒后重新获取"
    },
    resetText: {
      type: String,
      default: "重新获取验证码"
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    run() {
      let second = this.second;
      this.text = this.getText(this.second);
      this.timer = setInterval(() => {
        second--;
        this.text = this.getText(second);
        second <= 0 && this.stop();
      }, 1000);
    },
    stop: function() {
      this.text = this.resetText;
       /**
       * Passthrough click event
       * @type {Event}
       */
      this.$emit("input", false);
       /**
       * Passthrough click event
       * @type {Event}
       */
      this.$emit("stop", false);
      clearInterval(this.timer);
    },
    getText(second) {
      return this.runText.replace(/\{([^{]*?)%s(.*?)\}/g, second);
    }
  },
  watch: {
    value: function(val) {
      this.isStart = val;
      val && this.run();
    }
  },
  mounted() {
    if (this.initText) {
      this.text = this.initText;
    }
  },
  destroyed() {
    this.stop();
  }
};
</script>

<style lang="scss" scoped>
.sendcode.component {
  display: inline-block;
  line-height: 50px;
  color: blue !important;
  padding: 10px;
  cursor: pointer;
  &.border {
    line-height: normal;
    border: 1px solid black;
  }
}
</style>
