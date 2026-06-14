import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A single, slow-spinning elegant ambient orb — subtle, never competing with content
function AmbientOrb() {
  const mesh = useRef();
  const innerMesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.04;
      mesh.current.rotation.y = t * 0.06;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.x = -t * 0.03;
      innerMesh.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group position={[3, 0, -6]}>
      {/* Outer wireframe ring - very subtle */}
      <mesh ref={mesh}>
        <torusGeometry args={[2.8, 0.006, 16, 80]} />
        <meshBasicMaterial color="#1a1a2e" opacity={0.35} transparent />
      </mesh>
      <mesh ref={innerMesh} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.004, 16, 80]} />
        <meshBasicMaterial color="#0f3460" opacity={0.25} transparent />
      </mesh>
      {/* Core glow sphere - barely visible */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#0a0a14" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

// Very sparse, slow-moving dots — not a particle storm
function AmbientDots() {
  const group = useRef();
  const count = 80;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          opacity={0.25}
          transparent
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function Scene() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'radial-gradient(ellipse at 60% 40%, #0d0d1a 0%, #050507 60%, #000000 100%)',
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
        <AmbientOrb />
        <AmbientDots />
      </Canvas>
    </div>
  );
}
