<template>
    <div class="container">
        <main class="blog-detail">
            <div class="detail-container">
                <div class="content">
                    <div class="post-header">
                        <h1>Vue 3 性能优化实战指南</h1>
                        <div class="post-meta">
                            <span class="date">
                                <i class="far fa-calendar"></i>
                                2023年7月22日
                            </span>
                            <div class="tags">
                                <span class="tag">Vue.js</span>
                                <span class="tag">性能优化</span>
                                <span class="tag">前端开发</span>
                                <span class="tag">JavaScript</span>
                            </div>
                        </div>
                    </div>

                    <div class="markdown-body">

                        <h2 id="intro">引言：为什么需要性能优化</h2>
                        <p>在现代Web应用中，性能是用户体验的关键因素。Vue 3通过其创新的响应式系统和编译器优化，在性能方面比Vue
                            2有了显著提升。然而，随着应用规模的增长，性能问题仍然可能出现。本文将深入探讨Vue 3的性能优化策略和实践。</p>

                        <h2 id="reactivity">响应式系统优化</h2>
                        <p>Vue 3使用Proxy代替了Object.defineProperty，这带来了更好的性能和更多功能。然而，不当使用响应式系统仍可能导致性能问题。</p>

                        <div class="code-container">
                            <div class="code-header">
                                <span>JavaScript</span>
                                <span class="language-tag">vue.js</span>
                                <button class="copy-button"><i class="far fa-copy"></i> 复制</button>
                            </div>
                            <div class="code-block">
                                <pre><code v-pre>
// 使用计算属性缓存结果
const sortedList = computed(() => {
  return [...items.value].sort((a, b) => a.value - b.value);
});

