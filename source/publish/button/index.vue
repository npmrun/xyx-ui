<template>
    <div>
        button
    </div>
</template>
<script>
export default {
  // 由于这里这里填name打包时会报'core-js/modules/es.function.name' is imported by source\publish\index.js, but could not be resolved – treating it as an external dependency
  // 猜测可能是重名了，因此换了一个
  // $name:"MyButton"
  // 安装了core-js,好像能用.name了
  name:"MyButton"
}
</script>
<style lang="scss" scoped>
$flex: flex;
div {
  display: $flex;
  color:red;
}
</style>