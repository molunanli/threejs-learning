<template>
    <!-- 主内容区 -->
    <div class="main-wrapper">
        <!-- 左侧：3D展示区 - 固定在视口中央 -->
        <div class="demo-display">
            <div id="three-container"></div>
            <!-- <div class="scene-info">
                <h3><i class="fas fa-info-circle"></i> 场景说明</h3>
                <p>这个演示展示了Three.js的动态几何体生成能力。右侧控制面板可以调整几何体参数、材质、光照和动画效果。</p>
            </div> -->
        </div>

        <!-- 右侧：控制面板 - 独立滚动 -->
        <div class="control-panel">
            <!-- <div class="panel-header">
                <h2 class="panel-title"><i class="fas fa-sliders-h"></i> 参数控制面板</h2>
                <div class="btn" id="resetBtn">
                    <i class="fas fa-redo"></i> 重置
                </div>
            </div> -->

            <!-- 场景控制 -->
            <div class="panel-section" style="animation-delay: 0.2s">
                <h3 class="section-title"><i class="fas fa-shapes"></i> 场景设置</h3>
                <div class="control-group">
                    <input type="checkbox" id="wireframe" checked v-model="axesVisible" @change="axesHelperHandler">
                    <label for="wireframe">显示坐标轴</label>
                </div>
                <label class="control-label">
                    坐标轴大小
                    <span id="sizeValue">{{ axesSize }}</span>
                </label>
                <div>
                    <el-slider :max="500" v-model="axesSize" :disabled="!axesVisible" @input="axesSizeHandler" />
                </div>
            </div>
            <!-- 几何体控制 -->
            <div class="panel-section" style="animation-delay: 0.1s">
                <h3 class="section-title"><i class="fas fa-shapes"></i> 几何体设置</h3>
                <div class="control-group">
                    <label class="control-label">
                        几何体类型
                        <span>当前: {{ geometry }}</span>
                    </label>
                    <el-select v-model="geometry" placeholder="Select" @change="switchGeometry">
                        <el-option v-for="item in geometryObject" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>


                <div class="control-group" v-for="(item, index) in geomParams" :key="index">
                    <label class="control-label">
                        {{ index }}
                        <span id="sizeValue">{{ item.value }}</span>
                    </label>
                    <!-- <div class="slider-container">
                        <input type="range" :min="item.min" :max="item.max" :step="item.step" :value="item.value"
                            class="slider" id="sizeSlider">
                    </div> -->
                    <div>
                        <el-slider :min="item.min" :max="item.max" :step="item.step" v-model="item.value"
                            @input="updateParams" />
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        height
                        <span id="detailValue">16</span>
                    </label>
                    <div class="slider-container">
                        <input type="range" min="4" max="32" step="1" value="16" class="slider" id="detailSlider">
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        场景背景色
                        <span>当前颜色: {{ color }}</span>
                    </label>
                    <input type="color" v-model="color" @input="onColorChange">
                </div>
            </div>

            <!-- 材质控制 -->
            <div class="panel-section" style="animation-delay: 0.2s">
                <h3 class="section-title"><i class="fas fa-paint-brush"></i> 材质设置</h3>

                <div class="control-group">
                    <label class="control-label">
                        材质颜色
                    </label>
                    <div class="color-controls">
                        <div class="color-btn active" style="background:#6366f1" data-color="#6366f1"></div>
                        <div class="color-btn" style="background:#34d399" data-color="#34d399"></div>
                        <div class="color-btn" style="background:#f472b6" data-color="#f472b6"></div>
                        <div class="color-btn" style="background:#fbbf24" data-color="#fbbf24"></div>
                        <div class="color-btn" style="background:#60a5fa" data-color="#60a5fa"></div>
                        <div class="color-btn" style="background:#8b5cf6" data-color="#8b5cf6"></div>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        金属质感
                        <span id="metalValue">0.7</span>
                    </label>
                    <div class="slider-container">
                        <input type="range" min="0" max="1" step="0.01" value="0.7" class="slider" id="metalSlider">
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        粗糙度
                        <span id="roughValue">0.3</span>
                    </label>
                    <div class="slider-container">
                        <input type="range" min="0" max="1" step="0.01" value="0.3" class="slider" id="roughSlider">
                    </div>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="wireframe" checked>
                    <label for="wireframe">显示线框</label>
                </div>
            </div>

            <!-- 光照与动画 -->
            <div class="panel-section" style="animation-delay: 0.3s">
                <h3 class="section-title"><i class="fas fa-lightbulb"></i> 光照与动画</h3>

                <div class="control-group">
                    <label class="control-label">
                        光照强度
                        <span id="lightValue">1.0</span>
                    </label>
                    <div class="slider-container">
                        <input type="range" min="0.1" max="2" step="0.1" value="1.0" class="slider" id="lightSlider">
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        旋转速度
                        <span id="speedValue">0.8</span>
                    </label>
                    <div class="slider-container">
                        <input type="range" min="0" max="2" step="0.1" value="0.8" class="slider" id="speedSlider">
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" id="playBtn">
                        <i class="fas fa-play"></i> 播放动画
                    </button>
                    <button class="btn" id="pauseBtn">
                        <i class="fas fa-pause"></i> 暂停
                    </button>
                </div>
            </div>

            <!-- 导出选项 -->
            <div class="panel-section" style="animation-delay: 0.4s">
                <h3 class="section-title"><i class="fas fa-download"></i> 导出选项</h3>
                <div class="action-buttons">
                    <button class="btn" id="exportBtn">
                        <i class="fas fa-code"></i> 导出代码
                    </button>
                    <button class="btn btn-primary" id="screenshotBtn">
                        <i class="fas fa-image"></i> 保存截图
                    </button>
                </div>
            </div>

            <!-- 添加一些额外空间 -->
            <div style="height: 50px;"></div>
        </div>
    </div>
