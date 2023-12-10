import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

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
function getDeltoidPoint(r, scope) {
  math.evaluate("r = " + r, scope);

  return [scope.r * Math.cos(scope.f), scope.r * Math.sin(scope.f)];
}
function getFirstDerivativeDeltoidPoint(scope) {
  if (scope.r == deltoidFuncs.r1) {
    math.evaluate("x = " + deltoidFuncs.r1dx, scope);
    math.evaluate("y = " + deltoidFuncs.r1dy, scope);
    return [scope.x, scope.y];
  } else if (scope.r == deltoidFuncs.r2) {
    math.evaluate("x = " + deltoidFuncs.r2dx, scope);
    math.evaluate("y = " + deltoidFuncs.r2dy, scope);
    return [scope.x, scope.y];
  } else if (scope.r == deltoidFuncs.r3) {
    math.evaluate("x = " + deltoidFuncs.r3dx, scope);
    math.evaluate("y = " + deltoidFuncs.r3dy, scope);
    return [scope.x, scope.y];
  } else if (scope.r == deltoidFuncs.r4) {
    math.evaluate("x = " + deltoidFuncs.r4dx, scope);
    math.evaluate("y = " + deltoidFuncs.r4dy, scope);
    return [scope.x, scope.y];
  } else return [NaN, NaN];
}
function getTangentPoints(point) {
  if (!point.point[0] || !point.point[1]) return null;
  const pointD1 = getFirstDerivativeDeltoidPoint(point);
  let points = [];
  for (let i = -1; i <= 1; i++) {
    let x = point.point[0] + 10 * i;
    let y = point.point[1] + (pointD1[1] / pointD1[0]) * (x - point.point[0]);
    points.push([x, y]);
  }
  return points;
}
function getNormalPoints(point) {
  if (!point.point[0] || !point.point[1]) return null;
  const pointD1 = getFirstDerivativeDeltoidPoint(point);
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
  // console.log(points);
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
function drawPoints(figure, points, color = 0x000000, r = 0.1) {
  const material = new THREE.MeshBasicMaterial({ color });

  points.forEach((point) => {
    const shape = new THREE.Shape();
    shape.absellipse(
      point.x,
      point.y, // ax, aY
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
  });
}

function DeltoidFuncs() {
  // this.r = "-sqrt(c^2*cos(2f)+sqrt(c^4*cos(2f)^2+a^4-c^4))";
  this.r1 =
    "sqrt(-2*sqrt(b^2*(a^2*cos(f)^2 + b^2*cos(f)^4 - b^2*cos(f)^2 - c^2*cos(f)^2 + c^2)) + a^2 + 2*b^2*cos(f)^2 - b^2 - c^2)";
  this.r1dx = math.derivative(this.r1 + "*cos(f)", "f").toString();
  this.r1dy = math.derivative(this.r1 + "*sin(f)", "f").toString();
  this.r2 =
    "-sqrt(-2*sqrt(b^2*(a^2*cos(f)^2 + b^2*cos(f)^4 - b^2*cos(f)^2 - c^2*cos(f)^2 + c^2)) + a^2 + 2*b^2*cos(f)^2 - b^2 - c^2)";
  this.r2dy = math.derivative(this.r2 + "*sin(f)", "f").toString();
  this.r2dx = math.derivative(this.r2 + "*cos(f)", "f").toString();
  this.r3 =
    "sqrt(2*sqrt(b^2*(a^2*cos(f)^2 + b^2*cos(f)^4 - b^2*cos(f)^2 - c^2*cos(f)^2 + c^2)) + a^2 + 2*b^2*cos(f)^2 - b^2 - c^2)";
  this.r3dy = math.derivative(this.r3 + "*sin(f)", "f").toString();
  this.r3dx = math.derivative(this.r3 + "*cos(f)", "f").toString();
  this.r4 =
    "-sqrt(2*sqrt(b^2*(a^2*cos(f)^2 + b^2*cos(f)^4 - b^2*cos(f)^2 - c^2*cos(f)^2 + c^2)) + a^2 + 2*b^2*cos(f)^2 - b^2 - c^2)";
  this.r4dy = math.derivative(this.r4 + "*sin(f)", "f").toString();
  this.r4dx = math.derivative(this.r4 + "*cos(f)", "f").toString();
  // this.y2x = math.derivative(this.y2, "x").toString();
}

const deltoidFuncs = new DeltoidFuncs();

function SceneTwo() {
  const paramsDefault = {
    a: {
      value: 1,
      ref: useRef(),
    },
    b: {
      value: 2,
      ref: useRef(),
    },
    c: {
      value: 0,
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
    length: {
      name: "Arc length",
      value: 0,
    },
    radius: {
      name: "Radius of curvature",
      value: 0,
    },
    area: {
      name: "Area",
      value: 0,
    },
    inflection: {
      name: "Inflection points",
      value: 0,
    },
    rings: {
      name: "Area of rings",
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
  // dom elements with refs
  const paramsRows = Object.entries(params).map(([key, v]) => {
    return (
      <div className="join" key={key}>
        <div className="indicator">
          <span className="indicator-item badge-xs badge badge-secondary">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        </div>
        <input
          type="number"
          placeholder={v.value}
          defaultValue={v.value}
          ref={v.ref}
          step={0.1}
          min={0}
          max={
            key == "b"
              ? params.a.value
              : key == "c"
              ? params.a.value ** 2
              : null
          }
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
          className="w-full input input-xs"
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
            <div className="join" key={key}>
              <div className="indicator">
                <span className="indicator-item badge badge-xs badge-secondary">
                  {key == "angle"
                    ? "Кут"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
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
                className="w-full input input-xs"
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
  // function calcShapeData() {
  //   const l = 16 * params.r.value;
  //   const s = (2 / 9) * Math.PI * (params.r.value * 3) ** 2;
  //   setShapeData({
  //     ...shapeData,
  //     length: {
  //       ...shapeData.length,
  //       value: l.toFixed(4),
  //     },
  //     area: {
  //       ...shapeData.area,
  //       value: s.toFixed(4),
  //     },
  //   });
  // }
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
    const rs = [
      deltoidFuncs.r1,
      // deltoidFuncs.r2,
      deltoidFuncs.r3,
      // deltoidFuncs.r4,
    ];
    const fs = [
      { start: 0, end: Math.PI / 4 },
      // { start: Math.PI / 4, end: Math.PI / 2 },
      // { start: Math.PI / 2, end: (3 * Math.PI) / 4 },
      { start: (3 * Math.PI) / 4, end: 2 * Math.PI },
    ];
    for (const fParam of fs) {
      for (const r of rs) {
        for (let f = fParam.start; f <= fParam.end; f += Math.PI / 100) {
          let point = getDeltoidPoint(r, {
            a: params.a.value,
            b: params.b.value,
            c: params.c.value,
            f,
          });
          // console.log("point :>> ", point);
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
          // console.log(point[0], point[1]);
          if (!point[0] || !point[1]) continue;
          points.push(new THREE.Vector2(point[0], point[1]));
          pointsDetails.push({
            point: [point[0], point[1]],
            a: params.a.value,
            b: params.b.value,
            c: params.c.value,
            f,
            r,
          });
        }
      }
    }
    // for (let f = 0; f <= 2 * Math.PI; f += 0.1) {
    //   let point = getDeltoidPoint(deltoidFuncs.r1, {
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    //   // console.log("point :>> ", point);

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
    //   // console.log(point[0], point[1]);
    //   if (!point[0] || !point[1]) continue;
    //   points.push(new THREE.Vector2(point[0], point[1]));
    //   pointsDetails.push({
    //     point: [point[0], point[1]],
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    // }
    // for (let f = 0; f <= 2 * Math.PI; f += 0.1) {
    //   let point = getDeltoidPoint(deltoidFuncs.r2, {
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    //   // console.log("point :>> ", point);

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
    //   // console.log(point[0], point[1]);
    //   if (!point[0] || !point[1]) continue;
    //   points.push(new THREE.Vector2(point[0], point[1]));
    //   pointsDetails.push({
    //     point: [point[0], point[1]],
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    // }
    // for (let f = 0; f <= 2 * Math.PI; f += 0.1) {
    //   let point = getDeltoidPoint(deltoidFuncs.r3, {
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    //   // console.log("point :>> ", point);

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
    //   // console.log(point[0], point[1]);
    //   if (!point[0] || !point[1]) continue;
    //   points.push(new THREE.Vector2(point[0], point[1]));
    //   pointsDetails.push({
    //     point: [point[0], point[1]],
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    // }
    // for (let f = 0; f <= 2 * Math.PI; f += 0.1) {
    //   let point = getDeltoidPoint(deltoidFuncs.r4, {
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
    //   });
    //   // console.log("point :>> ", point);

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
    //   // console.log(point[0], point[1]);
    //   if (!point[0] || !point[1]) continue;
    //   points.push(new THREE.Vector2(point[0], point[1]));
    //   pointsDetails.push({
    //     point: [point[0], point[1]],
    //     a: params.a.value,
    //     b: params.b.value,
    //     c: params.c.value,
    //     f,
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
      tangent = getTangentPoints(pointsDetails[addConst.index]);
      console.log("tangent :>> ", tangent);
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
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100000);
    const cameraHeight = 12;
    camera.position.z = cameraHeight;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(1000, 1000);

    const figure = new THREE.Group();

    // calc new points
    const [points, pointsDetails, tangent, normal] = calcPoints();
    // console.log("points :>> ", points);

    const grid = new THREE.Group();
    // adding elements to the figure
    drawGrid(grid, calcGrid());
    grid.position.z -= 0.001;
    // drawLine(figure, points, 0x900990);
    drawPoints(figure, points, 0x900990, 0.05);

    // drawing additional constructions
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
    // updating shape information
    // calcShapeData();
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
    <div className="grid items-center justify-center grid-cols-1 gap-2 place-items-center">
      <div className="max-w-md aspect-square">
        <canvas ref={canvasRef} className="!w-full !h-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">Параметри фігури</h2>
            <button className="btn btn-xs btn-ghost" onClick={resetParams}>
              Скинути
            </button>
          </div>
          <div className="flex flex-col gap-4">{paramsRows}</div>
        </div>

        {/* <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">Дані фігури</h2>
          </div>
          <table className="table table-auto">
            <tbody>
              <tr>
                <th>{shapeData.length.name}</th>
                <td>{shapeData.length.value}</td>
              </tr>
              <tr>
                <th>{shapeData.area.name}</th>
                <td>{shapeData.area.value}</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Евклідові перетоврення
            </h2>
            <button className="btn btn-xs btn-ghost" onClick={resetEuclid}>
              Скинути
            </button>
          </div>
          <fieldset disabled={addConstToggle} className="flex flex-col">
            {euclideanRows}
          </fieldset>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Додаткові конструкції
            </h2>
            <input
              type="checkbox"
              className="toggle toggle-info toggle-xs"
              checked={addConstToggle}
              onChange={handleAddConstToggle}
            />
          </div>
          <fieldset disabled={!addConstToggle} className="flex flex-col">
            <label className="items-center gap-4 join">
              <span className="text-sm">Точка</span>
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
                className="range range-xs"
              />
            </label>
          </fieldset>
          <div className="items-end gap-2 join join-vertical">
            <span className="items-center gap-2 text-xs join">
              Дотична<span className="badge badge-error"></span>
            </span>
            <span className="items-center gap-2 text-xs join">
              Нормаль<span className="badge badge-success"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SceneTwo;
