<template>
  <div class="color-green">
    {{ title }}
    <HelloWord></HelloWord>
  </div>
</template>

<script>
  import HelloWord from "./HelloWord.vue";
  import { reactive, toRefs } from "vue";
  export default {
    components: {
      HelloWord,
    },
    setup() {
      const state = reactive({
        title: "hello,kvite!",
      });
      return {
        ...toRefs(state),
      };
    },
  };
</script>

<style>
  .color-green {
    color: green;
  }
</style>
