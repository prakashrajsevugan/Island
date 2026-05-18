import { useEffect, useMemo, useRef } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import GUI from "lil-gui";
import { New } from "./New";
import FrontLight from "./FrontLight";
import Particles from "./Particles";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { useThree } from '@react-three/fiber';

const TreeProximityWatcher = ({ modelGroupRef, onChange }) => {
    const localTreePosition = useMemo(() => new THREE.Vector3(8.776, 96.374, -8.955), []);
    const worldTreePosition = useMemo(() => new THREE.Vector3(), []);
    const lastStateRef = useRef(false);
    const textureLoader = new THREE.TextureLoader();

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

const FogEffect = ({ modelGroupRef }) => {
    const { scene } = useThree();

    useEffect(() => {
        const fog = new THREE.Fog("#000000", 200, 400);
        scene.fog = fog;

        return () => {
            scene.fog = null;
        };
    }, [scene]);

    return null;
};

const SkyEffect = ({ config = {} }) => {
    const skyRef = useRef(null);

    useEffect(() => {
        if (!skyRef.current) return;

        const sky = skyRef.current;

        const turbidity = config.turbidity ?? 10;
        const rayleigh = config.rayleigh ?? 3;
        const mieCoefficient = config.mieCoefficient ?? 0.1;
        const mieDirectionalG = config.mieDirectionalG ?? 0.95;
        const sunPosition = config.sunPosition ?? [0.3, -0.038, -0.95];

        if (sky.material && sky.material.uniforms) {
            sky.material.uniforms['turbidity'].value = turbidity;
            sky.material.uniforms['rayleigh'].value = rayleigh;
            sky.material.uniforms['mieCoefficient'].value = mieCoefficient;
            sky.material.uniforms['mieDirectionalG'].value = mieDirectionalG;
            sky.material.uniforms['sunPosition'].value.set(...sunPosition);
        }
    }, [config]);

    const scale =  500;
    return <primitive ref={skyRef} object={new Sky()} scale={scale} />;
};

const WorldPlane = ({ color = '#006994', size = 800, y = 0 }) => {
    const alphaMap = useTexture('/texture/alpha.webp');

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
            <planeGeometry args={[size, size]} />
            <meshStandardMaterial
                color={color}
                alphaMap={alphaMap}
                transparent
                opacity={1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const FrontModel = ({ ambientColor = "#ffd700", spotColor = "#ffcc00", onTreeProximityChange, onDisplayClick, skyConfig = null }) =>{
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const modelGroupRef = useRef(null);

    return(
        <Canvas 
            camera={{position:[150,150,15],fov:55}}
            shadows
        >

            {skyConfig && <SkyEffect config={skyConfig} />}
            <WorldPlane />

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
            <FogEffect modelGroupRef={modelGroupRef} />

            <group
            ref={modelGroupRef}
            position={[0,-40.5,0]}
            rotation={[0,45,0]}
            >
                <New onDisplayClick={onDisplayClick} showSea={false} />
            </group>
        </Canvas>
    )
}

export default FrontModel;