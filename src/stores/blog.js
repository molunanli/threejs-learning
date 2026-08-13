import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref([
    {
      id: 1,
      slug: 'vue3-performance',
      title: 'Vue3 性能优化实践',
      excerpt: '深入探讨Vue3的性能优化技巧，包括编译优化、响应式优化和渲染优化',
      date: '2023-07-15',
      tags: ['Vue', '性能优化', '前端'],
      cover: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `# Vue3 性能优化实践\n\n在大型Vue3应用中，性能优化是至关重要的。本文将分享一些实用的Vue3性能优化技巧。\n\n## 编译优化\n\nVue3的编译器进行了重大改进：\n\n- **静态节点提升**：将静态节点提升到渲染函数外部\n- **补丁标志**：为动态节点添加补丁标志\n- **缓存事件处理程序**：避免不必要的重新渲染\n\n\`\`\`javascript
// 示例代码：使用v-memo优化渲染
import { ref } from 'vue'

const items = ref([/* 大型列表 */])
\`\`\`\n\n## 响应式优化\n\nVue3的响应式系统基于Proxy实现，性能更好。\n\n## 结论\n\n通过合理使用Vue3的新特性，可以显著提升应用性能。`
    },
    {
      id: 2,
      slug: 'vite-vs-webpack',
      title: 'Vite vs Webpack：现代前端构建工具对比',
      excerpt: '详细比较Vite和Webpack的优缺点，帮助你选择适合项目的构建工具',
      date: '2023-07-10',
      tags: ['Vite', 'Webpack', '构建工具'],
      cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `# Vite vs Webpack：现代前端构建工具对比\n\n## 概述\n\n在2023年，Vite和Webpack是两大主流前端构建工具。本文将深入比较两者的差异。\n\n## 开发体验\n\n- **Vite**：基于ESM，启动速度快，HMR更新迅速\n- **Webpack**：启动较慢，但随着缓存优化有所改善\n\n## 生产构建\n\n- **Vite**：使用Rollup进行生产构建，输出高度优化的代码\n- **Webpack**：成熟的代码分割和优化能力\n\n\`\`\`bash
# Vite启动命令
npm run dev
\`\`\`\n\n## 结论\n\n两者都是优秀的工具，根据项目需求选择最适合的解决方案。`
    },
    {
      id: 3,
      slug: 'composition-api',
      title: 'Vue3 Composition API 深度指南',
      excerpt: '掌握Vue3 Composition API的核心概念和使用技巧',
      date: '2023-07-05',
      tags: ['Vue', 'Composition API', '前端'],
      cover: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: `# Vue3 Composition API 深度指南\n\nComposition API 是 Vue3 的核心特性之一，它提供了更好的代码组织和复用能力。\n\n## 基本概念\n\nComposition API 的核心函数：\n\n- \`ref\`：创建响应式基本类型值\n- \`reactive\`：创建响应式对象\n- \`computed\`：创建计算属性\n- \`watch\` 和 \`watchEffect\`：响应式侦听\n\n\`\`\`javascript
// useCounter.js
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  
  return {
    count,
    increment,
    decrement
  };
}
\`\`\`\n\n## 最佳实践\n\n1. 使用组合函数封装可复用逻辑\n2. 合理组织setup函数\n3. 使用TypeScript增强类型安全`
    }
  ])

  const loading = ref(false)
  
  // 按日期排序
  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => 
      new Date(b.date) - new Date(a.date))
  })
  
  // 获取所有标签
  const allTags = computed(() => {
    const tags = new Set()
    posts.value.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  })
  
  // 根据slug获取文章
  const getPostBySlug = (slug) => {
    return posts.value.find(post => post.slug === slug)
  }
  
  // 模拟API加载
  const fetchPosts = () => {
    loading.value = true
    return new Promise(resolve => {
      setTimeout(() => {
        loading.value = false
        resolve()
      }, 800)
    })
  }
  
  return { 
    posts,
    sortedPosts,
    allTags,
    loading,
    getPostBySlug,
    fetchPosts
  }
})