</template>
<script setup>
import * as THREE from 'three'
import { onMounted, ref, computed } from 'vue';

let scene, mesh, camera, renderer, axesHelper;

// Three.js 相关引用
const threeContainer = ref(null);
const geometry = ref('BoxGeometry')
const material = ref(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))



const color = ref('#000000') //场景背景色
let axesVisible = ref(false); //坐标轴显隐
const axesSize = ref(150) //坐标轴尺寸
const geometryObject = [
    { label: '立方体', value: 'BoxGeometry' },
    { label: '球体', value: 'SphereGeometry' },
    { label: '圆柱体', value: 'CylinderGeometry' }
]
const geometryParams = {
    BoxGeometry: { width: 100, height: 100, depth: 100 },
    SphereGeometry: { radius: 100, widthSegments: 32, heightSegments: 32 },
    CylinderGeometry: { radiusTop: 5, radiusBottom: 5, height: 100, radialSegments: 32 }
}
// 定义响应式几何体配置
const geometryConfig = ref({
    type: 'BoxGeometry',
    params: {
        // BoxGeometry: { width: 100, height: 100, depth: 100 },
        // SphereGeometry: { radius: 1, widthSegments: 32, heightSegments: 32 },
        // CylinderGeometry: { radiusTop: 0.5, radiusBottom: 1, height: 2, radialSegments: 32 }
        BoxGeometry: {
            width: { min: 1, max: 500, step: 1, value: 100 },
            height: { min: 1, max: 500, step: 1, value: 100 },
            depth: { min: 1, max: 500, step: 1, value: 100 }
        },
        SphereGeometry: {
            radius: { min: 0.1, max: 3, step: 0.1, value: 100 },
            widthSegments: { min: 3, max: 64, step: 1, value: 32 },
            heightSegments: { min: 2, max: 64, step: 1, value: 32 }
        },
        CylinderGeometry: {
            radiusTop: { min: 0.1, max: 2, step: 0.1, value: 50 },
            radiusBottom: { min: 0.1, max: 2, step: 0.1, value: 50 },
            height: { min: 0.1, max: 5, step: 0.1, value: 50 },
            radialSegments: { min: 3, max: 64, step: 1, value: 32 }
        }
    }
})
const geomParams = computed(() => {
    const { type, params } = geometryConfig.value
    const geoParams = params[type] || {}

    return geoParams;
})
const updateParams = () => {
    console.log(geomParams);
    
renderer.render(scene, camera); 
}

const initThreeScene = () => {
    // 元素块
    threeContainer.value = document.getElementById('three-container');

    // 创建场景
    scene = new THREE.Scene()
    addGeometry(); // 创建网格模型

    // 创建透视相机
    camera = new THREE.PerspectiveCamera(
        75,
        threeContainer.value.clientWidth / threeContainer.value.clientHeight,
        0.1,
        1000
    );
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0,)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true // 开启抗锯齿
    });
    // 渲染画布尺寸
    renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight);
    // 插入到页面HTML进行显示
    threeContainer.value.appendChild(renderer.domElement);

    // 更新背景颜色
    scene.background = new THREE.Color('#000');
    // 开始渲染
    renderer.render(scene, camera);
}

// 场景scene背景色修改
const onColorChange = () => {
    if (scene) {
        // scene场景背景色修改
        scene.background = new THREE.Color(color.value);
        // 修改后重新渲染
        renderer.render(scene, camera);
    } else {
        initThreeScene();
    }
}

