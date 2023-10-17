import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// calc function
function getDeltoidPoint(r, t) {
  const x = 2 * r * Math.cos(t) + r * Math.cos(2 * t);
  const y = 2 * r * Math.sin(t) - r * Math.sin(2 * t);
  return [x, y];
}
function getFirstDerivativeDeltoidPoint(r, t) {
  const xt = -2 * r * Math.sin(t) - 2 * r * Math.sin(2 * t);
  const yt = 2 * r * Math.cos(t) - 2 * r * Math.cos(2 * t);
  return [xt, yt];
}
function getTangentPoints(point) {
  const pointD1 = getFirstDerivativeDeltoidPoint(point.r, point.t);
  let points = [];
  for (let i = -1; i <= 1; i++) {
    let x = point.point[0] + 10 * i;
    let y = point.point[1] + (pointD1[1] / pointD1[0]) * (x - point.point[0]);
    points.push([x, y]);
  }
  return points;
}
function getNormalPoints(point) {
  const pointD1 = getFirstDerivativeDeltoidPoint(point.r, point.t);
  let points = [];
  for (let i = -1; i <= 1; i++) {
    let x = point.point[0] + 10 * i;
    let y = point.point[1] - (pointD1[0] / pointD1[1]) * (x - point.point[0]);
    points.push([x, y]);
  }
  return points;
}
function calcGrid(size = 15) {
  const gridPoints = [];
  for (let i = 0; i < size; i++) {
    gridPoints.push(
      [
        [-Math.floor(size / 2) + i, Math.floor(size / 2)],
        [-Math.floor(size / 2) + i, -Math.floor(size / 2)],
        new THREE.LineBasicMaterial({
          color: 0xb7b7b7,
          linewidth: 0.5,
        }),
      ],
      [
        [Math.floor(size / 2), -Math.floor(size / 2) + i],
        [-Math.floor(size / 2), -Math.floor(size / 2) + i],
        new THREE.LineBasicMaterial({
          color: 0xb7b7b7,
          linewidth: 0.5,
        }),
      ]
    );
  }
  gridPoints.push(
    [
      [0, Math.floor(size / 2) + 1],
      [0, -Math.floor(size / 2) - 1],
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      }),
    ],
    [
      [Math.floor(size / 2) + 1, 0],
      [-Math.floor(size / 2) - 1, 0],
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      }),
    ],
    [
      [0, Math.floor(size / 2) + 1],
      [0.3, Math.floor(size / 2) + 1 - 0.3],
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      }),
    ],
    [
      [0, Math.floor(size / 2) + 1],
      [-0.3, Math.floor(size / 2) + 1 - 0.3],
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      }),
    ],
    [
      [Math.floor(size / 2) + 1, 0],
      [Math.floor(size / 2) + 1 - 0.3, 0.3],
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      }),
    ],
    [
      [Math.floor(size / 2) + 1, 0],
      [Math.floor(size / 2) + 1 - 0.3, -0.3],
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      }),
    ]
  );
  return Array.from(gridPoints);
}
// drawing functions
function drawLine(figure, points, color = 0x000000) {
  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  figure.add(line);
}
function drawGrid(figure, points) {
  for (const point of Object.values(points)) {
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(point[0][0], point[0][1]),
          new THREE.Vector2(point[1][0], point[1][1]),
        ]),
        point[2]
      )
    );
  }
}
function drawPoint(figure, point, color = 0x000000, r = 0.1) {
  const material = new THREE.MeshBasicMaterial({ color });

  const shape = new THREE.Shape();
  shape.absellipse(
    point[0],
    point[1], // ax, aY
    r,
    r, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );
  const geometry = new THREE.ShapeGeometry(shape);
  const ellipse = new THREE.Mesh(geometry, material);
  figure.add(ellipse);
}

