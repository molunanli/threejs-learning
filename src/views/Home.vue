<template>
  <div class="container">
    <!-- <Header /> -->


    <div class="search-bar">
      <input type="text" class="search-input" placeholder="搜索演示..." v-model="searchTerm">
      <button class="btn" @click="resetFilters">
        <i class="fas fa-sync-alt"></i> 重置筛选
      </button>
    </div>

    <div class="stats-bar">
      <div>显示 {{ filteredDemos.length }} / {{ demos.length }} 个演示</div>
      <div>当前分类: {{ activeCategory === 'all' ? '全部' : activeCategory }}</div>
    </div>

    <div class="categories">
      <button v-for="category in categories" :key="category" class="category-btn"
        :class="{ 'active': activeCategory === category }" @click="setActiveCategory(category)">
        {{ category === 'all' ? '全部' : category }}
      </button>
    </div>

    <h2 class="section-title">
      <i class="fas fa-laptop-code"></i>
      {{ activeCategory === 'all' ? '所有演示' : activeCategory + ' 演示' }}
    </h2>

    <div class="demos-grid" v-if="filteredDemos.length">
      <DemoCard v-for="demo in filteredDemos" :key="demo.id" :demo="demo" @click="navigateToDemo(demo.id)" />
    </div>

    <div class="no-results" v-else>
      <i class="fas fa-search"></i>
      <h3>没有找到相关演示</h3>
      <p>请尝试其他分类或搜索关键词</p>
    </div>

    <section class="about-section">
      <h2 class="section-title">
        <i class="fas fa-info-circle"></i>
        关于本项目
      </h2>
      <div class="about-content">
        <div class="about-text">
          <h3>Three.js 学习资源中心</h3>
          <p>这个项目旨在为WebGL和Three.js学习者提供一个实践平台，包含从基础到高级的各种演示案例。每个演示都包含完整源代码和详细注释，帮助您理解3D编程的核心概念。</p>
          <p>项目使用现代Web技术构建：Vue3 + Vite作为前端框架，Three.js作为3D引擎。</p>

          <h4 style="margin-top: 25px; margin-bottom: 15px;">技术栈</h4>
          <div class="tech-stack">
            <span class="tech-item">Vue 3</span>
            <span class="tech-item">Vite</span>
            <span class="tech-item">Three.js</span>
            <span class="tech-item">WebGL</span>
            <span class="tech-item">JavaScript ES6</span>
          </div>
        </div>
        <div class="about-image">
          <TechCube />
        </div>
      </div>
    </section>

    <footer>
      <div class="social-links">
        <a href="#"><i class="fab fa-github"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-discord"></i></a>
      </div>
      <p>© 2023 Three.js 学习中心 | 使用Vue3 + Vite + Three.js构建</p>
      <p style="margin-top: 10px; font-size: 12px;">本网站仅供学习交流使用，所有3D演示均为开源项目</p>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import demos from '@/data/demos';
import DemoCard from '@/components/DemoCard.vue';
// import Header from '@/components/Header.vue';
// import HeroSection from '@/components/HeroSection.vue';
import TechCube from '@/components/TechCube.vue';

export default {
  components: {
    DemoCard,

    TechCube // 注册组件
  },
  setup() {
    const router = useRouter();
    const activeCategory = ref('all');
    const searchTerm = ref('');

    const categories = ref([
      'all', '基础', '几何体', '材质', '光照', '动画', '高级'
    ]);

    const filteredDemos = computed(() => {
      let result = [...demos];

      // 分类过滤
      if (activeCategory.value !== 'all') {
        result = result.filter(demo => demo.category === activeCategory.value);
      }

      // 搜索过滤
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(demo =>
          demo.title.toLowerCase().includes(term) ||
          demo.description.toLowerCase().includes(term) ||
          demo.category.toLowerCase().includes(term)
        );
      }

      return result;
    });

    const setActiveCategory = (category) => {
      activeCategory.value = category;
    };

    const resetFilters = () => {
      activeCategory.value = 'all';
      searchTerm.value = '';
    };

    const navigateToDemo = (id) => {
      router.push({ name: 'DemoView', params: { id } });
    };

    return {
      demos,
      categories,
      activeCategory,
      searchTerm,
      filteredDemos,
      setActiveCategory,
      resetFilters,
      navigateToDemo
    };
  }
};
</script>

<style scoped>
/* 保持与之前相同的样式，略作调整以适应组件结构 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  display: flex;
  margin-bottom: 30px;
  gap: 15px;
}

.search-input {
  flex: 1;
  background: var(--glass);
  border: 1px solid var(--input-border-color);
  border-radius: 12px;
  padding: 12px 20px;
  /* color: white; */
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  /* color: #94a3b8; */
  font-size: 14px;
  padding: 0 10px;
}

.categories {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
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

.section-title {
  font-size: 28px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.section-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--primary), transparent);
}

.demos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: var(--glass);
  border-radius: 16px;
  border: 1px solid var(--border);
  margin-bottom: 60px;
}

.no-results i {
  font-size: 48px;
  color: var(--primary);
  margin-bottom: 20px;
}

.about-section {
  background: var(--light);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 60px;
  border: 1px solid var(--border);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.about-text h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.about-text p {
  margin-bottom: 15px;
  color: var(--gray);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.tech-item {
  background: rgba(79, 70, 229, 0.2);
  color: var(--primary);
  padding: 6px 15px;
  border-radius: 30px;
  font-size: 14px;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.about-image {
  border-radius: 12px;
  overflow: hidden;
  height: 300px;
  background: linear-gradient(45deg, var(--primary), var(--gray));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.about-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.4) 0%, transparent 40%);
}

footer {
  text-align: center;
  padding: 30px 0;
  /* color: #64748b; */
  font-size: 14px;
  border-top: 1px solid var(--border);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.social-links a {
  /* color: #94a3b8; */
  font-size: 20px;
  transition: all 0.3s ease;
}

.social-links a:hover {
  color: var(--primary);
  transform: translateY(-3px);
}

@media (max-width: 900px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .search-bar {
    flex-direction: column;
  }
}
</style>