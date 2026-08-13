<template>
    <div class="container">
        <header>
            <h1>Three.js 入门指南</h1>
            <p class="subtitle">创建你的第一个3D场景</p>
        </header>

        <div class="card interactive-demo">
            <h2>交互式示例</h2>
            <p>以下是一个完整的Three.js示例，您可以调整参数查看效果：</p>

            <div id="demo-container">
                <div class="demo-status">正在初始化3D场景...</div>
            </div>

            <div class="controls">

            </div>
        </div>

        <footer>
            <p>Three.js 入门指南 &copy; 2023 | 创建你的第一个3D场景</p>
        </footer>
    </div>
</template>

<script>
import * as THREE from 'three';
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';

export default {
    name: 'Demo2',
    setup() {
        const init = () => {
            const container = document.getElementById('demo-container');

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera();
            const renderer = new THREE.WebGLRenderer();

            renderer.render(scene, camera);

            const canvas = renderer.domElement;
            // 清除容器内容并添加渲染器DOM元素
            container.innerHTML = '';
            container.appendChild(canvas);
        }

        onMounted(() => {
            init();
        });
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #e6e6ff;
    line-height: 1.6;
    padding: 20px;
    overflow-x: hidden;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    padding: 40px 0;
    margin-bottom: 40px;
    background: rgba(0, 0, 40, 0.7);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid #4a4a8a;
}

h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    color: #64b5f6;
    text-shadow: 0 0 10px rgba(100, 181, 246, 0.5);
}

.subtitle {
    font-size: 1.5rem;
    color: #90caf9;
    max-width: 800px;
    margin: 0 auto;
}

.card {
    background: rgba(25, 25, 50, 0.8);
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 40px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    border: 1px solid #4a4a8a;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

h2 {
    color: #4fc3f7;
    font-size: 2.2rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #4a4a8a;
}

h3 {
    color: #81d4fa;
    font-size: 1.8rem;
    margin: 25px 0 15px;
}

h4 {
    color: #b3e5fc;
    font-size: 1.4rem;
    margin: 20px 0 10px;
}

p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    line-height: 1.8;
}

.interactive-demo {
    min-width: 1200px;
    background: rgba(10, 20, 40, 0.8);
    border-radius: 15px;
    padding: 30px;
    margin: 40px 0;
    text-align: center;
    border: 1px solid #4a5a8a;
}

#demo-container {
    width: 100%;
    height: 400px;
    background: #0a1424;
    border-radius: 10px;
    margin: 20px 0;
    overflow: hidden;
    border: 1px solid #3a4a6a;
    position: relative;
}

.demo-status {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #4fc3f7;
    font-weight: bold;
    z-index: 10;
}

.controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.control-group {
    background: rgba(25, 40, 65, 0.7);
    padding: 15px;
    border-radius: 10px;
    min-width: 250px;
}

.control-group h4 {
    margin-top: 0;
    margin-bottom: 15px;
}

.slider-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.slider-container label {
    display: flex;
    justify-content: space-between;
}

input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #2a3a5a;
    outline: none;
    -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4fc3f7;
    cursor: pointer;
}

footer {
    text-align: center;
    padding: 30px 0;
    margin-top: 40px;
    border-top: 1px solid #3a4a6a;
    color: #90a4ae;
}

@media (max-width: 768px) {
    .visualization {
        flex-direction: column;
    }

    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 1.8rem;
    }
}
</style>