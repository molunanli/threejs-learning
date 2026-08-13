<template>
  <div>
    <component :is="currentDemo" v-if="currentDemo" />
    <div v-else class="loading-screen">
      <div class="spinner"></div>
      <p>加载演示中...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import demos from '@/data/demos';

export default {
  name: 'DemoView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const demoId = parseInt(route.params.id);
    const demoComponent = ref(null);
    const loading = ref(true);
    const error = ref(null);
    
    // 动态加载组件
    const loadDemoComponent = async () => {
      const demo = demos.find(d => d.id === demoId);
      
      if (!demo) {
        error.value = '未找到该演示';
        loading.value = false;
        return;
      }
      
      try {
        // 动态导入组件
        const componentModule = await import(`@/demos/${demo.component}.vue`);
        demoComponent.value = componentModule.default;
      } catch (err) {
        console.error(`无法加载演示组件: ${demo.component}`, err);
        error.value = `无法加载演示: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };
    
    const goBack = () => {
      router.push('/');
    };
    
    onMounted(() => {
      loadDemoComponent();
    });
    
    const currentDemo = computed(() => demoComponent.value);
    
    return {
      currentDemo,
      loading,
      error,
      goBack
    };
  }
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #cbd5e1;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #ff6b6b;
  padding: 20px;
  text-align: center;
}

.error-screen p {
  font-size: 18px;
  margin-bottom: 20px;
}

.error-screen button {
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.error-screen button:hover {
  background: rgba(99, 102, 241, 0.2);
}
</style>