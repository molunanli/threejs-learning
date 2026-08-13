<!-- src/components/ThemeToggle.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { applyTheme, initTheme } from '@/utils/theme'

const currentTheme = ref('light')

onMounted(() => {
  currentTheme.value = initTheme()
})

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  applyTheme(currentTheme.value)
}
</script>

<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme"
    :aria-label="`切换到${currentTheme === 'light' ? '暗黑' : '明亮'}模式`"
  >
    <i 
      class="fas" 
      :class="currentTheme === 'light' ? 'fa-moon' : 'fa-sun'"
    ></i>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.theme-toggle:hover {
  color: var(--primary);
}
</style>