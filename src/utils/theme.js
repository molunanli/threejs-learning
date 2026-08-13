// src/utils/theme.js
export const themes = {
  light: {
    primary: '#4361ee',
    primaryDark: '#3a56d4',
    secondary: '#7209b7',
    dark: '#333333',
    light: '#f8fafc',
    gray: '#64748b',
    lightGray: '#e2e8f0',
    cardBg: '#ffffff',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
    tagBg: '#f0f7ff',
    tagColor: '#2563eb',

    /* 核心品牌色 */
    'primary-100': '#f8f9fa',        /* 最浅背景：页面边缘 */
    'primary-200': '#e9ecef',       /* 次级背景：卡片背景 */
    'primary-300': '#dee2e6',        /* 三级背景：分隔线/输入框边框 */
    'primary-color': '#0066ff',      /* 主色：主要按钮/标题 */
    'secondary-color': '#ff3e00',    /* 辅助色：警告状态/次要按钮 */
    'accent-color': '#00b894',       /* 强调色：成功状态/正增长数据 */

    /* 背景系统 */
    'bg-primary': 'white',           /* 主背景：页面背景 */
    'bg-secondary': 'var(--primary-200)', /* 卡片背景 */
    'bg-tertiary': 'var(--primary-300)',  /* 输入框背景 */
    'surface-glass': 'rgba(255, 255, 255, 0.9)', /* 毛玻璃：弹出层 */

    /* 文字系统 */
    'text-primary': '#0a0a1a',       /* 主文本：标题/正文 */
    'text-secondary': '#2d2d4d',     /* 次级文本：描述/副标题 */
    'text-tertiary': '#6c757d',      /* 三级文本：占位符/辅助信息 */
    'text-accent': 'var(--secondary-color)', /* 强调文本：链接/交互元素 */
  },
  dark: {
    primary: '#5e72e4',
    primaryDark: '#4a5bd0',
    dark: '#f1f5f9',
    light: '#0f172a',
    gray: '#94a3b8',
    lightGray: '#334155',
    cardBg: '#1e293b',
    cardShadow: 'rgba(0, 0, 0, 0.25)',
    tagBg: 'rgba(37, 99, 235, 0.15)',
    tagColor: '#93c5fd',

    /* 核心品牌色 */
    'primary-100': '#0a0a1a',        /* 最浅背景：页面边缘 */
    'primary-200': '#1a1a2e',       /* 次级背景：卡片背景 */
    'primary-300': '#2d2d4d',        /* 三级背景：分隔线/输入框边框 */
    'primary-color': '#0066ff',      /* 主色：主要按钮/标题 */
    'secondary-color': '#ff3e00',    /* 辅助色：警告状态/次要按钮 */
    'accent-color': '#00b894',       /* 强调色：成功状态/正增长数据 */

    /* 背景系统 */
    'bg-primary': 'var(--primary-900)',           /* 主背景：页面背景 */
    'bg-secondary': 'var(--primary-200)', /* 卡片背景 */
    'bg-tertiary': 'var(--primary-300)',  /* 输入框背景 */
    'surface-glass': 'rgba(255, 255, 255, 0.9)', /* 毛玻璃：弹出层 */

    /* 文字系统 */
    'text-primary': '#0a0a1a',       /* 主文本：标题/正文 */
    'text-secondary': '#2d2d4d',     /* 次级文本：描述/副标题 */
    'text-tertiary': '#6c757d',      /* 三级文本：占位符/辅助信息 */
    'text-accent': 'var(--secondary-color)', /* 强调文本：链接/交互元素 */
  }
}

export function applyTheme(theme) {
  const root = document.documentElement

  if (theme === 'dark') {
    // 切换暗黑主题
    root.setAttribute('data-theme', 'cyber-dark')
  } else {
    // 切换明亮主题
    root.setAttribute('data-theme', 'neon-light');
  }
  // const themeVariables = themes[theme]

  // Object.entries(themeVariables).forEach(([key, value]) => {
  //   root.style.setProperty(`--${key}`, value)
  // })

  // 记住用户当前喜好
  localStorage.setItem('theme', theme)
}

export function initTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme('dark')
    return 'dark'
  } else {
    applyTheme('light')
    return 'light'
  }
}