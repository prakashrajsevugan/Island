import { useEffect, useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import GUI from "lil-gui";
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

const WorldSpinDebugger = ({ modelGroupRef }) => {
    const spinStateRef = useRef({
        active: false,
        startY: 0,
        elapsed: 0,
        duration: 12,
    });
    const controlsRef = useRef({ spinDuration: 12 });

    useEffect(() => {
        const gui = new GUI({ title: "World Debug" });
        gui.domElement.style.position = "fixed";
        gui.domElement.style.top = "0px";
        gui.domElement.style.right = "0px";
        gui.domElement.style.zIndex = "40";
        const actions = {
            spinOnce: () => {
                if (!modelGroupRef.current) return;

                const spinState = spinStateRef.current;
                spinState.startY = modelGroupRef.current.rotation.y;
                spinState.elapsed = 0;
                spinState.duration = controlsRef.current.spinDuration;
                spinState.active = true;
            },
        };

        gui.add(controlsRef.current, "spinDuration", 6, 30, 1).name("Spin Duration (s)");
        gui.add(actions, "spinOnce").name("Spin Once");

        return () => {
            gui.destroy();
        };
    }, [modelGroupRef]);

    useFrame((_, delta) => {
        if (!modelGroupRef.current) return;

        const spinState = spinStateRef.current;
        if (!spinState.active) return;

        spinState.elapsed += delta;
        const progress = Math.min(spinState.elapsed / spinState.duration, 1);

        modelGroupRef.current.rotation.y = spinState.startY + progress * Math.PI * 2;

        if (progress >= 1) {
            spinState.active = false;
            modelGroupRef.current.rotation.y = spinState.startY + Math.PI * 2;
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
            <WorldSpinDebugger modelGroupRef={modelGroupRef} />

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