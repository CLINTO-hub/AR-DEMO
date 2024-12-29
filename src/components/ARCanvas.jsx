import { Canvas } from '@react-three/fiber';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import * as THREE from 'three';
import { useEffect } from 'react';

export default function ARCanvas({ children }) {
    useEffect(() => {
        const arButton = ARButton.createButton(THREE.WebXRManager);
        document.body.appendChild(arButton);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 0] }}
            gl={{ antialias: true }}
            onCreated={({ gl }) => {
                gl.xr.enabled = true;
                gl.setAnimationLoop(() => gl.render(gl.scene, gl.camera));
            }}
        >
            {children}
        </Canvas>
    );
}
