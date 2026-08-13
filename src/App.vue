<template>
  <div class="app-container">
    <Header />
    <div class="main-container">
      <router-view />
    </div>
  </div>

</template>

<script setup>
import Header from '@/components/Header.vue';


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  /* background: linear-gradient(135deg, #0f172a, #1e293b); */
  color: var(--light);
  min-height: 100vh;
  line-height: 1.6;
}

.app-container {
  display: grid;
  grid-template-rows: auto 1fr;
  /* 第一行自动高度，第二行占剩余空间 */
  min-height: 100vh;
}

.main-container {
  overflow: auto;
  /* 如果内容过多，添加滚动条 */
}

.btn {
  display: inline-block;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  padding: 12px 28px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

i {
  margin-right: 8px;
}
</style>