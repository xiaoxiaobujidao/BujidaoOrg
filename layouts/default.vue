<script setup lang="ts">
import Header from '~/components/shared/Header.vue'
</script>
<template>
    <div class="app">
        <Header />
        <slot />
    </div>
    <div class="bgc">
        <div class="c1"></div>
        <div class="c2"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</template>
<style lang="scss" scoped>
.dark-mode {
    .bgc {
        background: #222;
        opacity: 1;
        filter: none;
    }

    .left {
        background: linear-gradient(45deg, #38afff, #222);
    }

    .right {
        background: linear-gradient(225deg, #208dec, #222);
    }
}

.bgc {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #c179df68, #38afff23);
    -webkit-filter: blur(100px);
    filter: blur(100px);
    opacity: 0.25;
    z-index: -1;

}

.left {
    position: fixed;
    top: 50vh;
    left: -280px;
    width: 500px;
    height: 500px;
    border-radius: 1000px;
    background: linear-gradient(45deg, #c179df, #ffffff);
    -webkit-filter: blur(100px);
    filter: blur(100px);
    opacity: 0.25;
    z-index: -1;

}

.right {
    position: fixed;
    top: -250px;
    right: -280px;
    width: 500px;
    height: 500px;
    border-radius: 1000px;
    background: linear-gradient(225deg, #c179df, #ffffff);
    -webkit-filter: blur(100px);
    filter: blur(100px);
    opacity: 0.25;
    z-index: -1;

}
</style>