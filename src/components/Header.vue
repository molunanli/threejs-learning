<template>
  <header>
    <div class="logo">
      <div class="logo-icon">
        <i class="fas fa-cube"></i>
      </div>
      <div class="logo-text">
        <h1>Three.js 学习中心</h1>
        <p>探索3D WebGL的无限可能</p>
      </div>
    </div>
    <nav>
      <ul class="navbar">
        <li class="nav-link"><router-link to="/" :class="{ 'active': activeNav === 'home' }">首页</router-link></li>
        <li class="nav-link"><router-link to="/test" :class="{ 'active': activeNav === 'demos' }">演示</router-link></li>
        <li class="nav-link"><router-link to="/blog" :class="{ 'active': activeNav === 'blogList' }">博客</router-link>
        </li>
        <li class="nav-link"><a href="#" :class="{ 'active': activeNav === 'resources' }">资源</a>
        </li>
        <li class="nav-link"><a href="#" :class="{ 'active': activeNav === 'about' }">关于</a></li>
        <ThemeToggle />
      </ul>
    </nav>

  </header>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// 计算属性，根据当前路由的meta.navKey返回激活的导航项
const activeNav = computed(() => route.meta.navKey || 'home');

// const activeNav = ref('home');

// const setActiveNav = (nav,path) => {
//   activeNav.value = nav;
//   router.push(path);
// };


</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 20px 0; */
  /* margin-bottom: 40px; */
  border-bottom: 1px solid var(--light-gray);
  height: 100px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-icon {
  background: var(--primary);
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.logo-text h1 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-text p {
  /* color: #94a3b8; */
  font-size: 14px;
}

nav ul {
  display: flex;
  gap: 25px;
  list-style: none;
}

.nav-link {
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.active {
  color: var(--primary);
}

/* 
nav a {
  color: #cbd5e1;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
} */

/* nav a:hover,
nav a.active {
  background: var(--glass);
  color: var(--dark);
} */

@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 20px;
  }

  nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>