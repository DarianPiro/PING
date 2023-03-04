import React, { useEffect, useRef } from 'react';
import * as THREE from '../libs/three125/three.module.js';
import { OrbitControls } from '../libs/three125/OrbitControls.js';
import { Stats } from '../libs/stats.module.js';
import { ARButton } from '../libs/ARButton.js';

const AR = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    const clock = new THREE.Clock(); 
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    const scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 3.5, 0);
    controls.update();

    const stats = new Stats();

    let geometry;
    const meshes = [];

    function initScene() {
      geometry = new THREE.BoxBufferGeometry(0.06, 0.06, 0.06);
    }

    initScene();

    function setupVR() {
      renderer.xr.enabled = true;

      let controller;

      function onSelect() {
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff * Math.random(),
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
        mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
        scene.add(mesh);
        meshes.push(mesh);
      }

      const btn = new ARButton(renderer);

      controller = renderer.xr.getController(0);
      controller.addEventListener('select', onSelect);
      scene.add(controller);

      renderer.setAnimationLoop(render);
    }

    setupVR();

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
      stats.update();
      meshes.forEach((mesh) => {
        mesh.rotateY(0.01);
      });
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default AR;
