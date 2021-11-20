<script setup>
  import { ref, getCurrentInstance, computed } from "vue";
  //当前实例对象
  const ins = getCurrentInstance();

  function useI18n() {
    const locale = ref("zh");
    const i18n = ins.type.i18n;
    let t = function (key) {
      console.log(ins);
      return computed(() => i18n[locale.value][key]).value;
    };
    return {
      locale,
      t,
    };
  }
  let { locale, t } = useI18n();

  defineProps({
    msg: String,
  });

  const count = ref(0);
</script>

<i18n>
{
  "en":{
    "language":"language",
    "hello":"hello,world!",
  },
  "zh":{
    "language":"语言",
    "hello":"你好，世界!！",
  }
}
</i18n>

<template>
  <label>{{ t("language") }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
  <p>{{ t("hello") }}</p>
</template>

<style scoped>
  a {
    color: #42b983;
  }
</style>
