'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Create 400 glowing particles
  const particleCount = 400;

  const [positions, colors, sizes, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const size = new Float32Array(particleCount);
    const phase = new Float32Array(particleCount);

    const color1 = new THREE.Color('#ff8c42'); // Warm orange
    const color2 = new THREE.Color('#ffffff'); // White glow

    for (let i = 0; i < particleCount; i++) {
      // Random positions spread across a wide area
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Mix warm orange and white
      const mixedColor = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      // Random sizes and sine wave phases
      size[i] = Math.random() * 0.15 + 0.05;
      phase[i] = Math.random() * Math.PI * 2;
    }

    return [pos, col, size, phase];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Slow floating motion using sine-wave oscillations
      positions[i3 + 1] += Math.sin(time * 0.5 + phases[i]) * 0.002;
      positions[i3] += Math.cos(time * 0.3 + phases[i]) * 0.001;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Mouse parallax effect
    pointsRef.current.rotation.x += ((mouse.y * 0.05) - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += ((mouse.x * 0.05) - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

const CinematicLayer = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80" style={{ filter: 'blur(2px)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default CinematicLayer;
