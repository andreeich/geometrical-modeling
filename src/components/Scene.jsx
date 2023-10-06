import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function Scene() {
  const canvasRef = useRef();

  useEffect(() => {
    let animationFrameId;
    // basic setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(1000, 1000);

    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // creating an object
    const figure = new THREE.Group();
    // back shape
    const backShape = new THREE.Shape();
    backShape.moveTo(7, 3);
    backShape.lineTo(6, 5);
    backShape.lineTo(-6, 5);
    backShape.lineTo(-7, 3);
    backShape.lineTo(-7, -3);
    backShape.lineTo(-6, -5);
    backShape.lineTo(-3, -5);
    backShape.moveTo(0, -5);
    backShape.ellipse(0, 0, 3, 3, Math.PI, 0, false, 0);
    backShape.lineTo(6, -5);
    backShape.lineTo(7, -3);

    const backMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(backShape),
      new THREE.MeshBasicMaterial({
        color: 0x00ff,
        // wireframe: true,
        linewidth: 10,
      })
    );

    figure.add(backMesh);

    // bone shape
    const boneShape = new THREE.Shape();
    boneShape.moveTo(4 - Math.sqrt(3), 2);
    boneShape.lineTo(-4, 2);
    boneShape.moveTo(-4, 1);
    boneShape.ellipse(0, 0, 2, 2, 0, -Math.PI, false, 0);
    boneShape.lineTo(-4, 0);
    boneShape.lineTo(-6, -1);
    boneShape.moveTo(-4, -1);
    boneShape.ellipse(0, 0, 2, 2, Math.PI, (-30 * Math.PI) / 180, false, 0);
    boneShape.lineTo(4 - Math.sqrt(3), 0 - 2);
    boneShape.moveTo(4, -1);
    boneShape.ellipse(0, 0, 2, 2, (210 * Math.PI) / 180, 0, false, 0);
    boneShape.lineTo(4, 0);
    boneShape.lineTo(6, 1);
    boneShape.moveTo(4, 1);
    boneShape.ellipse(0, 0, 2, 2, 0, (210 * Math.PI) / 180, false, 0);

    const boneMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(boneShape),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        // wireframe: true,
      })
    );

    figure.add(boneMesh);

    // circle shape
    const circleShape = new THREE.Shape();
    circleShape.moveTo(0, -5);
    circleShape.ellipse(0, 0, 2, 2, 0, Math.PI * 2, false, 0);

    const circleMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(circleShape),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        // wireframe: true,
      })
    );

    figure.add(circleMesh);

    // adding figure to the scene
    scene.add(figure);
    renderer.render(scene, camera);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      figure.rotation.x += 0.01;
      figure.rotation.y += 0.01;
      figure.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="aspect-square">
      <canvas ref={canvasRef} className="!w-full !h-full" />
    </div>
  );
}

export default Scene;
