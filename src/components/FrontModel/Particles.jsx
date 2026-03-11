import { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();
  
  const texture = useLoader(THREE.TextureLoader, '/images/smow.png');

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 400, // wider spread
          Math.random() * 150 + 50, // higher starting point
          (Math.random() - 0.5) * 400, // wider spread
        ],
        speed: 0.1 + Math.random() * 0.1, // faster falling
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < 0) y = Math.random() * 150 + 50; // reset to top
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = new Float32Array(count * 3);
  particles.forEach((p, i) => {
    positions[i * 3] = p.position[0];
    positions[i * 3 + 1] = p.position[1];
    positions[i * 3 + 2] = p.position[2];
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#fefef5"
        size={2}
        transparent
        map={texture}
        opacity={1.0}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default Particles;