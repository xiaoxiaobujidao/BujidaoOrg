import { i18nConfig } from './i18n/index.js'
import { getZhCnPrefixedSitemapUrls } from './i18n/sitemap-urls.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["@/assets/css/main.scss"],
  modules: ["@nuxtjs/color-mode", "@nuxtjs/i18n", "@nuxtjs/sitemap"],
  site: {
    url: 'https://bujidao.org',
  },
  sitemap: {
    urls: getZhCnPrefixedSitemapUrls(),
  },
  devtools: { enabled: true },
  // @ts-ignore - i18n config is defined in index.js
  i18n: i18nConfig
});