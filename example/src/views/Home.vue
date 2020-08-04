<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <SendCode v-model="start" @click.native="start = !start"/>
    <MyButton msg="Welcome to Your Vue.js App" />
    <buttonGroup msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import {sendcode} from '../../../lib/abc'

export default {
  name: "Home",
  data() {
    return {
      start: false,
    };
  },
  mounted(){
    // this.start = true;
  },
  components: {
    HelloWorld,
    // sendcode,
  },
};
</script>
