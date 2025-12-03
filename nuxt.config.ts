// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["@/assets/css/main.scss"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  devtools: { enabled: true },
});