import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function ThreejsScene() {
  const canvasRef = useRef();

  useEffect(() => {
    let animationFrameId;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.CircleGeometry(1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const object = new THREE.Mesh(geometry, material);
    scene.add(object);

    // const axesHelper = new THREE.AxesHelper(2).setColors(
    //   0xf44336,
    //   0x16537e,
    //   0x8fce00
    // );
    // scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    renderer.render(scene, camera);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      object.rotation.x += 0.01;
      object.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Inside the useEffect
    const handleWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      // cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default ThreejsScene;
