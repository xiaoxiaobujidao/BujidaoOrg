/** 站点页面路径（不含语言前缀） */
export const SITE_PAGE_PATHS = ['', '/about', '/d']

/** 中文带 /zh-CN 前缀的 sitemap 条目（补充 prefix_and_default 默认未收录的前缀路由） */
export function getZhCnPrefixedSitemapUrls() {
  return SITE_PAGE_PATHS.map((path) => ({
    loc: path ? `/zh-CN${path}` : '/zh-CN',
    _sitemap: 'zh',
  }))
}
