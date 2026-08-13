<template>
  <div class="demo-detail">
    <Header />
    
    <div class="container">
      <div class="back-button">
        <button class="btn" @click="goBack">
          <i class="fas fa-arrow-left"></i> 返回首页
        </button>
      </div>
      
      <div v-if="!demo" class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>加载演示中...</p>
      </div>
      
      <div v-else class="demo-content">
        <div class="demo-header">
          <h1>{{ demo.title }}</h1>
          <div class="demo-meta">
            <span class="category-tag">{{ demo.category }}</span>
            <span><i class="far fa-clock"></i> {{ demo.duration }}</span>
            <span><i class="far fa-star"></i> {{ demo.level }}</span>
          </div>
        </div>
        
        <div class="demo-preview">
          <div class="preview-image">
            <img :src="demo.image" :alt="demo.title">
          </div>
          
          <div class="preview-description">
            <h2>演示说明</h2>
            <div class="description-content" v-html="formatContent(demo.content)"></div>
          </div>
        </div>
        
        <div class="demo-code">
          <h2>代码示例</h2>
          <pre><code>{{ demo.code }}</code></pre>
        </div>
      </div>
    </div>
    
    <footer>
      <div class="social-links">
        <a href="#"><i class="fab fa-github"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-discord"></i></a>
      </div>
      <p>© 2023 Three.js 学习中心 | 使用Vue3 + Vite + Three.js构建</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import demos from '@/data/demos';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const demo = ref(null);
    
    onMounted(() => {
      const demoId = parseInt(route.params.id);
      const foundDemo = demos.find(d => d.id === demoId);
      
      if (foundDemo) {
        demo.value = foundDemo;
      } else {
        router.push('/');
      }
    });
    
    const goBack = () => {
      router.push('/');
    };
    
    const formatContent = (content) => {
      // 确保不会在 undefined 上调用 replace
      return content ? content.replace(/\n/g, '<br>') : '';
    };
    
    return {
      demo,
      goBack,
      formatContent
    };
  }
};
</script>

<style scoped>
/* ... 原有样式 ... */

/* 添加加载状态样式 */
.loading {
  text-align: center;
  padding: 100px 0;
  color: #94a3b8;
  font-size: 18px;
}

.loading i {
  font-size: 48px;
  margin-bottom: 20px;
  color: var(--primary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>