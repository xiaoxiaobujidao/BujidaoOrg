const LanguageCode = {
  ZH_CN: 'zh-CN',
  FA_IR: 'fa-IR',
  RU_RU: 'ru-RU',
  EN_US: 'en-US',
}

const DEFAULT_LOCALE = LanguageCode.EN_US
const SUPPORTED_LOCALES = Object.values(LanguageCode)

/**
 * 浏览器语言标签 → 站点支持语言的显式别名
 * 将相近区域/书写变体映射到站点已有语言
 */
const LOCALE_ALIASES = {
  // 中文变体 → 简体中文
  'zh-tw': LanguageCode.ZH_CN,
  'zh-hk': LanguageCode.ZH_CN,
  'zh-mo': LanguageCode.ZH_CN,
  'zh-sg': LanguageCode.ZH_CN,
  'zh-my': LanguageCode.ZH_CN,
  'zh-hant': LanguageCode.ZH_CN,
  'zh-hans': LanguageCode.ZH_CN,
  // 英语变体 → 美式英语
  'en-gb': LanguageCode.EN_US,
  'en-au': LanguageCode.EN_US,
  'en-ca': LanguageCode.EN_US,
  'en-nz': LanguageCode.EN_US,
  'en-ie': LanguageCode.EN_US,
  'en-in': LanguageCode.EN_US,
  'fa-af': LanguageCode.FA_IR,
  'ru-ua': LanguageCode.RU_RU,
  'ru-by': LanguageCode.RU_RU,
  'ru-kz': LanguageCode.RU_RU,
}

/**
 * ISO 639-1 主语言 → 站点语言
 */
const LANGUAGE_FAMILY = {
  zh: LanguageCode.ZH_CN,
  en: LanguageCode.EN_US,
  fa: LanguageCode.FA_IR,
  ru: LanguageCode.RU_RU,
}

function normalizeLocaleTag(tag) {
  return String(tag || '').trim().replace(/_/g, '-').toLowerCase()
}

function isSupported(code, supportedLocales) {
  return supportedLocales.includes(code)
}

/**
 * 将单个浏览器语言标签解析为站点支持的语言代码
 * @param {string} tag
 * @param {string[]} supportedLocales
 * @returns {string | null}
 */
export function resolveLocaleTag(tag, supportedLocales = SUPPORTED_LOCALES) {
  const normalized = normalizeLocaleTag(tag)
  if (!normalized) {
    return null
  }

  const exact = supportedLocales.find((code) => normalizeLocaleTag(code) === normalized)
  if (exact) {
    return exact
  }

  const alias = LOCALE_ALIASES[normalized]
  if (alias && isSupported(alias, supportedLocales)) {
    return alias
  }

  const parts = normalized.split('-')
  const language = parts[0]

  // 任意中文变体（含繁体、港繁、台繁等）统一使用简体中文
  if (language === 'zh' && isSupported(LanguageCode.ZH_CN, supportedLocales)) {
    return LanguageCode.ZH_CN
  }

  const family = LANGUAGE_FAMILY[language]
  if (family && isSupported(family, supportedLocales)) {
    return family
  }

  return null
}

/**
 * 按浏览器偏好顺序，解析为最合适的站点语言
 * @param {string[]} browserLocales - 已按优先级排序的语言列表
 * @param {{ supportedLocales?: string[], fallbackLocale?: string }} [options]
 * @returns {string}
 */
export function resolveBrowserLocale(browserLocales, options = {}) {
  const supportedLocales = options.supportedLocales ?? SUPPORTED_LOCALES
  const fallbackLocale = options.fallbackLocale ?? DEFAULT_LOCALE

  if (!Array.isArray(browserLocales) || browserLocales.length === 0) {
    return fallbackLocale
  }

  for (const browserLocale of browserLocales) {
    const resolved = resolveLocaleTag(browserLocale, supportedLocales)
    if (resolved) {
      return resolved
    }
  }

  return fallbackLocale
}
