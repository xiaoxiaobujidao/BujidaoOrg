import { parseAcceptLanguage } from '@intlify/utils'
import { DEFAULT_LOCALE } from '~/i18n/index.js'
import { resolveBrowserLocale } from '~/i18n/resolveBrowserLocale.js'

/**
 * 在 @nuxtjs/i18n 检测之前，用自定义规则解析浏览器语言并写入 cookie，
 * 将相近语言变体（如港繁、新加坡中文、英式英语）匹配到站点已有语言。
 */
export default defineNuxtRouteMiddleware((to) => {
  const detectConfig = useRuntimeConfig().public.i18n?.detectBrowserLanguage
  if (!detectConfig) {
    return
  }

  const detect = typeof detectConfig === 'object' ? detectConfig : {}
  if (detect.redirectOn === 'root' && to.path !== '/') {
    return
  }

  const cookieKey = detect.cookieKey || 'i18n_redirected'
  const cookie = useCookie(cookieKey)

  if (cookie.value) {
    return
  }

  let browserLocales = []

  if (import.meta.server) {
    const acceptLanguage = useRequestHeaders()['accept-language'] || ''
    browserLocales = parseAcceptLanguage(acceptLanguage)
  } else if (typeof navigator !== 'undefined') {
    browserLocales = navigator.languages?.length
      ? [...navigator.languages]
      : [navigator.language].filter(Boolean)
  }

  const resolved = resolveBrowserLocale(browserLocales, {
    fallbackLocale: detect.fallbackLocale || DEFAULT_LOCALE,
  })

  cookie.value = resolved
})
