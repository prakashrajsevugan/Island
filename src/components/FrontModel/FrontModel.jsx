import { useEffect, useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { New } from "./New";
import FrontLight from "./FrontLight";
import Particles from "./Particles";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

const TreeProximityWatcher = ({ modelGroupRef, onChange }) => {
    const localTreePosition = useMemo(() => new THREE.Vector3(8.776, 96.374, -8.955), []);
    const worldTreePosition = useMemo(() => new THREE.Vector3(), []);
    const lastStateRef = useRef(false);

    useEffect(() => {
        return () => {
            onChange?.(false);
        };
    }, [onChange]);

    useFrame(({ camera }) => {
        if (!modelGroupRef.current) return;

        worldTreePosition.copy(localTreePosition);
        modelGroupRef.current.localToWorld(worldTreePosition);

        const isNearTree = camera.position.distanceTo(worldTreePosition) < 185;
        if (isNearTree !== lastStateRef.current) {
            lastStateRef.current = isNearTree;
            onChange?.(isNearTree);
        }
    });

    return null;
};

const FrontModel = ({ ambientColor = "#ffd700", spotColor = "#ffcc00", onTreeProximityChange, onDisplayClick }) =>{
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const modelGroupRef = useRef(null);

    return(
        <Canvas 
            camera={{position:[150,150,15],fov:55}}
            shadows
        >

            <OrbitControls
                enablePane={false}
                maxDistance={(!isMobile ? 300 : 400)}
                minDistance={150}
                maxPolarAngle={Math.PI/2}
                minPolarAngle={Math.PI/3}
            />

            <FrontLight ambientColor={ambientColor} spotColor={spotColor} />
            <Particles count={500} />
            <TreeProximityWatcher modelGroupRef={modelGroupRef} onChange={onTreeProximityChange} />

            <group
            ref={modelGroupRef}
            position={[0,-40.5,0]}
            rotation={[0,45,0]}
            >
                <New onDisplayClick={onDisplayClick} />
            </group>
        </Canvas>
    )
}

export default FrontModel;