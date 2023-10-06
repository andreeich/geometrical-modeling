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
    // creating a material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 2,
    });
    // adding elements to the figure
    // bone shape
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-2, 2),
          new THREE.Vector2(2, 2),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(
            -2 - Math.sqrt(3), // ax
            1, // aY
            2, // xRadius
            2, // yRadius
            (30 * Math.PI) / 180, // aStartAngle
            Math.PI, // aEndAngle
            false, // aClockwise
            0 // aRotation
          ).getPoints(50)
        ),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-4 - Math.sqrt(3), 1),
          new THREE.Vector2(-2 - Math.sqrt(3), 0),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-2 - Math.sqrt(3), 0),
          new THREE.Vector2(-4 - Math.sqrt(3), -1),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(
            -2 - Math.sqrt(3), // ax
            -1, // aY
            2, // xRadius
            2, // yRadius
            Math.PI, // aStartAngle
            (-30 * Math.PI) / 180, // aEndAngle
            false, // aClockwise
            0 // aRotation
          ).getPoints(50)
        ),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-2, -2),
          new THREE.Vector2(2, -2),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(
            2 + Math.sqrt(3), // ax
            -1, // aY
            2, // xRadius
            2, // yRadius
            (210 * Math.PI) / 180, // aStartAngle
            0, // aEndAngle
            false, // aClockwise
            0 // aRotation
          ).getPoints(50)
        ),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(4 + Math.sqrt(3), -1),
          new THREE.Vector2(2 + Math.sqrt(3), 0),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(2 + Math.sqrt(3), 0),
          new THREE.Vector2(4 + Math.sqrt(3), 1),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(
            2 + Math.sqrt(3), // ax
            1, // aY
            2, // xRadius
            2, // yRadius
            0, // aStartAngle
            (150 * Math.PI) / 180, // aEndAngle
            false, // aClockwise
            0 // aRotation
          ).getPoints(50)
        ),
        lineMaterial
      )
    );
    // circle shape
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(
            0, // ax
            -5, // aY
            2, // xRadius
            2, // yRadius
            0, // aStartAngle
            2 * Math.PI, // aEndAngle
            false, // aClockwise
            0 // aRotation
          ).getPoints(50)
        ),
        lineMaterial
      )
    );
    // back shape
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-4 - Math.sqrt(3), 5),
          new THREE.Vector2(-5 - Math.sqrt(3), 3),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-5 - Math.sqrt(3), 3),
          new THREE.Vector2(-5 - Math.sqrt(3), -3),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-5 - Math.sqrt(3), -3),
          new THREE.Vector2(-4 - Math.sqrt(3), -5),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-4 - Math.sqrt(3), -5),
          new THREE.Vector2(-3, -5),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(
            0, // ax
            -5, // aY
            3, // xRadius
            3, // yRadius
            Math.PI, // aStartAngle
            2 * Math.PI, // aEndAngle
            false, // aClockwise
            0 // aRotation
          ).getPoints(50)
        ),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(3, -5),
          new THREE.Vector2(4 + Math.sqrt(3), -5),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(4 + Math.sqrt(3), -5),
          new THREE.Vector2(5 + Math.sqrt(3), -3),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(5 + Math.sqrt(3), -3),
          new THREE.Vector2(5 + Math.sqrt(3), 3),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(5 + Math.sqrt(3), 3),
          new THREE.Vector2(4 + Math.sqrt(3), 5),
        ]),
        lineMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(4 + Math.sqrt(3), 5),
          new THREE.Vector2(-4 - Math.sqrt(3), 5),
        ]),
        lineMaterial
      )
    );

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