function SceneTwo() {
  // data
  const constants = {
    t: {
      start: 0,
      end: 2 * Math.PI,
    },
  };
  const paramsDefault = {
    r: {
      value: 2,
      ref: useRef(),
    },
  };
  const euclideanDefault = {
    offset: {
      x: {
        value: 0,
        ref: useRef(),
      },
      y: {
        value: 0,
        ref: useRef(),
      },
    },
    rotation: {
      angle: {
        value: 0,
        ref: useRef(),
      },
      x: {
        value: 0,
        ref: useRef(),
      },
      y: {
        value: 0,
        ref: useRef(),
      },
    },
    scale: {
      x: {
        value: 1,
        ref: useRef(),
      },
      y: {
        value: 1,
        ref: useRef(),
      },
    },
  };
  const addConstDefault = {
    index: -1,
    maxIndex: -1,
    ref: useRef(),
  };
  // refs and states
  const canvasRef = useRef();
  const [params, setParams] = useState(paramsDefault);
  const [euclidean, setEuclidean] = useState(euclideanDefault);
  const [addConst, setAddConst] = useState(addConstDefault);
  const [addConstToggle, setAddConstToggle] = useState(false);
  // dom elements with refs
  const paramsRows = Object.entries(params).map(([key, v]) => {
    return (
      <label className="input-group input-group-xs" key={key}>
        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <input
          type="number"
          placeholder={v.value}
          defaultValue={v.value}
          ref={v.ref}
          onChange={(e) =>
            setParams({
              ...params,
              [key]: {
                ...params[key],
                value: e.target.value
                  ? ~~e.target.value
                  : ~~e.target.defaultValue,
              },
            })
          }
          className="w-full input input-xs input-bordered"
        />
      </label>
    );
  });
  const euclideanRows = Object.entries(euclidean).map(([name, object]) => {
    return (
      <div className="form-control" key={name}>
        <label className="label">
          <span className="label-text">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
        </label>
        <div className="gap-2 join join-vertical">
          {Object.entries(object).map(([key, value]) => (
            <label className="input-group input-group-xs" key={key}>
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <input
                type="number"
                placeholder={value.value}
                defaultValue={value.value}
                ref={value.ref}
                onChange={(e) =>
                  setEuclidean({
                    ...euclidean,
                    [name]: {
                      ...euclidean[name],
                      [key]: {
                        ...euclidean[name][key],
                        value: e.target.value
                          ? ~~e.target.value
                          : ~~e.target.defaultValue,
                      },
                    },
                  })
                }
                className="w-full input input-xs input-bordered"
              />
            </label>
          ))}
        </div>
      </div>
    );
  });
  // reset functions
  const resetParams = () => {
    setParams(paramsDefault);
    for (const param of Object.values(params)) {
      param.ref.current.value = param.ref.current.defaultValue;
    }
  };
  const resetEuclid = () => {
    setEuclidean(euclideanDefault);
    for (const [key, param] of Object.entries(euclidean)) {
      for (const setting of Object.values(param)) {
        setting.ref.current.value = setting.ref.current.defaultValue;
      }
    }
  };
  const handleAddConstToggle = () => {
    setAddConstToggle((prev) => !prev);
    if (!addConstToggle) {
      resetEuclid();
    }
  };

  // calc new points based on matrixes
  const calcPoints = () => {
    let ms = [
      // Euclidean offset
      [
        [1, 0, 0],
        [0, 1, 0],
        [euclidean.offset.x.value, euclidean.offset.y.value, 1],
      ],
      // Euclidean rotation
      [
        [
          Math.cos(euclidean.rotation.angle.value),
          Math.sin(euclidean.rotation.angle.value),
          0,
        ],
        [
          -Math.sin(euclidean.rotation.angle.value),
          Math.cos(euclidean.rotation.angle.value),
          0,
        ],
        [
          -euclidean.rotation.x.value *
            (Math.cos(euclidean.rotation.angle.value) - 1) +
            euclidean.rotation.y.value *
              Math.sin(euclidean.rotation.angle.value),
          -euclidean.rotation.x.value *
            Math.sin(euclidean.rotation.angle.value) -
            euclidean.rotation.y.value *
              (Math.cos(euclidean.rotation.angle.value) - 1),
          1,
        ],
      ],
      // Euclidean scale
      [
        [euclidean.scale.x.value, 0, 0],
        [0, euclidean.scale.y.value, 0],
        [0, 0, 1],
      ],
    ];

    let points = [];
    let pointsDetails = [];

    for (let t = constants.t.start; t <= constants.t.end; t += 0.1) {
      let point = getDeltoidPoint(params.r.value, t);

      for (const m of ms) {
        let x =
          (point[0] * m[0][0] + point[1] * m[1][0] + m[2][0]) /
          (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);
        let y =
          (point[0] * m[0][1] + point[1] * m[1][1] + m[2][1]) /
          (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);

        point[0] = x;
        point[1] = y;
      }
      points.push(new THREE.Vector2(...point));
      pointsDetails.push({ point, r: params.r.value, t });
    }

    ms = [
      // Euclidean rotation
      [
        [
          Math.cos(euclidean.rotation.angle.value),
          Math.sin(euclidean.rotation.angle.value),
          0,
        ],
        [
          -Math.sin(euclidean.rotation.angle.value),
          Math.cos(euclidean.rotation.angle.value),
          0,
        ],
        [
          -euclidean.rotation.x.value *
            (Math.cos(euclidean.rotation.angle.value) - 1) +
            euclidean.rotation.y.value *
              Math.sin(euclidean.rotation.angle.value),
          -euclidean.rotation.x.value *
            Math.sin(euclidean.rotation.angle.value) -
            euclidean.rotation.y.value *
              (Math.cos(euclidean.rotation.angle.value) - 1),
          1,
        ],
      ],
      // Euclidean scale
      [
        [euclidean.scale.x.value, 0, 0],
        [0, euclidean.scale.y.value, 0],
        [0, 0, 1],
      ],
    ];
    let tangent = null;
    let normal = null;
    if (addConst.index >= 0 && addConst.index < pointsDetails.length) {
      tangent = getTangentPoints(pointsDetails[addConst.index]);
      normal = getNormalPoints(pointsDetails[addConst.index]);
      for (let index in tangent) {
        let point = tangent[index];
        for (const m of ms) {
          let x =
            (point[0] * m[0][0] + point[1] * m[1][0] + m[2][0]) /
            (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);
          let y =
            (point[0] * m[0][1] + point[1] * m[1][1] + m[2][1]) /
            (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);

          point[0] = x;
          point[1] = y;
        }
        tangent[index] = new THREE.Vector2(...point);
      }
      for (let index in normal) {
        let point = normal[index];
        for (const m of ms) {
          let x =
            (point[0] * m[0][0] + point[1] * m[1][0] + m[2][0]) /
            (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);
          let y =
            (point[0] * m[0][1] + point[1] * m[1][1] + m[2][1]) /
            (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);

          point[0] = x;
          point[1] = y;
        }
        normal[index] = new THREE.Vector2(...point);
      }
    }

    return [points, pointsDetails, tangent, normal];
  };
  // drawing a canvas
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100000);
    const cameraHeight = 12;
    camera.position.z = cameraHeight;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(1000, 1000);

    const figure = new THREE.Group();

    // calc new points
    const [points, pointsDetails, tangent, normal] = calcPoints();

    const grid = new THREE.Group();
    // adding elements to the figure
    drawGrid(grid, calcGrid());
    grid.position.z -= 0.001;
    drawLine(figure, points, 0x0000ff);

    if (pointsDetails.length) {
      addConst.ref.current.max = pointsDetails.length - 1;
      if (addConstToggle) {
        if (tangent) {
          drawLine(figure, tangent, 0xff0000);
        }
        if (normal) {
          drawLine(figure, normal, 0x00ff00);
        }
        if (tangent && normal)
          drawPoint(figure, pointsDetails[addConst.index].point);
      }
    }

    // adding figure to the scene
    scene.add(grid);
    scene.add(figure);

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
    };
  }, [params, euclidean, addConst]);

  return (
    <div className="grid items-start justify-center grid-cols-1 gap-2 md:grid-cols-2">
      <div className="top-16 md:sticky aspect-square">
        <canvas ref={canvasRef} className="!w-full !h-full" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Setting Parameters
            </h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetParams}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col">{paramsRows}</div>
        </div>
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Additional Constructions
            </h2>
            <input
              type="checkbox"
              className="toggle"
              checked={addConstToggle}
              onChange={handleAddConstToggle}
            />
          </div>
          <fieldset disabled={!addConstToggle} className="flex flex-col">
            <label className="gap-4 join">
              <span className="text-sm">Point</span>
              <input
                type="range"
                min={1}
                max={0}
                value={addConst.index}
                ref={addConst.ref}
                onChange={(e) =>
                  setAddConst({
                    ...addConst,
                    index: e.target.value
                      ? ~~e.target.value
                      : ~~e.target.defaultValue,
                  })
                }
                className="range range-sm"
              />
            </label>
          </fieldset>
          <div className="gap-2 join">
            <span className="badge badge-error">Tangent</span>
            <span className="badge badge-success">Normal</span>
          </div>
        </div>
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Euclidean Transformation
            </h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetEuclid}
            >
              Reset
            </button>
          </div>
          <fieldset disabled={addConstToggle} className="flex flex-col">
            {euclideanRows}
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default SceneTwo;
