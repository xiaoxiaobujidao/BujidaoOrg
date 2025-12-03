<script setup lang="ts">
import { setupHtmlLang } from '~/i18n/index.js'

// 调用 index.js 中的函数来设置 HTML lang 属性
setupHtmlLang()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>