// 避免在模板中进行复杂计算
// 不推荐：
&lt;div v-for="item in [...items].sort((a,b) => a.value - b.value)"&gt;
{{ list }}
// 推荐：
&lt;div v-for="item in sortedList"&gt;
                                </code></pre>
                            </div>
                        </div>

                        <h3 id="computed">计算属性的优化</h3>
                        <p>合理使用计算属性可以避免不必要的计算：</p>

                        <div class="code-container">
                            <div class="code-header">
                                <span>JavaScript</span>
                                <span class="language-tag">vue.js</span>
                                <button class="copy-button"><i class="far fa-copy"></i> 复制</button>
                            </div>
                            <div class="code-block">
                                <pre><code></code></pre>
                            </div>
                        </div>

                        <h2 id="rendering">渲染优化技巧</h2>
                        <p>Vue的虚拟DOM非常高效，但在某些情况下仍需要手动优化。</p>

                        <h3 id="v-once">使用v-once</h3>
                        <p>对于静态内容，使用v-once可以跳过更新：</p>

                        <div class="code-container">
                            <div class="code-header">
                                <span>HTML</span>
                                <span class="language-tag">vue template</span>
                                <button class="copy-button"><i class="far fa-copy"></i> 复制</button>
                            </div>
                            <div class="code-block">
                                <pre><code></code></pre>
                            </div>
                        </div>

                        <h3>虚拟滚动</h3>
                        <p>对于大型列表，使用虚拟滚动可以大幅提升性能：</p>

                        <div class="code-container">
                            <div class="code-header">
                                <span>HTML</span>
                                <span class="language-tag">vue template</span>
                                <button class="copy-button"><i class="far fa-copy"></i> 复制</button>
                            </div>
                            <div class="code-block">
                                <pre><code></code></pre>
                            </div>
                        </div>

                        <h2>代码分割与懒加载</h2>
                        <p>Vue 3与Vite配合提供了出色的代码分割能力：</p>

                        <div class="code-container">
                            <div class="code-header">
                                <span>JavaScript</span>
                                <span class="language-tag">vue.js</span>
                                <button class="copy-button"><i class="far fa-copy"></i> 复制</button>
                            </div>
                            <div class="code-block">
                                <pre><code></code></pre>
                            </div>
                        </div>

                        <h2>性能分析工具</h2>
                        <p>使用Vue Devtools进行性能分析：</p>

                        <ul>
                            <li>组件渲染时间分析</li>
                            <li>事件性能追踪</li>
                            <li>依赖关系可视化</li>
                        </ul>

                        <blockquote>
                            <p>性能优化是一个持续的过程，应该基于实际测量结果进行，而不是过早优化。使用Chrome DevTools的Performance面板进行性能分析，找出真正的瓶颈。</p>
                        </blockquote>
                    </div>

                    <div class="action-bar">
                        <a href="#" class="action-button">
                            <i class="fas fa-arrow-left"></i> 上一篇：Vue 3组合式API入门
                        </a>
                        <a href="#" class="action-button">
                            下一篇：Vue状态管理最佳实践 <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>

                <div class="sidebar">
                    <div class="author-card">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                            alt="作者" class="author-avatar">
                        <div class="author-info">
                            <h3 class="author-name">张明</h3>
                            <p class="author-title">高级前端工程师 @TechCorp</p>
                        </div>
                        <p class="author-bio">专注于Vue和前端性能优化，开源项目贡献者，技术博客作者。拥有8年前端开发经验，热爱分享技术知识。</p>
                        <div class="social-links">
                            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="social-link"><i class="fas fa-envelope"></i></a>
                        </div>
                    </div>

                    <div class="toc-container">
                        <h3 class="toc-title"><i class="fas fa-list"></i> 文章目录</h3>
                        <ul class="toc-list">
                            <li class="toc-item"><a href="#intro" class="toc-link">引言：为什么需要性能优化</a></li>
                            <li class="toc-item"><a href="#reactivity" class="toc-link">响应式系统优化</a></li>
                            <li class="toc-item"><a href="#computed" class="toc-link">计算属性的优化</a></li>
                            <li class="toc-item"><a href="#rendering" class="toc-link">渲染优化技巧</a></li>
                            <li class="toc-item"><a href="#v-once" class="toc-link">使用v-once</a></li>
                            <li class="toc-item"><a href="#virtual-scroll" class="toc-link">虚拟滚动</a></li>
                            <li class="toc-item"><a href="#code-splitting" class="toc-link">代码分割与懒加载</a></li>
                            <li class="toc-item"><a href="#tools" class="toc-link">性能分析工具</a></li>
                            <li class="toc-item"><a href="#best-practices" class="toc-link">最佳实践总结</a></li>
                            <li class="toc-item"><a href="#case-study" class="toc-link">案例研究：电商网站优化</a></li>
                            <li class="toc-item"><a href="#tools-comparison" class="toc-link">工具比较</a></li>
                            <li class="toc-item"><a href="#future-trends" class="toc-link">未来趋势</a></li>
                            <li class="toc-item"><a href="#conclusion" class="toc-link">结论</a></li>
                            <li class="toc-item"><a href="#resources" class="toc-link">资源推荐</a></li>
                            <li class="toc-item"><a href="#faq" class="toc-link">常见问题</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // 主题切换功能
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // 检查本地存储或系统偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

})

// 平滑滚动到锚点
document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // 模拟滚动效果
        const targetId = this.getAttribute('href');
        console.log(`导航到: ${targetId}`);

        // 添加视觉反馈
        this.style.color = 'var(--primary)';
        setTimeout(() => {
            this.style.color = '';
        }, 1000);
    });
});