// 创建辅助坐标系
const axesHelperHandler = () => {
    if (scene) {
        if (!axesHelper) {
            axesHelper = new THREE.AxesHelper(150);
            scene.add(axesHelper);
        }
        axesHelper.visible = axesVisible.value;
        // 修改后重新渲染
        renderer.render(scene, camera);
    } else {
        initThreeScene();
    }
}
// 改变坐标轴尺寸大小
const axesSizeHandler = () => {
    if (axesHelper && axesHelper.visible) {
        scene.remove(axesHelper); // 移除旧坐标轴
        axesHelper = new THREE.AxesHelper(axesSize.value); // 创建新坐标轴
        scene.add(axesHelper); // 添加回场景
        renderer.render(scene, camera); // 重新渲染
    }
}

// 添加初始网格对象模型（几何体模型）
const addGeometry = (type) => {
    console.log('创建网格模型');

    const geometry = createGeometry();
    console.log(geometry);

    material.value = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,//设置透明度
    });
    mesh = new THREE.Mesh(geometry, material.value);
    scene.add(mesh)
}
// 创建几何体的函数
const createGeometry = () => {
    const { type, params } = geometryConfig.value
    const geoParams = params[type] || {}

    switch (type) {
        case 'BoxGeometry':
            return new THREE.BoxGeometry(
                geoParams.width.value,
                geoParams.height.value,
                geoParams.depth.value
            )

        case 'SphereGeometry':
            return new THREE.SphereGeometry(
                geoParams.radius.value,
                geoParams.widthSegments.value,
                geoParams.heightSegments.value
            )

        case 'CylinderGeometry':
            return new THREE.CylinderGeometry(
                geoParams.radiusTop.value,
                geoParams.radiusBottom.value,
                geoParams.height.value,
                geoParams.radialSegments.value
            )

        default:
            console.warn(`未知几何体类型: ${type}`)
            return new THREE.BoxGeometry(100, 100, 100)
    }
}

const switchGeometry = (geometryType) => {
    geometryConfig.value.type = geometryType


    if (!scene || !renderer || !camera) {
        console.error('Three.js 场景未初始化!')
        return
    }

    // 清理旧模型资源
    if (mesh) {
        scene.remove(mesh)
        // 释放几何体资源
        if (mesh.geometry) {
            mesh.geometry.dispose()
        }
        // 如果不再需要材质也释放
        // mesh.material.dispose() 
        console.log("旧模型资源已释放")
    }

    // 获取参数（带安全验证）
    // const params = geometryParams[geometryType] || getDefaultParams(geometryType)
    // console.log(params);


    // // 创建新几何体
    // let newGeometry
    // try {
    //     switch (geometryType) {
    //         case 'BoxGeometry':
    //             newGeometry = new THREE.BoxGeometry(
    //                 params.width || 1,
    //                 params.height || 1,
    //                 params.depth || 1
    //             )
    //             break
    //         case 'SphereGeometry':
    //             newGeometry = new THREE.SphereGeometry(
    //                 params.radius || 1,
    //                 params.widthSegments || 32,
    //                 params.heightSegments || 32
    //             )
    //             break
    //         case 'CylinderGeometry':
    //             newGeometry = new THREE.CylinderGeometry(
    //                 params.radiusTop || 0.5,
    //                 params.radiusBottom || 0.5,
    //                 params.height || 1,
    //                 params.radialSegments || 32
    //             )
    //             break
    //         default:
    //             console.warn(`未知几何体类型: ${geometryType}, 使用默认立方体`)
    //             newGeometry = new THREE.BoxGeometry(1, 1, 1)
    //     }
    // } catch (error) {
    //     console.error('创建几何体失败:', error)
    //     newGeometry = new THREE.BoxGeometry(1, 1, 1)
    // }

    const newGeometry = createGeometry();
    // 创建新模型
    mesh = new THREE.Mesh(newGeometry, material.value)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)

    // 更新UI状态（Vue示例）
    // currentGeometryType.value = geometryType


    // 仅在无动画循环时手动渲染
    renderer.render(scene, camera)


    console.log('几何体切换完成:', geometryType)
}

// 默认参数生成器
function getDefaultParams(type) {
    const defaults = {
        BoxGeometry: { width: 1, height: 1, depth: 1 },
        SphereGeometry: { radius: 1, widthSegments: 32, heightSegments: 32 },
        CylinderGeometry: { radiusTop: 0.5, radiusBottom: 0.5, height: 1, radialSegments: 32 }
    }
    return defaults[type] || {}
}
onMounted(() => {
    initThreeScene();
});
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: #e2e8f0;
    min-height: 100vh;
    line-height: 1.6;
    overflow-x: hidden;
    background-attachment: fixed;
    padding: 0;
    display: flex;
    flex-direction: column;
}

