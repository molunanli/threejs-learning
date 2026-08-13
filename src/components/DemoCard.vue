<template>
  <div 
    class="demo-card"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :style="{
      transform: hover ? 'translateY(-10px)' : 'translateY(0)',
      boxShadow: hover ? '0 15px 30px rgba(0, 0, 0, 0.3)' : 'none'
    }"
    @click="navigateToDemo"
  >
    <div class="card-preview">
      <img :src="demo.image" :alt="demo.title">
      <span class="card-tag">{{ demo.category }}</span>
    </div>
    <div class="card-content">
      <h3>{{ demo.title }}</h3>
      <p>{{ demo.description }}</p>
      <div class="card-meta">
        <div class="card-stats">
          <span><i class="far fa-clock"></i> {{ demo.duration }}</span>
          <span><i class="far fa-star"></i> {{ demo.level }}</span>
        </div>
        <a href="#" class="card-link" @click.prevent="navigateToDemo">
          查看演示 <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    demo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const hover = ref(false);
    const router = useRouter();
    
    const navigateToDemo = () => {
      // 导航到演示视图，传递演示ID
      router.push({ name: 'DemoView', params: { id: props.demo.id } });
    };
    
    return {
      hover,
      navigateToDemo
    };
  }
};
</script>

<style scoped>
.demo-card {
  background: var(--glass);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 1;
  cursor: pointer;
}

.demo-card:hover .card-preview img {
  transform: scale(1.05);
}

.card-preview {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.card-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card-content p {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 20px;
  flex: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #64748b;
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-stats span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.card-link:hover {
  color: var(--secondary);
  gap: 10px;
}
</style>