// 复制代码功能
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', function () {
        const codeBlock = this.closest('.code-container').querySelector('.code-block');
        const textToCopy = codeBlock.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> 已复制!';

            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('复制失败: ', err);
        });
    });
});
</script>
<style scoped>
:root {
    --primary: #4361ee;
    --primary-dark: #3a56d4;
    --secondary: #7209b7;
    --dark: #1e293b;
    --light: #f8fafc;
    --gray: #64748b;
    --light-gray: #e2e8f0;
    --card-bg: #ffffff;
    --card-shadow: rgba(0, 0, 0, 0.08);
    --code-bg: #f8fafc;
    --code-highlight: #f1f5f9;
    --code-text: #1e293b;
    --code-comment: #64748b;
    --code-keyword: #8b5cf6;
    --code-string: #0d9488;
    --code-tag: #dc2626;
    --tag-bg: #f0f7ff;
    --tag-color: #2563eb;
    --border-radius: 12px;
    --transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dark-mode {
    --primary: #5e72e4;
    --primary-dark: #4a5bd0;
    --dark: #f1f5f9;
    --light: #0f172a;
    --gray: #94a3b8;
    --light-gray: #334155;
    --card-bg: #1e293b;
    --card-shadow: rgba(0, 0, 0, 0.25);
    --code-bg: #0f172a;
    --code-highlight: #1e293b;
    --code-text: #e2e8f0;
    --code-comment: #94a3b8;
    --code-keyword: #c084fc;
    --code-string: #5eead4;
    --code-tag: #f87171;
    --tag-bg: rgba(37, 99, 235, 0.15);
    --tag-color: #93c5fd;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: var(--light);
    color: var(--dark);
    line-height: 1.7;
    transition: background 0.3s ease, color 0.3s ease;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* 头部导航 */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--light-gray);
}

.logo {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 30px;
}

.nav-link {
    color: var(--gray);
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

/* 主内容区 */
.blog-detail {
    padding: 60px 0;
}

.detail-container {
    display: flex;
    gap: 50px;
}

.content {
    flex: 1;
    max-width: 780px;
    background: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px var(--card-shadow);
    padding: 50px;
    position: relative;
    overflow: hidden;
}

.content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.post-header {
    margin-bottom: 40px;
}

.post-header h1 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    color: var(--dark);
    line-height: 1.25;
    font-weight: 800;
    position: relative;
    padding-bottom: 15px;
}

.post-header h1::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: var(--primary);
    border-radius: 2px;
}

.post-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-top: 25px;
    color: var(--gray);
    font-size: 0.95rem;
}

.date {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(67, 97, 238, 0.1);
    padding: 8px 15px;
    border-radius: 30px;
}

.tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tag {
    background: var(--tag-bg);
    color: var(--tag-color);
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    transition: var(--transition);
    cursor: pointer;
}

.tag:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);
}

.markdown-body {
    line-height: 1.8;
    color: var(--dark);
    font-size: 1.1rem;
}

/* Markdown内容样式 */
.markdown-body h2 {
    margin-top: 3rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--light-gray);
    color: var(--dark);
    font-size: 1.8rem;
    font-weight: 700;
    position: relative;
    padding-left: 20px;
}

.markdown-body h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 15px;
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
}

.markdown-body h3 {
    margin-top: 2.5rem;
    color: var(--dark);
    font-size: 1.5rem;
    font-weight: 600;
}

.markdown-body p {
    margin: 1.8rem 0;
    color: var(--dark);
}

.markdown-body a {
    color: var(--primary);
    text-decoration: none;
    position: relative;
    font-weight: 500;
}

.markdown-body a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s;
}

.markdown-body a:hover::after {
    width: 100%;
}

.markdown-body blockquote {
    border-left: 4px solid var(--primary);
    background: rgba(67, 97, 238, 0.05);
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.markdown-body ul,
.markdown-body ol {
    margin: 1.8rem 0;
    padding-left: 2rem;
}

.markdown-body li {
    margin: 0.8rem 0;
}

/* 代码块优化 - 支持主题切换 */
.code-container {
    position: relative;
    margin: 2.2rem 0;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: var(--code-bg);
    transition: background 0.3s ease;
}

.code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(67, 97, 238, 0.1);
    padding: 10px 15px;
    font-family: 'Fira Code', monospace;
    color: var(--gray);
    font-size: 0.9rem;
    border-bottom: 1px solid var(--light-gray);
}

.language-tag {
    background: rgba(67, 97, 238, 0.2);
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    color: var(--primary);
}

.copy-button {
    background: rgba(67, 97, 238, 0.1);
    border: none;
    color: var(--primary);
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
}

.copy-button:hover {
    background: rgba(67, 97, 238, 0.2);
}

.code-block {
    padding: 1.5rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--code-text);
}

.code-block pre {
    margin: 0;
    padding: 0;
}

.code-block code {
    font-family: inherit;
    background: none;
    padding: 0;
}

