import * as THREE from 'three';

export const geometryFactory = {
  BoxGeometry: (p) =>
    new THREE.BoxGeometry(p.width, p.height, p.depth),
  SphereGeometry: (p) =>
    new THREE.SphereGeometry(p.radius, p.widthSegments, p.heightSegments),
  CylinderGeometry: (p) =>
    new THREE.CylinderGeometry(
      p.radiusTop,
      p.radiusBottom,
      p.height,
      p.radialSegments
    ),
};