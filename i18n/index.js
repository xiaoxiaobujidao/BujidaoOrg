/**
 * 国际化语言切换逻辑
 * 所有语言切换相关的业务逻辑都在这里，实现逻辑和样式分离
 */

// 语言类型定义
export const LanguageCode = {
  ZH_CN: 'zh-CN',
  FA_IR: 'fa-IR',
  RU_RU: 'ru-RU',
  EN_US: 'en-US'
}

// 默认语言（回退语言）
// export const DEFAULT_LOCALE = LanguageCode.EN_US
export const DEFAULT_LOCALE = LanguageCode.ZH_CN

// 语言列表配置（用于 UI 显示）
export const languages = [
  { code: LanguageCode.ZH_CN, name: '简体中文', nativeName: '简体中文' },
  { code: LanguageCode.FA_IR, name: 'فارسی', nativeName: 'فارسی' },
  { code: LanguageCode.RU_RU, name: 'Русский', nativeName: 'Русский' },
  { code: LanguageCode.EN_US, name: 'English', nativeName: 'English' }
]

// Nuxt i18n 模块的 locales 配置
export const i18nLocales = [
  {
    code: LanguageCode.ZH_CN,
    iso: 'zh-CN',
    name: '简体中文',
    file: 'zh-CN.js'
  },
  {
    code: LanguageCode.FA_IR,
    iso: 'fa-IR',
    name: 'فارسی',
    file: 'fa-IR.js'
  },
  {
    code: LanguageCode.RU_RU,
    iso: 'ru-RU',
    name: 'Русский',
    file: 'ru-RU.js'
  },
  {
    code: LanguageCode.EN_US,
    iso: 'en-US',
    name: 'English',
    file: 'en-US.js'
  }
]

/**
 * 获取所有可用的语言代码列表
 * @returns {string[]}
 */
export function getAvailableLanguageCodes() {
  return languages.map(lang => lang.code)
}

/**
 * 智能语言匹配函数
 * 将浏览器语言代码（如 zh-TW, en-UK）匹配到最合适的可用语言
 * @param {string} browserLocale - 浏览器语言代码
 * @param {string[]} availableLocales - 可用的语言代码列表
 * @returns {string|null} 匹配到的语言代码，如果没有匹配则返回 null
 */
export function matchLanguage(browserLocale, availableLocales) {
  if (!browserLocale) return null
  
  // 标准化浏览器语言代码（转为小写）
  const normalized = browserLocale.toLowerCase().trim()
  
  // 1. 精确匹配
  if (availableLocales.includes(normalized)) {
    return normalized
  }
  
  // 2. 提取语言主代码（如 zh-TW -> zh, en-UK -> en）
  const languageCode = normalized.split('-')[0]
  
  // 3. 语言映射表：将语言变体映射到可用的语言
  const languageMapping = {
    // 中文变体 -> zh-CN
    'zh': LanguageCode.ZH_CN,
    'zh-cn': LanguageCode.ZH_CN,
    'zh-tw': LanguageCode.ZH_CN,
    'zh-hk': LanguageCode.ZH_CN,
    'zh-mo': LanguageCode.ZH_CN,
    'zh-sg': LanguageCode.ZH_CN,
    
    // 英语变体 -> en-US
    'en': LanguageCode.EN_US,
    'en-us': LanguageCode.EN_US,
    'en-uk': LanguageCode.EN_US,
    'en-gb': LanguageCode.EN_US,
    'en-au': LanguageCode.EN_US,
    'en-ca': LanguageCode.EN_US,
    'en-nz': LanguageCode.EN_US,
    'en-ie': LanguageCode.EN_US,
    'en-za': LanguageCode.EN_US,
    
    // 波斯语变体 -> fa-IR
    'fa': LanguageCode.FA_IR,
    'fa-ir': LanguageCode.FA_IR,
    'fa-af': LanguageCode.FA_IR,
    
    // 俄语变体 -> ru-RU
    'ru': LanguageCode.RU_RU,
    'ru-ru': LanguageCode.RU_RU,
    'ru-by': LanguageCode.RU_RU,
    'ru-kz': LanguageCode.RU_RU,
    'ru-ua': LanguageCode.RU_RU,
  }
  
  // 4. 检查完整匹配（如 zh-tw）
  if (languageMapping[normalized]) {
    const matched = languageMapping[normalized]
    if (availableLocales.includes(matched)) {
      return matched
    }
  }
  
  // 5. 检查语言主代码匹配（如 zh）
  if (languageMapping[languageCode]) {
    const matched = languageMapping[languageCode]
    if (availableLocales.includes(matched)) {
      return matched
    }
  }
  
  // 6. 尝试通过语言主代码查找（如 zh -> 查找所有 zh-* 开头的语言）
  const matchedByPrefix = availableLocales.find(locale => 
    locale.toLowerCase().startsWith(languageCode + '-')
  )
  if (matchedByPrefix) {
    return matchedByPrefix
  }
  
  return null
}

