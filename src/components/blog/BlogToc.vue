<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const tocItems = computed(() => {
  if (!props.content) return []
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.content, 'text/html')
  const headings = doc.querySelectorAll('h2, h3')
  const toc = []
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1))
    const text = heading.textContent
    const id = text.toLowerCase().replace(/\s+/g, '-')
    
    toc.push({
      level,
      text,
      id
    })
  })
  
  return toc
})
</script>

<template>
  <div class="toc-card" v-if="tocItems.length > 0">
    <h3 class="toc-title">目录</h3>
    <ul class="toc-list">
      <li v-for="item in tocItems" :key="item.id" :class="`toc-level-${item.level}`">
        <a :href="`#${item.id}`">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.toc-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 20px;
}

.toc-title {
  margin-top: 0;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 1.1rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 10px;
  line-height: 1.4;
}

.toc-list li a {
  color: #475569;
  text-decoration: none;
  transition: color 0.2s ease;
  display: block;
  padding: 4px 0;
}

.toc-list li a:hover {
  color: #2563eb;
}

.toc-level-2 {
  font-weight: 600;
  font-size: 0.95rem;
}

.toc-level-3 {
  padding-left: 15px;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>