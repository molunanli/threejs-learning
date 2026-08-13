<template>
  <div class="blog-list">
    <!-- 博客卡片1 -->
    <router-link to="blog/details" class="blog-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="Vue 3 性能优化">
      </div>
      <div class="card-content">
        <h3 class="card-title">Vue 3 性能优化实战指南</h3>
        <p class="card-excerpt">深入探讨Vue 3的性能优化策略，包括Composition API的最佳实践、懒加载组件、虚拟滚动以及高效的渲染优化技巧。</p>
        <div class="card-meta">
          <span class="card-date"><i class="far fa-calendar"></i> 2023-07-22</span>
          <div class="card-tags">
            <span class="card-tag">Vue.js</span>
            <span class="card-tag">性能优化</span>
          </div>
        </div>
      </div>
    </router-link>

    <!-- 博客卡片2 -->
    <a href="#" class="blog-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="现代CSS架构">
      </div>
      <div class="card-content">
        <h3 class="card-title">现代CSS架构：从BEM到Utility-First</h3>
        <p class="card-excerpt">分析现代CSS架构的演变，比较BEM、SMACSS、ITCSS和Utility-First方法的优缺点，并提供在实际项目中实施的最佳实践。</p>
        <div class="card-meta">
          <span class="card-date"><i class="far fa-calendar"></i> 2023-09-03</span>
          <div class="card-tags">
            <span class="card-tag">CSS</span>
            <span class="card-tag">架构</span>
          </div>
        </div>
      </div>
    </a>

    <!-- 博客卡片3 -->
    <a href="#" class="blog-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="前端开发趋势">
      </div>
      <div class="card-content">
        <h3 class="card-title">2023年前端开发趋势与未来展望</h3>
        <p class="card-excerpt">探索今年最重要的前端技术演进，包括WebAssembly的兴起、微前端架构的普及以及AI在前端开发中的应用。了解如何为未来做好准备。</p>
        <div class="card-meta">
          <span class="card-date"><i class="far fa-calendar"></i> 2023-08-15</span>
          <div class="card-tags">
            <span class="card-tag">前端</span>
            <span class="card-tag">趋势</span>
          </div>
        </div>
      </div>
    </a>

    <!-- 博客卡片4 -->
    <a href="#" class="blog-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="TypeScript">
      </div>
      <div class="card-content">
        <h3 class="card-title">TypeScript 5.0新特性深度解析</h3>
        <p class="card-excerpt">详细介绍TypeScript 5.0带来的新特性，包括装饰器改进、性能优化和类型系统增强，以及如何升级现有项目。</p>
        <div class="card-meta">
          <span class="card-date"><i class="far fa-calendar"></i> 2023-07-05</span>
          <div class="card-tags">
            <span class="card-tag">TypeScript</span>
            <span class="card-tag">JavaScript</span>
          </div>
        </div>
      </div>
    </a>

    <!-- 博客卡片5 -->
    <a href="#" class="blog-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="React 18">
      </div>
      <div class="card-content">
        <h3 class="card-title">React 18并发特性实战指南</h3>
        <p class="card-excerpt">深入探讨React 18的并发渲染特性，包括自动批处理、过渡更新和Suspense的改进，以及如何利用这些特性提升应用性能。</p>
        <div class="card-meta">
          <span class="card-date"><i class="far fa-calendar"></i> 2023-06-18</span>
          <div class="card-tags">
            <span class="card-tag">React</span>
            <span class="card-tag">性能优化</span>
          </div>
        </div>
      </div>
    </a>

    <!-- 博客卡片6 -->
    <a href="#" class="blog-card">
      <div class="card-image">
        <img
          src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          alt="Web性能优化">
      </div>
      <div class="card-content">
        <h3 class="card-title">现代Web性能优化全攻略</h3>
        <p class="card-excerpt">从加载优化、渲染优化到运行时优化，全面介绍现代Web应用的性能优化技巧和工具，帮助你打造极速体验。</p>
        <div class="card-meta">
          <span class="card-date"><i class="far fa-calendar"></i> 2023-05-22</span>
          <div class="card-tags">
            <span class="card-tag">性能优化</span>
            <span class="card-tag">Web</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script setup>


</script>
<style scoped>
/* 博客列表 */
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.blog-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px var(--card-shadow);
  overflow: hidden;
  transition: var(--transition);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.card-image::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.1);
}

.card-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--dark);
  line-height: 1.4;
  transition: color 0.3s;
}

.blog-card:hover .card-title {
  color: var(--primary);
}

.card-excerpt {
  color: var(--gray);
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid var(--light-gray);
  color: var(--gray);
  font-size: 0.9rem;
}

.card-date {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.card-tag {
  background: var(--tag-bg);
  color: var(--tag-color);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: var(--transition);
}

.card-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(67, 97, 238, 0.2);
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 60px;
}

.page-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--gray);
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
  box-shadow: 0 2px 5px var(--card-shadow);
}

.page-link:hover,
.page-link.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
}

.page-link.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>