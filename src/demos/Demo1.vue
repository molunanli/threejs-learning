<template>
  <div class="demo-container">
    <div ref="container" class="three-container"></div>
    <div class="demo-info">
      <h1>旋转立方体演示</h1>
      <p>这是一个基本的Three.js场景，展示了一个旋转的立方体。</p>
      <button @click="backToHome" class="back-btn">
        <i class="fas fa-arrow-left"></i> 返回首页
      </button>
      <div id="demo"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Demo1',
  setup() {
    const container = ref(null);
    const router = useRouter();
    let scene, camera, renderer, cube;
    const width = 800; //宽度
    const height = 500; //高度

    const init = () => {
      // 创建场景
      scene = new THREE.Scene();

      // 创建相机
      const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer();


      // 创建网格模型
      const geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
      const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,//0xff0000设置材质颜色为红色
      }); //材质
      cube = new THREE.Mesh(geometry, material); //网格模型
      cube.position.set(0, 0, 0) //模型位置
      scene.add(cube); //放入场景

      // 相机观测
      camera.position.set(200, 200, 200); //相机位置
      camera.lookAt(cube.position); //看向何处

      // 进行渲染
      renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
      renderer.render(scene, camera); //执行渲染操作

      // 插入HTML元素中
      document.getElementById('demo').appendChild(renderer.domElement);

      // 响应窗口大小变化
      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect = container.value.clientWidth / container.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    };

    const backToHome = () => {
      router.push('/');
    };

    onMounted(() => {
      init();
    });

    onBeforeUnmount(() => {
      if (renderer) {
        renderer.dispose();
      }
      window.removeEventListener('resize', onWindowResize);
    });

    return {
      container,
      backToHome
    };
  }
};
</script>

<style scoped></style>