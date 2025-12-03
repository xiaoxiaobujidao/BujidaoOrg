<script setup lang="ts">
import LanguageIcon from '~/components/ICON/LanguageIcon.vue'
import { languages, getCurrentLanguage, switchLanguage } from '~/i18n/index.js'

// 定义语言类型
interface Language {
  code: string
  name: string
  nativeName?: string
}

const i18n = useI18n()
const { locale } = i18n
const router = useRouter()

// 类型安全的语言列表
const typedLanguages = languages as Language[]

// 当前选中的语言（使用 index.js 中的函数）
const currentLanguage = computed(() => {
  return getCurrentLanguage(locale.value) as Language
})

// 是否显示下拉菜单
const showDropdown = ref(false)

// 切换语言（使用 index.js 中的函数）
// 在 URL 前缀模式下，通过路由导航切换语言
const selectLanguage = async (lang: Language) => {
  await switchLanguage(i18n, lang.code, router)
  showDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-selector')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="language-selector">
    <button @click.stop="showDropdown = !showDropdown" class="selector-button" aria-label="选择语言">
      <LanguageIcon />
      <svg class="arrow-icon" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <Transition enter-active-class="dropdown-enter-active" enter-from-class="dropdown-enter-from"
      enter-to-class="dropdown-enter-to" leave-active-class="dropdown-leave-active"
      leave-from-class="dropdown-leave-from" leave-to-class="dropdown-leave-to">
      <div v-if="showDropdown" class="dropdown-menu" @click.stop>
        <ul class="language-list">
          <li v-for="lang in typedLanguages" :key="lang.code" @click="selectLanguage(lang)" class="language-item"
            :class="{ 'active': currentLanguage.code === lang.code }">
            <span class="lang-name">{{ lang.name }}</span>
            <span v-if="lang.nativeName && lang.nativeName !== lang.name" class="native-name">
              {{ lang.nativeName }}
            </span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.language-selector {
  position: relative;
  z-index: 1000;

  .selector-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid #9e7cf0;
    border-radius: 5px;
    background: transparent;
    color: #888;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(158, 124, 240, 0.1);
      border-color: #8e6ce0;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .arrow-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease;

    &.rotate-180 {
      transform: rotate(180deg);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    min-width: 12rem;
    background: #fff;
    border: 1px solid #9e7cf0;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(158, 124, 240, 0.15);
    overflow: hidden;
    z-index: 50;
  }

  .language-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .language-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #333;

    &:hover {
      background: rgba(158, 124, 240, 0.1);
      padding-left: 1.25rem;
    }

    &.active {
      background: rgba(158, 124, 240, 0.15);
      color: #9e7cf0;
      font-weight: 500;
    }

    .lang-name {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .native-name {
      font-size: 0.875rem;
      color: #999;
      margin-left: auto;
    }
  }

  // Transition 动画样式
  .dropdown-enter-active {
    transition: all 0.2s ease-out;
  }

  .dropdown-enter-from {
    transform: scale(0.95);
    opacity: 0;
  }

  .dropdown-enter-to {
    transform: scale(1);
    opacity: 1;
  }

  .dropdown-leave-active {
    transition: all 0.15s ease-in;
  }

  .dropdown-leave-from {
    transform: scale(1);
    opacity: 1;
  }

  .dropdown-leave-to {
    transform: scale(0.95);
    opacity: 0;
  }
}

// 暗黑模式
.dark-mode {
  .language-selector {
    .selector-button {
      color: #ccc;
      border-color: #38affff0;

      &:hover {
        background: rgba(56, 175, 255, 0.1);
        border-color: #48bfff;
      }
    }

    .dropdown-menu {
      background: #1a1a1a;
      border-color: #38affff0;
      box-shadow: 0 8px 24px rgba(56, 175, 255, 0.15);
    }

    .language-item {
      color: #ccc;

      &:hover {
        background: rgba(56, 175, 255, 0.1);
      }

      &.active {
        background: rgba(56, 175, 255, 0.15);
        color: #38affff0;
      }

      .native-name {
        color: #666;
      }
    }
  }
}
</style>
