<template>
  <div class="blog-list">
    <div class="header">
      <h1>技术博客</h1>
      <p class="subtitle">探索最新前端技术和开发实践</p>
    </div>
    <div class="category-filter">
      <button class="category-btn active">全部</button>
      <button class="category-btn">Vue.js</button>
      <button class="category-btn">React</button>
      <button class="category-btn">性能优化</button>
      <button class="category-btn">JavaScript</button>
      <button class="category-btn">CSS</button>
      <button class="category-btn">TypeScript</button>
    </div>
    <BlogCard></BlogCard>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/blog/BlogCard.vue'
import { onMounted } from 'vue'


</script>
<style scoped>
.blog-list {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

/* 分类筛选 */
.category-filter {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background: rgba(67, 97, 238, 0.1);
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
}

.category-btn:hover,
.category-btn.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 5px 15px rgba(67, 97, 238, 0.2);
}

.loading {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(59, 130, 246, 0.2);
  border-top: 5px solid #3b82f6;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.posts-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>