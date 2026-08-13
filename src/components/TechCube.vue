<template>
  <div class="cube-container" ref="container">
    <div class="cube" ref="cube">
      <div class="face front"><i class="fab fa-vuejs"></i></div>
      <div class="face back"><i class="fab fa-js"></i></div>
      <div class="face right"><i class="fas fa-cube"></i></div>
      <div class="face left"><i class="fab fa-github"></i></div>
      <div class="face top"><i class="fas fa-code"></i></div>
      <div class="face bottom"><i class="fas fa-globe"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechCube',
  mounted() {
    this.initCube();
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
  data() {
    return {
      rotationX: -0.2,
      rotationY: -0.2,
      targetRotationX: -0.2,
      targetRotationY: -0.2,
      isDragging: false,
      previousMouseX: 0,
      previousMouseY: 0,
      animationFrameId: null,
      hoveredFace: null
    };
  },
  methods: {
    initCube() {
      this.cube = this.$refs.cube;
      this.container = this.$refs.container;
      if (!this.cube || !this.container) return;
      
      this.setupEventListeners();
      this.autoRotate();
      this.animate();
    },
    
    setupEventListeners() {
      this.container.addEventListener('mousedown', this.startDrag);
      this.container.addEventListener('touchstart', this.startDrag, { passive: false });
      
      window.addEventListener('mousemove', this.drag);
      window.addEventListener('touchmove', this.drag, { passive: false });
      
      window.addEventListener('mouseup', this.endDrag);
      window.addEventListener('touchend', this.endDrag);
      window.addEventListener('touchcancel', this.endDrag);
      
      // 添加面悬停事件
      const faces = this.cube.querySelectorAll('.face');
      faces.forEach(face => {
        face.addEventListener('mouseenter', () => this.hoverFace(face));
        face.addEventListener('mouseleave', () => this.unhoverFace(face));
      });
    },
    
    removeEventListeners() {
      if (!this.container) return;
      
      this.container.removeEventListener('mousedown', this.startDrag);
      this.container.removeEventListener('touchstart', this.startDrag);
      
      window.removeEventListener('mousemove', this.drag);
      window.removeEventListener('touchmove', this.drag);
      
      window.removeEventListener('mouseup', this.endDrag);
      window.removeEventListener('touchend', this.endDrag);
      window.removeEventListener('touchcancel', this.endDrag);
      
      // 移除面悬停事件
      const faces = this.cube.querySelectorAll('.face');
      faces.forEach(face => {
        face.removeEventListener('mouseenter', this.hoverFace);
        face.removeEventListener('mouseleave', this.unhoverFace);
      });
      
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    },
    
    hoverFace(face) {
      // 清除之前的悬停状态
      if (this.hoveredFace) {
        this.unhoverFace(this.hoveredFace);
      }
      
      // 添加悬停类
      face.classList.add('face-hover');
      this.hoveredFace = face;
    },
    
    unhoverFace(face) {
      if (!face) return;
      
      face.classList.remove('face-hover');
      
      if (this.hoveredFace === face) {
        this.hoveredFace = null;
      }
    },
    
    startDrag(e) {
      this.isDragging = true;
      this.container.style.cursor = 'grabbing';
      
      // 清除悬停状态
      if (this.hoveredFace) {
        this.unhoverFace(this.hoveredFace);
      }
      
      const event = e.touches ? e.touches[0] : e;
      this.previousMouseX = event.clientX;
      this.previousMouseY = event.clientY;
      
      if (e.cancelable) e.preventDefault();
    },
    
    drag(e) {
      if (!this.isDragging) return;
      
      const event = e.touches ? e.touches[0] : e;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      const deltaX = mouseX - this.previousMouseX;
      const deltaY = mouseY - this.previousMouseY;
      
      this.targetRotationY += deltaX * 0.01;
      this.targetRotationX += deltaY * 0.01;
      
      this.previousMouseX = mouseX;
      this.previousMouseY = mouseY;
      
      if (e.cancelable) e.preventDefault();
    },
    
    endDrag() {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    },
    
    autoRotate() {
      if (!this.isDragging) {
        this.targetRotationX += 0.002;
        this.targetRotationY += 0.003;
      }
      this.animationFrameId = requestAnimationFrame(this.autoRotate);
    },
    
    animate() {
      // 平滑旋转
      this.rotationX += (this.targetRotationX - this.rotationX) * 0.1;
      this.rotationY += (this.targetRotationY - this.rotationY) * 0.1;
      
      this.cube.style.transform = `rotateX(${this.rotationX}rad) rotateY(${this.rotationY}rad)`;
      
      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  }
};
</script>

<style scoped>
.cube-container {
  perspective: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  touch-action: none;
}

.cube-container:active {
  cursor: grabbing;
}

.cube {
  width: 140px;
  height: 140px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(-20deg);
  transition: transform 0.2s ease-out;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52px;
  color: rgba(255, 255, 255, 0.85);
  backface-visibility: hidden;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  transition: 
    background 0.4s ease, 
    box-shadow 0.4s ease,
    border 0.4s ease,
    opacity 0.4s ease;
  opacity: 0.9;
}

/* 优化悬停效果 - 不再改变位置 */
.face-hover {
  background: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 
    inset 0 0 20px rgba(99, 102, 241, 0.4),
    0 0 30px rgba(99, 102, 241, 0.6) !important;
  border: 2px solid rgba(99, 102, 241, 0.5) !important;
  opacity: 1;
  z-index: 10;
}

.front { transform: translateZ(70px); }
.back { transform: rotateY(180deg) translateZ(70px); }
.right { transform: rotateY(90deg) translateZ(70px); }
.left { transform: rotateY(-90deg) translateZ(70px); }
.top { transform: rotateX(90deg) translateZ(70px); }
.bottom { transform: rotateX(-90deg) translateZ(70px); }

/* 添加面标识 */
.front::after, .back::after, .right::after, 
.left::after, .top::after, .bottom::after {
  content: '';
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  font-weight: 500;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.front::after { content: 'Vue.js'; }
.back::after { content: 'JS'; }
.right::after { content: '3D'; }
.left::after { content: 'GitHub'; }
.top::after { content: 'Code'; }
.bottom::after { content: 'Web'; }

/* 悬停时显示标签 */
.face-hover::after {
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .cube {
    width: 120px;
    height: 120px;
  }
  
  .face {
    font-size: 44px;
  }
}

@media (max-width: 768px) {
  .cube {
    width: 100px;
    height: 100px;
  }
  
  .face {
    font-size: 36px;
  }
  
  .front::after, .back::after, .right::after, 
  .left::after, .top::after, .bottom::after {
    font-size: 8px;
  }
}

@media (max-width: 480px) {
  .cube {
    width: 80px;
    height: 80px;
  }
  
  .face {
    font-size: 28px;
  }
}
</style>