/* 头部样式 - 固定在顶部 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: var(--glass);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-icon {
    font-size: 2rem;
    color: var(--primary-light);
    text-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}

.logo-text {
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(to right, #818cf8, #60a5fa);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.demo-info {
    text-align: right;
}

.demo-title {
    font-size: 1.5rem;
    margin-bottom: 5px;
    color: #f1f5f9;
}

.demo-category {
    color: var(--primary-light);
    font-size: 1rem;
}

/* 主内容区 - 使用flex布局 */
.main-wrapper {
    display: flex;
    height: calc(100vh - 100px);
    justify-content: space-between;
    overflow: hidden;
    padding: 20px 0;
    gap: 20px;
    /* 减去头部高度 */
}

/* 左侧：3D展示区 - 固定在视口中央 */
.demo-display {
    /* position: fixed;
    left: 0;
    top: 80px; */
    /* 头部高度 */
    width: 60%;
    /* height: 100%; */

    border-right: 1px solid var(--border);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    background: var(--glass);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);

}

#three-container {
    width: 100%;
    height: 100%;
}

.scene-info {
    /* position: absolute;
    bottom: 20px;
    left: 20px; */
    /* background: var(--card-bg); */
    /* padding: 15px;
    border-radius: 12px;
    border: 1px solid var(--border);
    backdrop-filter: blur(5px);
    max-width: 350px;
    animation: fadeIn 0.6s ease forwards; */

    position: absolute;
    bottom: 20px;
    left: 20px;
    background: var(--card-bg);
    padding: 15px;
    border-radius: 12px;
    border: 1px solid var(--border);
    backdrop-filter: blur(5px);
    max-width: 350px;
    animation: fadeIn 0.6s ease forwards;
    transition: var(--transition);
    /*毛玻璃模糊效果*/
}

.scene-info h3 {
    margin-bottom: 10px;
    color: var(--dark);
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 右侧：控制面板 - 独立滚动 */
.control-panel {
    width: 40%;
    /* margin-left: 60%; */
    /* 与左侧宽度对应 */
    /* height: calc(100vh - 80px); */
    overflow-y: auto;
    padding: 0 30px;
    background: var(--glass-dark);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 25px;

    /* background-color: var(--glass); */
    border-radius: var(--border-radius);
}

/* 控制面板内部样式 */
.panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    background: var(--glass-dark);
    padding: 15px 0;
    z-index: 10;
}

.panel-title {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.panel-section {
    background: var(--card-bg);
    border-radius: 12px;
    border: 1px solid var(--border);
    padding: 0 20px;
    animation: fadeIn 0.6s ease forwards;
}

.section-title {
    font-size: 1.2rem;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary-light);
}

.control-group {
    margin-bottom: 20px;
}

.control-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
}

.control-label span {
    color: var(--gray);
    font-size: 0.9rem;
}

.slider-container {
    display: flex;
    align-items: center;
    gap: 15px;
}

.slider {
    flex: 1;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 3px;
    background: rgba(99, 102, 241, 0.2);
    outline: none;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    transition: var(--transition);
}

.slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

.slider-value {
    min-width: 40px;
    text-align: center;
    background: rgba(99, 102, 241, 0.15);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
}

.color-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 15px;
}

.color-btn {
    height: 40px;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: var(--transition);
}

.color-btn.active {
    border-color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
}

.checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.checkbox-group input {
    width: 18px;
    height: 18px;
    accent-color: var(--primary);
}

.action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 10px;
}

.btn {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--gray);
    color: #e2e8f0;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
}

.btn-primary {
    background: var(--primary);
}

.btn-primary:hover {
    background: var(--primary-dark);
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .demo-display {
        width: 50%;
    }

    .control-panel {
        width: 50%;
        margin-left: 50%;
    }
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        text-align: center;
        gap: 10px;
        padding: 15px;
    }

    .demo-info {
        text-align: center;
    }

    .demo-display {
        position: relative;
        width: 100%;
        height: 60vh;
        top: auto;
        border-right: none;
        border-bottom: 1px solid var(--border);
    }

    .control-panel {
        width: 100%;
        margin-left: 0;
        height: auto;
        overflow-y: visible;
    }

    .color-controls {
        grid-template-columns: repeat(2, 1fr);
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

/* 自定义滚动条 */
.control-panel::-webkit-scrollbar {
    width: 8px;
}

.control-panel::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.control-panel::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
}

.control-panel::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
}
</style>