// Nuxt i18n 完整配置
export const i18nConfig = {
  locales: i18nLocales,
  lazy: true,
  langDir: 'locales',
  defaultLocale: DEFAULT_LOCALE,
  // 使用 prefix 策略，所有语言都会在 URL 中添加语言前缀
  // 例如: /en-US/, /zh-CN/, /fa-IR/, /ru-RU/
  strategy: 'prefix_except_default',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    alwaysRedirect: false,
    fallbackLocale: LanguageCode.EN_US,
  }
}

/**
 * 获取当前语言信息
 * @param {string} locale - 当前语言代码
 * @returns {Object} 当前语言对象
 */
export function getCurrentLanguage(locale) {
  return languages.find(lang => lang.code === locale) || languages[0]
}

/**
 * 切换语言
 * 在 URL 前缀策略下，通过路由导航切换语言
 * @param {Object} i18nInstance - Nuxt i18n 实例（包含 setLocale 和 switchLocalePath 方法）
 * @param {string} languageCode - 要切换到的语言代码
 * @param {Object} router - Vue Router 实例（可选，用于程序化导航）
 * @returns {Promise<void>}
 */
export async function switchLanguage(i18nInstance, languageCode, router = null) {
  const validCodes = Object.values(LanguageCode)
  if (!validCodes.includes(languageCode)) {
    console.warn(`Invalid language code: ${languageCode}`)
    return
  }
  
  // 使用 switchLocalePath 生成对应语言的路径
  // 这会保持当前页面，只改变语言前缀
  if (typeof i18nInstance.switchLocalePath === 'function') {
    const newPath = i18nInstance.switchLocalePath(languageCode)
    
    // 如果提供了 router，使用程序化导航
    if (router && newPath) {
      await router.push(newPath)
    } else if (newPath && typeof window !== 'undefined') {
      // 在客户端环境，直接跳转
      window.location.href = newPath
    }
  } else if (typeof i18nInstance.setLocale === 'function') {
    // 降级方案：如果 switchLocalePath 不可用，使用 setLocale
    await i18nInstance.setLocale(languageCode)
  }
}

/**
 * 检查语言代码是否有效
 * @param {string} code - 语言代码
 * @returns {boolean}
 */
export function isValidLanguageCode(code) {
  return Object.values(LanguageCode).includes(code)
}

/**
 * 根据语言代码获取语言信息
 * @param {string} code - 语言代码
 * @returns {Object|null}
 */
export function getLanguageByCode(code) {
  return languages.find(lang => lang.code === code) || null
}

/**
 * 根据语言代码获取对应的 ISO 语言代码（用于 HTML lang 属性）
 * @param {string} localeCode - 语言代码
 * @returns {string} ISO 语言代码
 */
export function getHtmlLang(localeCode) {
  // 直接使用语言代码，因为我们的语言代码已经是 ISO 格式（如 zh-CN, en-US）
  return localeCode
}

/**
 * 根据语言代码获取文字方向（用于 HTML dir 属性）
 * @param {string} localeCode - 语言代码
 * @returns {string} 文字方向：'rtl' 或 'ltr'
 */
export function getTextDirection(localeCode) {
  // RTL 语言列表
  const rtlLanguages = [
    LanguageCode.FA_IR, // 波斯语
    // 可以在这里添加其他 RTL 语言
  ]
  
  return rtlLanguages.includes(localeCode) ? 'rtl' : 'ltr'
}

/**
 * 初始化 HTML lang 和 dir 属性更新逻辑
 * 在 Nuxt 插件中调用此函数来设置 HTML lang 和 dir 属性
 * 此函数需要在 Vue 组合式 API 上下文中调用
 */
export function setupHtmlLang() {
  // 获取当前语言
  const { locale } = useI18n()
  
  // 使用 useHead 动态更新 HTML lang 和 dir 属性
  useHead({
    htmlAttrs: {
      lang: computed(() => getHtmlLang(locale.value)),
      dir: computed(() => getTextDirection(locale.value))
    }
  })
}

