<template>
    <div class="main-wrapper">
        <!-- 左侧 3D 区域 -->
        <div ref="threeContainer" class="demo-display"></div>

        <!-- 右侧控制面板（直接用你原来的就行） -->
        <div class="control-panel">
            <!-- 1. 场景设置 -->
            <!-- <div class="panel-section">
                <h3 class="section-title"><i class="fas fa-shapes"></i> 场景设置</h3>
                <div class="control-group">
                    <input type="checkbox" v-model="controlsStore.axes.visible" />
                    <label for="wireframe">显示坐标轴</label>
                </div>
                <div v-if="controlsStore.axes.visible">
                    <span>大小: {{ controlsStore.axes.size }}</span>
                    <input type="range" min="10" max="500" v-model.number="controlsStore.axes.size" />
                </div>

                <label>
                    背景色
                    <input type="color" v-model="controlsStore.sceneBg" />
                </label>
            </div> -->
            <div class="panel-section" style="animation-delay: 0.2s">
                <h3 class="section-title"><i class="fas fa-shapes"></i> 场景设置</h3>
                <div class="control-group">
                    <input type="checkbox" id="wireframe" checked v-model="controlsStore.axes.visible"
                        @change="axesHelperHandler">
                    <label for="wireframe">显示坐标轴</label>
                </div>
                <label class="control-label">
                    坐标轴大小
                    <span id="sizeValue">{{ controlsStore.axes.size }}</span>
                </label>
                <div>
                    <el-slider :max="500" v-model.number="controlsStore.axes.size" show-alpha @input="axesSizeHandler" />
                </div>
                <label class="control-label">
                    场景背景色
                </label>
                <div>
                    <input type="color" v-model="controlsStore.sceneBg" />
                </div>
            </div>
            <!-- 2. 几何体 -->
            <div class="panel-section">
                <h3>几何体</h3>
                <select v-model="controlsStore.geometry">
                    <option value="BoxGeometry">立方体</option>
                    <option value="SphereGeometry">球体</option>
                    <option value="CylinderGeometry">圆柱体</option>
                </select>

                <!-- 动态参数 -->
                <div v-for="(opt, key) in controlsStore.geomParams[controlsStore.geometry]" :key="key">
                    <label>
                        {{ key }}: {{ opt.value }}
                        <input type="range" :min="opt.min" :max="opt.max" :step="opt.step" v-model.number="opt.value" />
                    </label>
                </div>
            </div>

            <!-- 3. 材质 -->
            <div class="panel-section">
                <h3>材质</h3>
                <label>
                    color
                    <input type="color" v-model="controlsStore.material.color" />
                </label>
                <label>
                    metalness
                    <input type="range" min="0" max="1" step="0.01" v-model.number="controlsStore.material.metalness" />
                </label>
                <label>
                    roughness
                    <input type="range" min="0" max="1" step="0.01" v-model.number="controlsStore.material.roughness" />
                </label>
                <label>
                    <input type="checkbox" v-model="controlsStore.material.wireframe" />
                    wireframe
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useThreeScene } from '@/composables/useThreeScene';
import { useControlsStore } from '@/stores/controls';

const controlsStore = useControlsStore();
const threeContainer = ref(null);
const { init, updateGeometry, setBgColor, setAxes, resize, dispose } =
    useThreeScene(threeContainer);

onMounted(() => {
    init();
    syncScene();
    window.addEventListener('resize', resize);
});

onUnmounted(() => {
    dispose();
    window.removeEventListener('resize', resize);
});

function syncScene() {
    const type = controlsStore.geometry;
    const params = Object.fromEntries(
        Object.entries(controlsStore.geomParams[type]).map(([k, v]) => [k, v.value])
    );
    updateGeometry(type, params, controlsStore.material);
}

watch(
    () => [
        controlsStore.geometry,
        controlsStore.geomParams[controlsStore.geometry],
        controlsStore.material,
    ],
    syncScene,
    { deep: true }
);

watch(
    () => controlsStore.sceneBg,
    (c) => setBgColor(c)
);

watch(
    () => controlsStore.axes,
    (a) => setAxes(a),
    { deep: true }
);
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