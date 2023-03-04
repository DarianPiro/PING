import React, { useRef, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { ARButton, XR } from '@react-three/xr';
import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

function AR() {
  // const canvasRef = useRef();
  const [touchedPoints, setTouchedPoints] = useState([]);
  const [points, setPoints] = useState([]);

  // const handlePointerDown = (event) => {
  //   const point = event.point.toArray(); // convert the point object to an array
  //   setTouchedPoints([...touchedPoints, point]); // add the new point to the array of touched points
  // };

  // const handlePointerMove = (event) => {
  //   if (event.buttons === 1) {
  //     const point = event.point.toArray(); // convert the point object to an array
  //     setTouchedPoints([...touchedPoints, point]); // add the new point to the array of touched points
  //   }
  // };

  const handleSelect = (event) => {
    const material = new MeshPhongMaterial({ color: Math.random() * 0xffffff });
    const mesh = new Mesh(new BoxGeometry(0.06, 0.06, 0.06), material);
    mesh.position.set(event.clientX, event.clientY, -0.3);
    setTouchedPoints([...touchedPoints, mesh]); 
    setPoints([...points, [event.clientX, event.clientY]]);
  };

  return (
    <>
      <ARButton />

      <Canvas
        // ref={canvasRef}
        // onPointerDown={handlePointerDown}
        // onPointerMove={handlePointerMove}
        // onPointerUp={handlePointerUp}
        // onClick={(event) => handleSelect(event)}
        onPointerDown={handleSelect}
      >
        <XR>
          {touchedPoints.map((box, index) => (
            <Box
              key={index}
              position={box.position}
              color={box.material.color}
            />
          ))}
          <ambientLight intensity={0.6} />
          <directionalLight position={[1, 1, 1]} intensity={0.6} />
          <Scene points={points} />
        </XR>
      </Canvas>
    </>
  );
}

function Scene({ points }) {
  const ref = useRef();
  const mesh = useRef();
  const [active, setActive] = useState(false);

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  const [lineGeometry, setLineGeometry] = useState(null);

  useLayoutEffect(() => {
    const newLineGeometry = new THREE.BufferGeometry().setFromPoints(
      points.map((point) => new THREE.Vector3(point[0], point[1], -5))
    );
    console.log(newLineGeometry);
    setLineGeometry(newLineGeometry);
  }, [points]);

  return (
    <group>
      {lineGeometry && (
        <line ref={ref}>
          <bufferGeometry attach="geometry" {...lineGeometry} />
          <lineBasicMaterial attach="material" color="hotpink" />
        </line>
      )}
      <mesh
        position={[0, 0, -1]}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(event) => setActive(!active)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'orange'} />
      </mesh>
    </group>
  );
}

function Box({ position, color }) {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotateY(0.01);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.06, 0.06, 0.06]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

export default AR;