/* 代码语法高亮 - 使用CSS变量支持主题切换 */
.code-block .hljs-comment,
.code-block .hljs-quote {
    color: var(--code-comment);
    font-style: italic;
}

.code-block .hljs-keyword,
.code-block .hljs-selector-tag {
    color: var(--code-keyword);
    font-weight: 500;
}

.code-block .hljs-string,
.code-block .hljs-regexp {
    color: var(--code-string);
}

.code-block .hljs-built_in,
.code-block .hljs-title {
    color: var(--primary);
}

.code-block .hljs-tag,
.code-block .hljs-name,
.code-block .hljs-attr {
    color: var(--code-tag);
}

.code-block .hljs-number {
    color: #d97706;
}

/* 侧边栏优化 */
.sidebar {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.author-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: 0 5px 20px var(--card-shadow);
    padding: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: var(--transition);
}

.author-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--card-shadow);
}

.author-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
    border: 3px solid var(--primary);
    padding: 3px;
    object-fit: cover;
    transition: var(--transition);
}

.author-card:hover .author-avatar {
    transform: scale(1.05);
}

.author-info {
    text-align: center;
    margin-bottom: 20px;
}

.author-name {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: var(--dark);
}

.author-title {
    color: var(--gray);
    font-size: 0.95rem;
    margin-bottom: 15px;
}

.author-bio {
    color: var(--gray);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-top: 15px;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

.social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(67, 97, 238, 0.1);
    color: var(--primary);
    transition: var(--transition);
    text-decoration: none;
    font-size: 1.1rem;
}

.social-link:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-3px);
}

.toc-container {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: 0 5px 20px var(--card-shadow);
    padding: 30px;
    transition: var(--transition);
    position: sticky;
    top: 100px;
}

.toc-container:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px var(--card-shadow);
}

.toc-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: var(--dark);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--light-gray);
}

.toc-title i {
    color: var(--primary);
}

.toc-list {
    list-style: none;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 5px;
}

/* 优化滚动条 - 更优雅的设计 */
.toc-list::-webkit-scrollbar {
    width: 6px;
}

.toc-list::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

.toc-list::-webkit-scrollbar-thumb {
    background: rgba(67, 97, 238, 0.3);
    border-radius: 10px;
    transition: background 0.3s;
}

.toc-list::-webkit-scrollbar-thumb:hover {
    background: rgba(67, 97, 238, 0.6);
}

.dark-mode .toc-list::-webkit-scrollbar-thumb {
    background: rgba(94, 114, 228, 0.3);
}

.dark-mode .toc-list::-webkit-scrollbar-thumb:hover {
    background: rgba(94, 114, 228, 0.6);
}

.toc-item {
    margin-bottom: 12px;
    position: relative;
}

.toc-link {
    color: var(--gray);
    text-decoration: none;
    transition: all 0.3s;
    display: block;
    padding: 8px 0 8px 15px;
    border-radius: 6px;
}

.toc-link:hover {
    color: var(--primary);
    background: rgba(67, 97, 238, 0.05);
    padding-left: 20px;
}

.toc-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: var(--primary);
    border-radius: 50%;
    opacity: 0.7;
}

/* 底部操作栏 */
.action-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid var(--light-gray);
}

.action-button {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(67, 97, 238, 0.1);
    color: var(--primary);
    padding: 12px 25px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
}

.action-button:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .detail-container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        flex-direction: row;
        gap: 20px;
    }

    .author-card,
    .toc-container {
        flex: 1;
    }
}

@media (max-width: 768px) {
    .sidebar {
        flex-direction: column;
    }

    .post-header h1 {
        font-size: 2.2rem;
    }

    .content {
        padding: 30px;
    }

    .action-bar {
        flex-direction: column;
        gap: 15px;
    }
}

@media (max-width: 480px) {
    .nav-links {
        display: none;
    }

    .post-header h1 {
        font-size: 1.8rem;
    }

    .markdown-body h2 {
        font-size: 1.5rem;
    }
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.content,
.sidebar>* {
    animation: fadeIn 0.6s ease-out forwards;
}

.toc-container {
    animation-delay: 0.1s;
}

.author-card {
    animation-delay: 0.2s;
}
</style>