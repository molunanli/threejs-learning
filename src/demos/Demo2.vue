<template>
  <div class="container">
    <header>
      <h1>Three.js 入门指南</h1>
      <p class="subtitle">创建你的第一个3D场景：场景、相机和渲染器的核心概念</p>
    </header>

    <div class="card interactive-demo">
      <h2>交互式示例</h2>
      <p>以下是一个完整的Three.js示例，您可以调整参数查看效果：</p>

      <div id="demo-container">
        <div class="demo-status">正在初始化3D场景...</div>
      </div>

      <div class="controls">
        <div class="control-group">
          <h4>相机位置</h4>
          <div class="slider-container">
            <label>
              <span>X轴: </span>
              <span id="x-value">5.0</span>
            </label>
            <input type="range" id="camera-x" min="0" max="10" value="5.0" step="0.1" class="slider">
          </div>
          <div class="slider-container">
            <label>
              <span>Y轴: </span>
              <span id="y-value">5.0</span>
            </label>
            <input type="range" id="camera-y" min="0" max="10" value="5.0" step="0.1" class="slider">
          </div>
          <div class="slider-container">
            <label>
              <span>Z轴: </span>
              <span id="z-value">5.0</span>
            </label>
            <input type="range" id="camera-z" min="0" max="10" value="5.0" step="0.1" class="slider">
          </div>
        </div>

        <div class="control-group">
          <h4>模型属性</h4>
          <div class="slider-container">
            <label>
              <span>宽度: </span>
              <span id="width-value">1.0</span>
            </label>
            <input type="range" id="model-width" min="0" max="2" value="1.0" step="0.1" class="slider">
          </div>
          <div class="slider-container">
            <label>
              <span>高度: </span>
              <span id="height-value">1.0</span>
            </label>
            <input type="range" id="model-height" min="0" max="2" value="1.0" step="0.1" class="slider">
          </div>
          <div class="slider-container">
            <label>
              <span>深度: </span>
              <span id="depth-value">1.0</span>
            </label>
            <input type="range" id="model-depth" min="0" max="2" value="1.0" step="0.1" class="slider">
          </div>
        </div>
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
    // 定义场景、相机、渲染器、网格模型、画布宽高
    let scene, camera, renderer, cube;
    const width = 800; //宽度
    const height = 500; //高度

    const init = () => {
      const container = document.getElementById('demo-container');
      if (!container) {
        console.error("找不到demo-container元素");
        return;
      }

      // const statusElement = container.querySelector('.demo-status');
      // 创建场景
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a1424);
      // 添加网格辅助
      const gridHelper = new THREE.GridHelper(10, 20, 0x3a4a6a, 0x2a3a5a);
      scene.add(gridHelper);
      // 添加坐标轴辅助
      const axesHelper = new THREE.AxesHelper(3);
      scene.add(axesHelper);
      // 添加灯光
      const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
      scene.add(ambientLight);
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);

      directionalLight1.position.set(1, 1, 1);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(-1, -1, -1);
      scene.add(directionalLight2);

      // 创建相机
      camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 5, 5);
      camera.lookAt(0, 0, 0);

      // 创建渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // 创建立方体
      const geometry = new THREE.BoxGeometry(4, 4, 4);
      const material = new THREE.MeshPhongMaterial({
        color: 0xff5252,
        shininess: 100,
        specular: 0xffffff
      });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // 将场景和相机进行渲染
      renderer.render(scene, camera);

      // 清除容器内容并添加渲染器DOM元素
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // 动画循环
      function animate() {
        requestAnimationFrame(animate);

        // 旋转立方体
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;

        renderer.render(scene, camera);
      }

      // 开始渲染循环
      animate();


      // 调整相机位置参数的函数
      function updateCameraPosition() {
        const x = parseFloat(document.getElementById('camera-x').value);
        const y = parseFloat(document.getElementById('camera-y').value);
        const z = parseFloat(document.getElementById('camera-z').value);

        camera.position.set(x, y, z);
        camera.lookAt(0, 0, 0);

        // 更新显示值
        document.getElementById('x-value').textContent = x.toFixed(1);
        document.getElementById('y-value').textContent = y.toFixed(1);
        document.getElementById('z-value').textContent = z.toFixed(1);
      }

      // 调整模型尺寸的函数
      function updateModelSize() {
        const width = parseFloat(document.getElementById('model-width').value);
        const height = parseFloat(document.getElementById('model-height').value);
        const depth = parseFloat(document.getElementById('model-depth').value);

        // 更新立方体尺寸
        cube.scale.set(width, height, depth);

        // 更新显示值
        document.getElementById('width-value').textContent = width.toFixed(1);
        document.getElementById('height-value').textContent = height.toFixed(1);
        document.getElementById('depth-value').textContent = depth.toFixed(1);
      }

      // 添加事件监听器
      document.getElementById('camera-x').addEventListener('input', updateCameraPosition);
      document.getElementById('camera-y').addEventListener('input', updateCameraPosition);
      document.getElementById('camera-z').addEventListener('input', updateCameraPosition);

      document.getElementById('model-width').addEventListener('input', updateModelSize);
      document.getElementById('model-height').addEventListener('input', updateModelSize);
      document.getElementById('model-depth').addEventListener('input', updateModelSize);

      // 初始更新
      updateCameraPosition();
      updateModelSize();
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