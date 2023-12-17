import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Icon } from "@iconify/react";

const math = require("mathjs");
const algebra = require("algebra.js");

// calc function
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
function getDeltoidPoint(funcs, a, c, mir = false) {
  let p = Math.sqrt(Math.tan(Math.PI - a));
  if (mir) p = -p;
  let scope = { p, c };
  math.evaluate("x = " + funcs.x, scope);
  math.evaluate("y = " + funcs.y, scope);
  return [scope.x, scope.y];
}
function getFirstDerivativeDeltoidPoint(funcs, a, c, mir = false) {
  let p = Math.sqrt(Math.tan(Math.PI - a));
  if (mir) p = -p;
  let scope = { p, c };
  math.evaluate("x = " + funcs.xt, scope);
  math.evaluate("y = " + funcs.yt, scope);
  return [scope.x, scope.y];
}
function getTangentPoints(funcs, point) {
  if (!point.point[0] || !point.point[1]) return null;
  const pointD1 = getFirstDerivativeDeltoidPoint(
    funcs,
    point.a,
    point.c,
    point.mir
  );
  let points = [];
  for (let i = -1; i <= 1; i++) {
    let x = point.point[0] + 10 * i;
    let y = point.point[1] + (pointD1[1] / pointD1[0]) * (x - point.point[0]);
    points.push([x, y]);
  }
  return points;
}
function getNormalPoints(funcs, point) {
  if (!point.point[0] || !point.point[1]) return null;
  const pointD1 = getFirstDerivativeDeltoidPoint(
    funcs,
    point.a,
    point.c,
    point.mir
  );
  let points = [];
  for (let i = -1; i <= 1; i++) {
    let x = point.point[0] + 10 * i;
    let y = point.point[1] - (pointD1[0] / pointD1[1]) * (x - point.point[0]);
    points.push([x, y]);
  }
  return points;
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
  const paramsDefault = {
    c: {
      value: 3.5,
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
  const shapeDataDefault = {
    radius: {
      name: "Радіус кривизни",
      value: 0,
    },
    area: {
      name: "Площа",
      value: 0,
    },
  };
  // refs and states
  const canvasRef = useRef();
  const [params, setParams] = useState(paramsDefault);
  const [euclidean, setEuclidean] = useState(euclideanDefault);
  const [addConst, setAddConst] = useState(addConstDefault);
  const [addConstToggle, setAddConstToggle] = useState(false);
  const [shapeData, setShapeData] = useState(shapeDataDefault);
  const [deltoidFuncs, setDeltoidFuncs] = useState(null);
  if (deltoidFuncs == null) {
    function DeltoidFuncs() {
      this.x = "c * sqrt(2) * ((p + p^3)/(1 + p^4))";
      this.y = "c * sqrt(2) * ((p - p^3)/(1 + p^4))";
      this.xt = math.derivative(this.x, "p").toString();
      this.yt = math.derivative(this.y, "p").toString();
    }

    setDeltoidFuncs(new DeltoidFuncs());
  }
  // dom elements with refs
  const paramsRows = Object.entries(params).map(([key, v]) => {
    return (
      <div className="items-center border join border-secondary" key={key}>
        <div className="px-2 py-1 text-xs font-bold text-base-100 bg-secondary rounded-s-md rounded-e-none">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </div>
        <input
          type="number"
          placeholder={v.value}
          defaultValue={v.value}
          ref={v.ref}
          step={0.1}
          onChange={(e) =>
            setParams({
              ...params,
              [key]: {
                ...params[key],
                value: e.target.value
                  ? parseFloat(e.target.value)
                  : parseFloat(e.target.defaultValue),
              },
            })
          }
          className="w-full input input-xs rounded-s-none"
        />
      </div>
    );
  });
  const euclideanRows = Object.entries(euclidean).map(([name, object]) => {
    return (
      <div className="form-control" key={name}>
        <label className="label">
          <span className="label-text">
            {name == "offset"
              ? "Зміщення"
              : name == "rotation"
              ? "Обертання"
              : name == "scale"
              ? "Збільшення"
              : "Параметр"}
          </span>
        </label>
        <div className="gap-6 join">
          {Object.entries(object).map(([key, value]) => (
            <div
              className="items-center border join border-secondary"
              key={key}
            >
              <div className="px-2 py-1 text-xs font-bold text-base-100 bg-secondary rounded-s-md rounded-e-none">
                {key == "angle"
                  ? "Кут"
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
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
                className="w-full input input-xs rounded-s-none"
              />
            </div>
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

  // calc shape data
  function calcShapeData() {
    const s = params.c.value ** 2;
    const r = (2 * params.c.value ** 2) / (3 * Math.sqrt(2 * Math.cos(0)));
    setShapeData({
      ...shapeData,
      radius: {
        ...shapeData.radius,
        value: r.toFixed(4),
      },
      area: {
        ...shapeData.area,
        value: s.toFixed(4),
      },
    });
  }
  // // calc new points based on matrixes
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

    for (let a = 0; a <= Math.PI; a += Math.PI / 100) {
      let point = getDeltoidPoint(deltoidFuncs, a, params.c.value, false);

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
      if (!point[0] || !point[1]) continue;
      points.push(new THREE.Vector2(point[0], point[1]));
      pointsDetails.push({
        point,
        a,
        c: params.c.value,
        mir: false,
      });
    }
    for (let a = 0; a <= Math.PI; a += Math.PI / 100) {
      let point = getDeltoidPoint(deltoidFuncs, a, params.c.value, true);

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
      if (!point[0] || !point[1]) continue;
      points.push(new THREE.Vector2(point[0], point[1]));
      pointsDetails.push({
        point,
        a,
        c: params.c.value,
        mir: true,
      });
    }
    // for (let x = -7; x <= 7; x += 0.1) {
    //   let point = getDeltoidPoint(
    //     deltoidFuncs,
    //     params.a.value,
    //     params.c.value,
    //     x
    //   );
    //   point[1] = -point[1];

    //   for (const m of ms) {
    //     let x =
    //       (point[0] * m[0][0] + point[1] * m[1][0] + m[2][0]) /
    //       (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);
    //     let y =
    //       (point[0] * m[0][1] + point[1] * m[1][1] + m[2][1]) /
    //       (point[0] * m[0][2] + point[1] * m[1][2] + m[2][2]);

    //     point[0] = x;
    //     point[1] = y;
    //   }
    //   if (!point[0] || !point[1]) continue;
    //   points.push(new THREE.Vector2(point[0], point[1]));
    //   pointsDetails.push({
    //     point: [point[0], point[1]],
    //     a: params.a.value,
    //     c: params.c.value,
    //   });
    // }

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
      tangent = getTangentPoints(deltoidFuncs, pointsDetails[addConst.index]);
      normal = getNormalPoints(deltoidFuncs, pointsDetails[addConst.index]);
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
        if (!point[0] || !point[1]) continue;

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
        if (!point[0] || !point[1]) continue;
        normal[index] = new THREE.Vector2(...point);
      }
    }
    // console.log(tangent);
    return [points, pointsDetails, tangent, normal];
  };
  // drawing a canvas
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeae7e7);
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
    drawLine(figure, points, 0x8e4262);

    // drawing additional constructions
    if (pointsDetails.length) {
      addConst.ref.current.max = pointsDetails.length - 1;
      if (addConstToggle) {
        if (tangent) {
          drawLine(figure, tangent, 0xff5861);
        }
        if (normal) {
          drawLine(figure, normal, 0x00aa6f);
        }
        if (tangent && normal)
          drawPoint(figure, pointsDetails[addConst.index].point);
      }
    }
    // updating shape information
    calcShapeData();
    // drawing points

    // adding figure to the scene
    scene.add(grid);
    scene.add(figure);

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
    };
  }, [params, euclidean, addConst]);

  return (
    <div className="grid items-start justify-center grid-cols-1 gap-2 md:grid-cols-2 place-items-center">
      <div className="md:sticky md:top-3 aspect-square md:order-last">
        <canvas ref={canvasRef} className="!w-full !h-full" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 space-y-2 border rounded-lg">
          <h2 className="text-lg font-bold">Налаштування параметрів</h2>
          <div className="space-y-6">
            <div className="space-y-2 ">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-center text-md">
                  Параметри фігури
                </h2>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={resetParams}
                >
                  <Icon icon="heroicons:backspace" />
                </button>
              </div>
              <div className="flex flex-col gap-4">{paramsRows}</div>
            </div>
            <div className="space-y-2 ">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-center text-md">
                  Евклідові перетоврення
                </h2>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={resetEuclid}
                >
                  <Icon icon="heroicons:backspace" />
                </button>
              </div>
              <fieldset disabled={addConstToggle} className="flex flex-col">
                {euclideanRows}
              </fieldset>
            </div>
            <div className="space-y-2 ">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-center text-md">
                  Додаткові конструкції
                </h2>
                <input
                  type="checkbox"
                  className="toggle toggle-secondary"
                  checked={addConstToggle}
                  onChange={handleAddConstToggle}
                />
              </div>
              <fieldset disabled={!addConstToggle} className="flex flex-col">
                <label className="gap-4 join">
                  <div className="w-full">
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
                      className="range range-xs range-secondary"
                    />
                    <div className="flex justify-between w-full px-2 text-xs">
                      <span>|</span>
                      <span>|</span>
                      <span>|</span>
                      <span>|</span>
                      <span>|</span>
                    </div>
                  </div>
                </label>
              </fieldset>
              <div className="justify-end w-full gap-2 join">
                <div className="items-center gap-1 text-xs join">
                  Дотична<span className="badge badge-error"></span>
                </div>
                <div className="items-center gap-1 text-xs join">
                  Нормаль<span className="badge badge-success"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 ">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">Дані фігури</h2>
          </div>
          <table className="table table-auto">
            <tbody>
              <tr>
                <th>{shapeData.radius.name}</th>
                <td>{shapeData.radius.value}</td>
              </tr>
              <tr>
                <th>{shapeData.area.name}</th>
                <td>{shapeData.area.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SceneTwo;
