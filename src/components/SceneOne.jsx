import { log } from "mathjs";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// drawing functions
function drawLines(figure, lineMaterial, points) {
  // bone shape
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.a.x, points.a.y),
        new THREE.Vector2(points.b.x, points.b.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.b.x, points.b.y),
        new THREE.Vector2(points.c.x, points.c.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.c.x, points.c.y),
        new THREE.Vector2(points.d.x, points.d.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.d.x, points.d.y),
        new THREE.Vector2(points.e.x, points.e.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.e.x, points.e.y),
        new THREE.Vector2(points.f.x, points.f.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.f.x, points.f.y),
        new THREE.Vector2(points.a.x, points.a.y),
      ]),
      lineMaterial
    )
  );
}
function drawCircles(figure, lineMaterial, circles) {
  for (const circle of Object.values(circles)) {
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(circle.points),
        lineMaterial
      )
    );
  }
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

function SceneOne() {
  // data
  const pointsDefault = {
    a: {
      x: 0,
      y: 4.5,
      xRef: useRef(),
      yRef: useRef(),
    },
    b: {
      x: -4,
      y: 3,
      xRef: useRef(),
      yRef: useRef(),
    },
    c: {
      x: -4,
      y: -3,
      xRef: useRef(),
      yRef: useRef(),
    },
    d: {
      x: 0,
      y: -4.5,
      xRef: useRef(),
      yRef: useRef(),
    },
    e: {
      x: 4,
      y: -3,
      xRef: useRef(),
      yRef: useRef(),
    },
    f: {
      x: 4,
      y: 3,
      xRef: useRef(),
      yRef: useRef(),
    },
  };
  const circlesDefault = {
    g: {
      x: 0,
      y: 0,
      r: 2,
      aS: 0,
      aE: 2 * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    h: {
      x: 0,
      y: 4.5,
      r: 1,
      aS: ((360 - 20) / 180) * Math.PI,
      aE: ((90 - 70 + 180) / 180) * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    i: {
      x: -4,
      y: -3,
      r: 2,
      aS: (1 / 2) * Math.PI,
      aE: ((90 + 70 + 180) / 180) * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    j: {
      x: 0,
      y: -4.5,
      r: 1,
      aS: ((180 - 20) / 180) * Math.PI,
      aE: ((180 + 20 + 180) / 180) * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    k: {
      x: 4,
      y: -3,
      r: 2,
      aS: ((20 + 180) / 180) * Math.PI,
      aE: (1 / 2) * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
  };
  const paramsDefault = {
    euclidean: {
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
    },
    affine: {
      x: {
        x: {
          value: 1,
          ref: useRef(),
        },
        y: {
          value: 0,
          ref: useRef(),
        },
        o: {
          value: 0,
          ref: useRef(),
        },
      },
      y: {
        x: {
          value: 0,
          ref: useRef(),
        },
        y: {
          value: 1,
          ref: useRef(),
        },
        o: {
          value: 0,
          ref: useRef(),
        },
      },
    },
    projective: {
      x: {
        x: {
          value: 100,
          ref: useRef(),
        },
        y: {
          value: 90,
          ref: useRef(),
        },
        o: {
          value: 0,
          ref: useRef(),
        },
      },
      y: {
        x: {
          value: 40,
          ref: useRef(),
        },
        y: {
          value: 100,
          ref: useRef(),
        },
        o: {
          value: 0,
          ref: useRef(),
        },
      },
      w: {
        x: {
          value: 1,
          ref: useRef(),
        },
        y: {
          value: 1,
          ref: useRef(),
        },
        o: {
          value: 180,
          ref: useRef(),
        },
      },
    },
  };
  // refs and states
  const canvasRef = useRef();
  const [points, setPoints] = useState(pointsDefault);
  const [circles, setCircles] = useState(circlesDefault);
  const [params, setParams] = useState(paramsDefault);
  const [projectiveToggle, setProjectiveToggle] = useState(false);
  // dom elements with refs
  const pointRows = Object.entries(points).map(([key, value]) => {
    return (
      <tr key={key}>
        <th>{key.toUpperCase()}</th>
        <td>
          <input
            type="number"
            placeholder={value.x}
            defaultValue={value.x}
            className="input input-xs"
            ref={value.xRef}
            onChange={(e) =>
              setPoints({
                ...points,
                [key]: {
                  ...points[key],
                  x: ~~e.target.value || ~~e.target.defaultValue,
                },
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder={value.y}
            defaultValue={value.y}
            className="input input-xs"
            ref={value.yRef}
            onChange={(e) =>
              setPoints({
                ...points,
                [key]: {
                  ...points[key],
                  y: ~~e.target.value || ~~e.target.defaultValue,
                },
              })
            }
          />
        </td>
      </tr>
    );
  });
  const circlesRows = Object.entries(circles).map(([key, value]) => {
    return (
      <tr key={key}>
        <th>{key.toUpperCase()}</th>
        <td>
          <input
            type="number"
            placeholder={value.x}
            defaultValue={value.x}
            className="input input-xs"
            ref={value.xRef}
            onChange={(e) =>
              setCircles({
                ...circles,
                [key]: {
                  ...circles[key],
                  x: e.target.value
                    ? ~~e.target.value
                    : ~~e.target.defaultValue,
                },
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder={value.y}
            defaultValue={value.y}
            className="input input-xs"
            ref={value.yRef}
            onChange={(e) =>
              setCircles({
                ...circles,
                [key]: {
                  ...circles[key],
                  y: e.target.value
                    ? ~~e.target.value
                    : ~~e.target.defaultValue,
                },
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder={value.r}
            defaultValue={value.r}
            className="input input-xs"
            ref={value.rRef}
            onChange={(e) =>
              setCircles({
                ...circles,
                [key]: {
                  ...circles[key],
                  r: +e.target.value || +e.target.defaultValue,
                },
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder={value.aS}
            defaultValue={value.aS}
            className="input input-xs"
            ref={value.aSRef}
            onChange={(e) =>
              setCircles({
                ...circles,
                [key]: {
                  ...circles[key],
                  aS: +e.target.value || +e.target.defaultValue,
                },
              })
            }
          />
        </td>
        <td>
          <input
            type="number"
            placeholder={value.aE}
            defaultValue={value.aE}
            className="input input-xs"
            ref={value.aERef}
            onChange={(e) =>
              setCircles({
                ...circles,
                [key]: {
                  ...circles[key],
                  aE: +e.target.value || +e.target.defaultValue,
                },
              })
            }
          />
        </td>
      </tr>
    );
  });
  const euclideanRows = Object.entries(params.euclidean).map(
    ([name, object]) => {
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
                  <span className="indicator-item badge badge-secondary badge-xs">
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
                    setParams({
                      ...params,
                      euclidean: {
                        ...params.euclidean,
                        [name]: {
                          ...params.euclidean[name],
                          [key]: {
                            ...params.euclidean[name][key],
                            value: e.target.value
                              ? ~~e.target.value
                              : ~~e.target.defaultValue,
                          },
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
    }
  );
  const affineRows = Object.entries(params.affine).map(([key, value]) => {
    return (
      <div className="form-control" key={key}>
        <label className="label">
          <span className="label-text">
            Вектор {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        </label>
        <div className="gap-6 join">
          {Object.entries(value).map(([k, v]) => {
            return (
              <div className="join" key={k}>
                <div className="indicator ">
                  <span className="indicator-item badge badge-secondary badge-xs">
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                </div>

                <input
                  type="number"
                  placeholder={v.value}
                  defaultValue={v.value}
                  ref={v.ref}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      affine: {
                        ...params.affine,
                        [key]: {
                          ...params.affine[key],
                          [k]: {
                            ...params.affine[key][k],
                            value: e.target.value
                              ? ~~e.target.value
                              : ~~e.target.defaultValue,
                          },
                        },
                      },
                    })
                  }
                  className="w-full input input-xs"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  const projectiveRows = Object.entries(params.projective).map(
    ([key, value]) => {
      return (
        <div className="form-control" key={key}>
          <label className="label">
            <span className="label-text">
              Вектор {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </label>
          <div className="gap-6 join">
            {Object.entries(value).map(([k, v]) => {
              return (
                <div className="join" key={k}>
                  <div className="indicator ">
                    <span className="indicator-item badge badge-secondary badge-xs">
                      {key.toUpperCase() + k}
                    </span>
                  </div>
                  <input
                    type="number"
                    placeholder={v.value}
                    defaultValue={v.value}
                    ref={v.ref}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        projective: {
                          ...params.projective,
                          [key]: {
                            ...params.projective[key],
                            [k]: {
                              ...params.projective[key][k],
                              value: e.target.value
                                ? ~~e.target.value
                                : ~~e.target.defaultValue,
                            },
                          },
                        },
                      })
                    }
                    className="w-full input input-xs"
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  );
  // reset functions
  const resetPoints = () => {
    setPoints(pointsDefault);
    for (const point of Object.values(points)) {
      point.xRef.current.value = point.xRef.current.defaultValue;
      point.yRef.current.value = point.yRef.current.defaultValue;
    }
  };
  const resetCircles = () => {
    setCircles(circlesDefault);
    for (const circle of Object.values(circles)) {
      circle.xRef.current.value = circle.xRef.current.defaultValue;
      circle.yRef.current.value = circle.yRef.current.defaultValue;
      circle.rRef.current.value = circle.rRef.current.defaultValue;
      circle.aSRef.current.value = circle.aSRef.current.defaultValue;
      circle.aERef.current.value = circle.aERef.current.defaultValue;
    }
  };
  const resetEuTrans = () => {
    setParams(paramsDefault);
    for (const param of Object.values(params)) {
      for (const setting of Object.values(param)) {
        for (const p of Object.values(setting)) {
          p.ref.current.value = p.ref.current.defaultValue;
        }
      }
    }
  };
  const resetAfTrans = () => {
    setParams(paramsDefault);
    for (const param of Object.values(params.affine)) {
      for (const setting of Object.values(param)) {
        setting.ref.current.value = setting.ref.current.defaultValue;
      }
    }
  };
  const resetPrTrans = () => {
    setParams(paramsDefault);
    for (const param of Object.values(params.projective)) {
      for (const setting of Object.values(param)) {
        setting.ref.current.value = setting.ref.current.defaultValue;
      }
    }
  };
  // calc new points based on matrixes
  const calcPoints = (gridPoints) => {
    let pointsLocal = { ...points };
    let gridLocal = { ...gridPoints };
    let circlesLocal = {};
    for (const [key, value] of Object.entries(circles)) {
      let points = new THREE.EllipseCurve(
        value.x, // ax
        value.y, // aY
        value.r, // xRadius
        value.r, // yRadius
        value.aS, // aStartAngle
        value.aE, // aEndAngle
        false, // aClockwise
        0 // aRotation
      ).getPoints(50);
      circlesLocal[key] = {
        points,
      };
    }
    let ms;
    if (projectiveToggle) {
      ms = [
        // Euclidean offset
        [
          [1, 0, 0],
          [0, 1, 0],
          [params.euclidean.offset.x.value, params.euclidean.offset.y.value, 1],
        ],
        // Euclidean rotation
        [
          [
            Math.cos(params.euclidean.rotation.angle.value),
            Math.sin(params.euclidean.rotation.angle.value),
            0,
          ],
          [
            -Math.sin(params.euclidean.rotation.angle.value),
            Math.cos(params.euclidean.rotation.angle.value),
            0,
          ],
          [
            -params.euclidean.rotation.x.value *
              (Math.cos(params.euclidean.rotation.angle.value) - 1) +
              params.euclidean.rotation.y.value *
                Math.sin(params.euclidean.rotation.angle.value),
            -params.euclidean.rotation.x.value *
              Math.sin(params.euclidean.rotation.angle.value) -
              params.euclidean.rotation.y.value *
                (Math.cos(params.euclidean.rotation.angle.value) - 1),
            1,
          ],
        ],
        // Euclidean scale
        [
          [params.euclidean.scale.x.value, 0, 0],
          [0, params.euclidean.scale.y.value, 0],
          [0, 0, 1],
        ],
        // Affine
        [
          [params.affine.x.x.value, params.affine.y.x.value, 0],
          [params.affine.x.y.value, params.affine.y.y.value, 0],
          [params.affine.x.o.value, params.affine.y.o.value, 1],
        ],
        // Projective
        [
          [
            params.projective.x.x.value * params.projective.w.x.value,
            params.projective.y.x.value * params.projective.w.x.value,
            params.projective.w.x.value,
          ],
          [
            params.projective.x.y.value * params.projective.w.y.value,
            params.projective.y.y.value * params.projective.w.y.value,
            params.projective.w.y.value,
          ],
          [
            params.projective.x.o.value * params.projective.w.o.value,
            params.projective.y.o.value * params.projective.w.o.value,
            params.projective.w.o.value,
          ],
        ],
      ];
    } else {
      ms = [
        // Euclidean offset
        [
          [1, 0, 0],
          [0, 1, 0],
          [params.euclidean.offset.x.value, params.euclidean.offset.y.value, 1],
        ],
        // Euclidean rotation
        [
          [
            Math.cos(params.euclidean.rotation.angle.value),
            Math.sin(params.euclidean.rotation.angle.value),
            0,
          ],
          [
            -Math.sin(params.euclidean.rotation.angle.value),
            Math.cos(params.euclidean.rotation.angle.value),
            0,
          ],
          [
            -params.euclidean.rotation.x.value *
              (Math.cos(params.euclidean.rotation.angle.value) - 1) +
              params.euclidean.rotation.y.value *
                Math.sin(params.euclidean.rotation.angle.value),
            -params.euclidean.rotation.x.value *
              Math.sin(params.euclidean.rotation.angle.value) -
              params.euclidean.rotation.y.value *
                (Math.cos(params.euclidean.rotation.angle.value) - 1),
            1,
          ],
        ],
        // Euclidean scale
        [
          [params.euclidean.scale.x.value, 0, 0],
          [0, params.euclidean.scale.y.value, 0],
          [0, 0, 1],
        ],
        // Affine
        [
          [params.affine.x.x.value, params.affine.y.x.value, 0],
          [params.affine.x.y.value, params.affine.y.y.value, 0],
          [params.affine.x.o.value, params.affine.y.o.value, 1],
        ],
        // Projective
        // [
        //   [
        //     params.projective.x.x.value * params.projective.w.x.value,
        //     params.projective.y.x.value * params.projective.w.x.value,
        //     params.projective.w.x.value
        //   ],
        //   [
        //     params.projective.x.y.value * params.projective.w.y.value,
        //     params.projective.y.y.value * params.projective.w.y.value,
        //     params.projective.w.y.value
        //   ],
        //   [
        //     params.projective.x.o.value * params.projective.w.o.value,
        //     params.projective.y.o.value * params.projective.w.o.value,
        //     params.projective.w.o.value
        //   ],
        // ],
      ];
    }

    for (let [key, point] of Object.entries(pointsLocal)) {
      const value = { ...point };
      for (const m of ms) {
        let x =
          (value.x * m[0][0] + value.y * m[1][0] + m[2][0]) /
          (value.x * m[0][2] + value.y * m[1][2] + m[2][2]);
        let y =
          (value.x * m[0][1] + value.y * m[1][1] + m[2][1]) /
          (value.x * m[0][2] + value.y * m[1][2] + m[2][2]);

        value.x = x;
        value.y = y;
        if (x == NaN || y == NaN) console.error("Point NaN");
      }
      pointsLocal = {
        ...pointsLocal,
        [key]: {
          ...pointsLocal[key],
          x: value.x,
          y: value.y,
        },
      };
    }
    for (let [key, circle] of Object.entries(circlesLocal)) {
      let points = [];
      for (let value of circle.points) {
        for (const m of ms) {
          let x =
            (value.x * m[0][0] + value.y * m[1][0] + m[2][0]) /
            (value.x * m[0][2] + value.y * m[1][2] + m[2][2]);
          let y =
            (value.x * m[0][1] + value.y * m[1][1] + m[2][1]) /
            (value.x * m[0][2] + value.y * m[1][2] + m[2][2]);

          value.x = x;
          value.y = y;
          if (x == NaN || y == NaN) console.error("Circle NaN");
        }
        points.push(new THREE.Vector2(value.x, value.y));
      }
      circlesLocal = {
        ...circlesLocal,
        [key]: {
          points,
        },
      };
    }

    // calculation for grid
    if (projectiveToggle) {
      ms = [
        // Affine
        [
          [params.affine.x.x.value, params.affine.y.x.value, 0],
          [params.affine.x.y.value, params.affine.y.y.value, 0],
          [params.affine.x.o.value, params.affine.y.o.value, 1],
        ],
        // Projective
        [
          [
            params.projective.x.x.value * params.projective.w.x.value,
            params.projective.y.x.value * params.projective.w.x.value,
            params.projective.w.x.value,
          ],
          [
            params.projective.x.y.value * params.projective.w.y.value,
            params.projective.y.y.value * params.projective.w.y.value,
            params.projective.w.y.value,
          ],
          [
            params.projective.x.o.value * params.projective.w.o.value,
            params.projective.y.o.value * params.projective.w.o.value,
            params.projective.w.o.value,
          ],
        ],
      ];
    } else {
      ms = [
        // Affine
        [
          [params.affine.x.x.value, params.affine.y.x.value, 0],
          [params.affine.x.y.value, params.affine.y.y.value, 0],
          [params.affine.x.o.value, params.affine.y.o.value, 1],
        ],
        // Projective
        // [
        //   [
        //     params.projective.x.x.value * params.projective.w.x.value,
        //     params.projective.y.x.value * params.projective.w.x.value,
        //     params.projective.w.x.value
        //   ],
        //   [
        //     params.projective.x.y.value * params.projective.w.y.value,
        //     params.projective.y.y.value * params.projective.w.y.value,
        //     params.projective.w.y.value
        //   ],
        //   [
        //     params.projective.x.o.value * params.projective.w.o.value,
        //     params.projective.y.o.value * params.projective.w.o.value,
        //     params.projective.w.o.value
        //   ],
        // ],
      ];
    }

    for (const valueS of Object.values(gridLocal)) {
      let value = Array.from(valueS);
      for (const m of ms) {
        let x1 =
          (value[0][0] * m[0][0] + value[0][1] * m[1][0] + m[2][0]) /
          (value[0][0] * m[0][2] + value[0][1] * m[1][2] + m[2][2]);
        let y1 =
          (value[0][0] * m[0][1] + value[0][1] * m[1][1] + m[2][1]) /
          (value[0][0] * m[0][2] + value[0][1] * m[1][2] + m[2][2]);

        value[0][0] = x1;
        value[0][1] = y1;

        let x2 =
          (value[1][0] * m[0][0] + value[1][1] * m[1][0] + m[2][0]) /
          (value[1][0] * m[0][2] + value[1][1] * m[1][2] + m[2][2]);
        let y2 =
          (value[1][0] * m[0][1] + value[1][1] * m[1][1] + m[2][1]) /
          (value[1][0] * m[0][2] + value[1][1] * m[1][2] + m[2][2]);

        value[1][0] = x2;
        value[1][1] = y2;
        if (x1 == NaN || y1 == NaN) console.error("Grid1 NaN");
        if (x2 == NaN || y2 == NaN) console.error("Grid2 NaN");
      }
    }

    return [pointsLocal, circlesLocal, gridLocal];
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
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x900990,
      linewidth: 2,
    });

    // calc new points
    const [pointsCalc, circlesCalc, gridCalc] = calcPoints(calcGrid(15));

    const grid = new THREE.Group();
    // adding elements to the figure
    drawGrid(grid, gridCalc);
    grid.position.z -= 0.001;
    drawLines(figure, lineMaterial, pointsCalc);
    drawCircles(figure, lineMaterial, circlesCalc);

    // adding figure to the scene
    scene.add(grid);
    scene.add(figure);

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
    };
  }, [points, circles, params, projectiveToggle]);

  return (
    <div className="grid items-center justify-center grid-cols-1 gap-2 place-items-center">
      <div className="max-w-md aspect-square">
        <canvas ref={canvasRef} className="!w-full !h-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-md">Евклідові перетворення</h2>
            <button className="btn btn-xs btn-ghost" onClick={resetEuTrans}>
              Скинути
            </button>
          </div>
          <div className="flex flex-col">{euclideanRows}</div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-md">Афінні перетворення</h2>
            <button className="btn btn-xs btn-ghost" onClick={resetAfTrans}>
              Скинути
            </button>
          </div>
          <div className="flex flex-col">{affineRows}</div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-md">Проективні перетворення</h2>
            <input
              type="checkbox"
              className="toggle toggle-xs toggle-secondary"
              checked={projectiveToggle}
              onChange={() => setProjectiveToggle(!projectiveToggle)}
            />
            <button className="btn btn-xs btn-ghost" onClick={resetPrTrans}>
              Скинути
            </button>
          </div>
          <div className="flex flex-col">{projectiveRows}</div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-md">Параметри точок фігури</h2>
            <button className="btn btn-xs btn-ghost" onClick={resetPoints}>
              Скинути
            </button>
          </div>
          <div className="overflow-x-auto h-60 md:h-48">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Точка</th>
                  <th>X</th>
                  <th>Y</th>
                </tr>
              </thead>
              <tbody>{pointRows}</tbody>
            </table>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-md">Параметри кіл фігури</h2>
            <button className="btn btn-xs btn-ghost" onClick={resetCircles}>
              Скинути
            </button>
          </div>
          <div className="overflow-x-auto h-60 md:h-48">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Коло</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>Радіус</th>
                  <th>Початковий кут</th>
                  <th>Кунцевий кут</th>
                </tr>
              </thead>
              <tbody>{circlesRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SceneOne;
