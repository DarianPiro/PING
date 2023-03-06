// import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
// import * as THREE from 'three';
// import { Canvas, useThree, useFrame } from '@react-three/fiber';
// import { TubePainter } from 'three/addons/misc/TubePainter.js';
// import {
//   ARButton,
//   XR,
//   useXR,
//   Interactive,
//   useHitTest,
//   useXREvent,
// } from '@react-three/xr';

// function AR() {
//   // const [points, setPoints] = useState([]);
//   // const [active, setActive] = useState(false);

//   // const handlePointerDown = (event) => {
//   //   const point = event.point.toArray(); // convert the point object to an array
//   //   setTouchedPoints([...touchedPoints, point]); // add the new point to the array of touched points
//   // };

//   // const handlePointerMove = (event) => {
//   //   if (event.buttons === 1) {
//   //     const point = event.point.toArray(); // convert the point object to an array
//   //     setTouchedPoints([...touchedPoints, point]); // add the new point to the array of touched points
//   //   }
//   // };

//   // const handleMove = (event) => {
//   //   if (!active) return;
//   //   const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//   //   const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
//   //   const point = new THREE.Vector3(mouseX, mouseY, 30);
//   //   // const point = [mouseX, mouseY, -30];
//   //   setPoints([...points, point]);
//   // };

//   // const handleSelect = () => {
//   //   setActive(!active);
//   // };

//   return (
//     <>
//       <ARButton />
//       <Canvas
//       // onPointerMove={handleMove}
//       // onPointerDown={handleSelect}
//       // onPointerUp={handleSelect}
//       >
//         <XR>
//           {/* <Interactive onSelect={onSelect}> */}
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[1, 1, 1]} intensity={0.6} />
//           <Scene />
//           {/* </Interactive> */}
//         </XR>
//       </Canvas>
//     </>
//   );
// }

// function Scene() {
  
//   const [points, setPoints] = useState([]);
//   const [meshes, setMeshes] = useState([]);

//   useXREvent('select', (event) => {
//     const position = event.target.controller.position;
//     setPoints([...points, position]);
//   });

//   const painterRef = useRef();

//   // painterRef.current = new TubePainter();
//   // painterRef.current.setSize(0.4);
//   // painterRef.current.mesh.material.side = THREE.DoubleSide;


//   useEffect(() => {


//     if (points.length > 0) {
//       const material = new THREE.MeshPhongMaterial({
//         color: 0xffffff * Math.random(),
//       });
//       const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
//       mesh.position.copy(points[points.length - 1]);
//       mesh.scale.setScalar(0.1);
//       mesh.castShadow = true;
//       mesh.receiveShadow = true;
//       setMeshes([...meshes, mesh]);
//     }
//     console.log(meshes);
//     // if (points.length > 0) {
//     //   painterRef.current.moveTo(points[0]);
//     // } else if (points.length > 1) {
//     //   painterRef.current.lineTo(points[points.length - 1]);
//     //   painterRef.current.update();
//     // }
//     // console.log(painterRef.current);
//   }, [points]);

//   return (
//     <group>
//       {/* <mesh
//         material={
//           new THREE.MeshBasicMaterial({
//             color: 0x00ff00,
//             side: THREE.DoubleSide,
//           })
//         }
//         ref={painterRef}
//       /> */}
//       {meshes.length > 0 &&
//         meshes.map((mesh) => (
//           <mesh
//             key={mesh.uuid}
//             geometry={mesh.geometry}
//             material={mesh.material}
//             position={mesh.position}
//           />
//         ))}
//     </group>
//   );
// }

// export default AR;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TubePainter } from 'three/addons/misc/TubePainter.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';

const AR = () => {
  const containerRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const sceneRef = useRef();
  const painterRef = useRef();
  const controllerRef = useRef();
  const cursor = new THREE.Vector3();

  useEffect(() => {
    const container = containerRef.current;
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.xr.enabled = true;
    container.appendChild(rendererRef.current.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0, 1, 0);
    sceneRef.current.add(light);

    painterRef.current = new TubePainter();
    painterRef.current.setSize(0.4);
    painterRef.current.mesh.material.side = THREE.DoubleSide;
    painterRef.current.mesh.material.color = new THREE.Color("rgb(255, 166, 1)");
    sceneRef.current.add(painterRef.current.mesh);

    function onSelectStart() {
      controllerRef.current.userData.isSelecting = true;
      controllerRef.current.userData.skipFrames = 2;
    }

    function onSelectEnd() {
      controllerRef.current.userData.isSelecting = false;
    }

    controllerRef.current = rendererRef.current.xr.getController(0);
    controllerRef.current.addEventListener('selectstart', onSelectStart);
    controllerRef.current.addEventListener('selectend', onSelectEnd);
    controllerRef.current.userData.skipFrames = 0;
    sceneRef.current.add(controllerRef.current);

    document.body.appendChild(ARButton.createButton(rendererRef.current));

    window.addEventListener('resize', onWindowResize);

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      rendererRef.current.dispose();
    };
  }, []);

  const onWindowResize = () => {
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  };

  const handleController = (controller) => {
    const userData = controller.userData;

    cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

    if (userData.isSelecting === true) {
      if (userData.skipFrames >= 0) {
        userData.skipFrames--;
        painterRef.current.moveTo(cursor);
        console.log(cursor)
      } else {
        painterRef.current.lineTo(cursor);
        console.log(cursor)
        painterRef.current.update();
      }
    }
  };

  const animate = () => {
    rendererRef.current.setAnimationLoop(() => {
      handleController(controllerRef.current);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    });
  };

  return <div ref={containerRef}></div>;
};

export default AR;
