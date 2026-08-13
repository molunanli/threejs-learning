import * as THREE from 'three';
import { geometryFactory } from '@/utils/geometryFactory';

export function useThreeScene(containerRef) {
  let scene, camera, renderer, mesh, axesHelper, animationId;

  const init = () => {
    const dom = containerRef.value;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      dom.clientWidth / dom.clientHeight,
      0.1,
      1000
    );
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(dom.clientWidth, dom.clientHeight);
    dom.appendChild(renderer.domElement);

    axesHelper = new THREE.AxesHelper(150);
    scene.add(axesHelper);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(1, 1, 1);
    scene.add(ambient, dir);

    animate();
  };

  const updateGeometry = (type, params, materialOptions) => {
    if (mesh) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    const geom = geometryFactory[type](params);
    const mat = new THREE.MeshStandardMaterial(materialOptions);
    mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);
  };

  const setBgColor = (hex) => (scene.background = new THREE.Color(hex));

  const setAxes = ({ visible, size }) => {
    axesHelper.visible = visible;
    if (visible && size) {
      scene.remove(axesHelper);
      axesHelper = new THREE.AxesHelper(size);
      scene.add(axesHelper);
    }
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (mesh) mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
  };

  const resize = () => {
    const { clientWidth, clientHeight } = containerRef.value;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  };

  const dispose = () => {
    cancelAnimationFrame(animationId);
    renderer.dispose();
    dom.removeChild(renderer.domElement);
  };

  return { init, updateGeometry, setBgColor, setAxes, resize, dispose };
}