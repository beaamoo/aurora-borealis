import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Visualizer = ({ analyser, isConnected }) => {
    const mountRef = useRef(null);
    const [idleAnimation, setIdleAnimation] = useState(true);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Add a cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;

        // Define initial parameters for the idle animation
        let idleTime = 0;
        const idleSpeed = 0.02;
        const idleAmplitude = 0.1;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            if (isConnected && analyser) {
                // When connected, use the analyser data for animation
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                const lowerFrequencies = dataArray.slice(0, dataArray.length / 2);
                const averageAmplitude = lowerFrequencies.reduce((acc, val) => acc + val, 0) / lowerFrequencies.length;

                // Modify the cube scale based on the average amplitude of the lower frequencies
                const scale = averageAmplitude / 128;
                cube.scale.set(scale + 1, scale + 1, scale + 1);
            } else {
                // Idle animation: simple oscillation
                idleTime += idleSpeed;
                cube.rotation.x += idleSpeed;
                cube.rotation.y += idleSpeed;
                cube.scale.set(
                    1 + Math.sin(idleTime) * idleAmplitude,
                    1 + Math.sin(idleTime) * idleAmplitude,
                    1 + Math.sin(idleTime) * idleAmplitude
                );
            }

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [isConnected, analyser]);

    return <div ref={mountRef} />;
};

export default Visualizer;
