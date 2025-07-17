import { createI18n } from 'vue-i18n'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en-US', // 回退语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n
