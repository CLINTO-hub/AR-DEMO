import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

const ARScene = () => {
  const containerRef = useRef();

  useEffect(() => {
    let camera, scene, renderer, mesh;

    const init = () => {
      const container = containerRef.current;

      // Scene and Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.xr.enabled = true;
      container.appendChild(renderer.domElement);

      // Lighting
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      light.position.set(0.5, 1, 0.25);
      scene.add(light);

      // Geometry
      const geometry = new THREE.IcosahedronGeometry(0.1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color("rgb(226,35,213)"),
        shininess: 6,
        flatShading: true,
        transparent: true,
        opacity: 0.8,
      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, -0.5);
      scene.add(mesh);

      // AR Button
      document.body.appendChild(ARButton.createButton(renderer));

      // Handle Resize
      window.addEventListener("resize", onWindowResize);

      animate();
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      renderer.setAnimationLoop(() => {
        render();
      });
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    init();

    return () => {
      // Cleanup resources on unmount
      window.removeEventListener("resize", onWindowResize);
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Remove renderer DOM element
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ARScene;
