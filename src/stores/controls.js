import { defineStore } from 'pinia';

export const useControlsStore = defineStore('controls', {
  state: () => ({
    geometry: 'BoxGeometry',
    geomParams: {
      BoxGeometry: {
        width: { min: 1, max: 500, step: 1, value: 100 },
        height: { min: 1, max: 500, step: 1, value: 100 },
        depth: { min: 1, max: 500, step: 1, value: 100 },
      },
      SphereGeometry: {
        radius: { min: 0.1, max: 3, step: 0.1, value: 100 },
        widthSegments: { min: 3, max: 64, step: 1, value: 32 },
        heightSegments: { min: 2, max: 64, step: 1, value: 32 },
      },
      CylinderGeometry: {
        radiusTop: { min: 0.1, max: 2, step: 0.1, value: 50 },
        radiusBottom: { min: 0.1, max: 2, step: 0.1, value: 50 },
        height: { min: 0.1, max: 5, step: 0.1, value: 50 },
        radialSegments: { min: 3, max: 64, step: 1, value: 32 },
      },
    },
    material: { color: '#ff0000', metalness: 0.7, roughness: 0.3, wireframe: false },
    sceneBg: 'rgba(0,0,0,.1)',
    axes: { visible: true, size: 150 },
  }),
});