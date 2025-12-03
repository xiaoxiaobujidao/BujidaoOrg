<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  window.location.href = 'https://files.bujidao.org/d';
});
</script>
<template>
  <div class="jump flex justify-center">
    <div class="content-center ">
      <h2>
        正在为您跳转...
      </h2>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h2 {
  font-size: 60px !important;
  line-height: 80px !important;
  font-weight: bold;
  background: linear-gradient(0deg, #c179df, #957df5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.jump {
  position: fixed;
  top:0;
  height: 100vh;
  width: 100vw;
  text-align: center;
  justify-items: center;
}
</style>