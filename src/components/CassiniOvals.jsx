import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CassiniOvals = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const a = 1; // constant
    const c = 1.05; // constant

    const drawCassiniOvals = () => {
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

      const points = [];

      for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
        const rhoSquared =
          (a ** 4 - c ** 4) /
          (Math.pow(
            Math.sqrt(a ** 4 - c ** 4) /
              Math.sqrt(2 * c ** 2 * Math.cos(2 * angle)),
            2
          ) -
            2 * c ** 2 * Math.cos(2 * angle));
        const rho = Math.sqrt(Math.max(rhoSquared, 0.001)); // Clamp rho to a minimum value to avoid NaN

        const x = rho * Math.cos(angle);
        const y = rho * Math.sin(angle);
        const z = 0;

        points.push(new THREE.Vector3(x, y, z));
      }

      geometry.setFromPoints(points);

      const line = new THREE.Line(geometry, material);
      scene.add(line);
    };

    drawCassiniOvals();

    camera.position.z = 5;
    scene.scale.set(5, 5, 1);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default CassiniOvals;
