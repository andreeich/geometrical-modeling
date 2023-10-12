import React, { useRef, useEffect, useState } from "react";
import paperFull from "paper";
// import { PaperContainer } from "@psychobolt/react-paperjs/dist/index.dev";

function drawFigure(paper, points, circles) {
  // lines
  new paper.Path.Line([points.a.x, points.a.y], [points.b.x, points.b.y]);
  new paper.Path.Line([points.c.x, points.c.y], [points.d.x, points.d.y]);
  new paper.Path.Line([points.d.x, points.d.y], [points.e.x, points.e.y]);
  new paper.Path.Line([points.f.x, points.f.y], [points.g.x, points.g.y]);
  new paper.Path.Line([points.h.x, points.h.y], [points.i.x, points.i.y]);
  new paper.Path.Line([points.i.x, points.i.y], [points.j.x, points.j.y]);
  new paper.Path.Line([points.k.x, points.k.y], [points.l.x, points.l.y]);
  new paper.Path.Line([points.l.x, points.l.y], [points.m.x, points.m.y]);
  new paper.Path.Line([points.m.x, points.m.y], [points.n.x, points.n.y]);
  new paper.Path.Line([points.n.x, points.n.y], [points.o.x, points.o.y]);
  new paper.Path.Line([points.p.x, points.p.y], [points.q.x, points.q.y]);
  new paper.Path.Line([points.q.x, points.q.y], [points.r.x, points.r.y]);
  new paper.Path.Line([points.r.x, points.r.y], [points.s.x, points.s.y]);
  new paper.Path.Line([points.s.x, points.s.y], [points.t.x, points.t.y]);
  new paper.Path.Line([points.t.x, points.t.y], [points.k.x, points.k.y]);
  // circles
  new paper.Path.Arc(getArcInfo(circles.u));
  new paper.Path.Arc(getArcInfo(circles.v));
  new paper.Path.Arc(getArcInfo(circles.w));
  new paper.Path.Arc(getArcInfo(circles.x));
  new paper.Path.Arc(getArcInfo(circles.y));
  new paper.Path.Arc(getArcInfo(circles.z));
}
function getArcInfo(circle) {
  return {
    from: {
      x: circle.x + Math.cos(circle.aS) * circle.r,
      y: circle.y + Math.sin(circle.aS) * circle.r,
    },
    through: {
      x: circle.x + Math.cos((circle.aE - circle.aS) / 2) * circle.r,
      y: circle.y + Math.sin((circle.aE - circle.aS) / 2) * circle.r,
    },
    to: {
      x: circle.x + Math.cos(circle.aE) * circle.r,
      y: circle.y + Math.sin(circle.aE) * circle.r,
    },
  };
}

// function drawText(figure, points, circles) {
//   for (const [key, value] of Object.entries(points)) {
//     const loader = new FontLoader();
//     const font = loader.parse(regularFontJson);

//     let text = new THREE.Mesh(
//       new TextGeometry(key.toLocaleUpperCase(), {
//         font,
//         size: 0.3,
//         height: 0,
//       }),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//       })
//     );
//     text.position.set(value.x + 0.1, value.y + 0.1);
//     figure.add(text);
//   }
//   for (const [key, value] of Object.entries(circles)) {
//     const loader = new FontLoader();
//     const font = loader.parse(regularFontJson);

//     let text = new THREE.Mesh(
//       new TextGeometry(key.toLocaleUpperCase(), {
//         font,
//         size: 0.3,
//         height: 0,
//       }),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//       })
//     );
//     switch (key) {
//       case "y": {
//         text.position.set(value.x - 0.4, value.y - 0.4);
//         break;
//       }
//       case "z": {
//         text.position.set(value.x + 0.1, value.y + 0.1);
//         break;
//       }
//       default: {
//         text.position.set(value.x, value.y);
//       }
//     }
//     figure.add(text);
//   }
// }

function drawAxes(paper, size) {
  // drawing axes
  // y
  new paper.Path.Line(
    [0, Math.floor(size / 2) + 1],
    [0, -Math.floor(size / 2) - 1]
  );
  // x
  new paper.Path.Line(
    [Math.floor(size / 2) + 1, 0],
    [-Math.floor(size / 2) - 1, 0]
  );
  // drawing arrows
  // y
  new paper.Path.Line(
    [0, Math.floor(size / 2) + 1],
    [0.3, Math.floor(size / 2) + 1 - 0.3]
  );
  new paper.Path.Line(
    [0, Math.floor(size / 2) + 1],
    [-0.3, Math.floor(size / 2) + 1 - 0.3]
  );
  // x
  new paper.Path.Line(
    [Math.floor(size / 2) + 1, 0],
    [Math.floor(size / 2) + 1 - 0.3, 0.3]
  );
  new paper.Path.Line(
    [Math.floor(size / 2) + 1, 0],
    [Math.floor(size / 2) + 1 - 0.3, -0.3]
  );
  // drawing axis's names
}
function drawGrid(paper, size) {
  // drawing a grid
  for (let i = 0; i < size; i++) {
    new paper.Path.Line(
      [-Math.floor(size / 2) + i, Math.floor(size / 2)],
      [-Math.floor(size / 2) + i, -Math.floor(size / 2)]
    );
    new paper.Path.Line(
      [Math.floor(size / 2), -Math.floor(size / 2) + i],
      [-Math.floor(size / 2), -Math.floor(size / 2) + i]
    );
  }
}

function Scene() {
  const canvasRef = useRef();
  // data storage
  const pointsDefault = {
    a: {
      x: 2,
      y: 2,
      xRef: useRef(),
      yRef: useRef(),
    },
    b: {
      x: -2,
      y: 2,
      xRef: useRef(),
      yRef: useRef(),
    },
    c: {
      x: -4 - Math.sqrt(3),
      y: 1,
      xRef: useRef(),
      yRef: useRef(),
    },
    d: {
      x: -2 - Math.sqrt(3),
      y: 0,
      xRef: useRef(),
      yRef: useRef(),
    },
    e: {
      x: -4 - Math.sqrt(3),
      y: -1,
      xRef: useRef(),
      yRef: useRef(),
    },
    f: {
      x: -2,
      y: -2,
      xRef: useRef(),
      yRef: useRef(),
    },
    g: {
      x: 2,
      y: -2,
      xRef: useRef(),
      yRef: useRef(),
    },
    h: {
      x: 4 + Math.sqrt(3),
      y: -1,
      xRef: useRef(),
      yRef: useRef(),
    },
    i: {
      x: 2 + Math.sqrt(3),
      y: 0,
      xRef: useRef(),
      yRef: useRef(),
    },
    j: {
      x: 4 + Math.sqrt(3),
      y: 1,
      xRef: useRef(),
      yRef: useRef(),
    },
    k: {
      x: -4 - Math.sqrt(3),
      y: 5,
      xRef: useRef(),
      yRef: useRef(),
    },
    l: {
      x: -5 - Math.sqrt(3),
      y: 3,
      xRef: useRef(),
      yRef: useRef(),
    },
    m: {
      x: -5 - Math.sqrt(3),
      y: -3,
      xRef: useRef(),
      yRef: useRef(),
    },
    n: {
      x: -4 - Math.sqrt(3),
      y: -5,
      xRef: useRef(),
      yRef: useRef(),
    },
    o: {
      x: -3,
      y: -5,
      xRef: useRef(),
      yRef: useRef(),
    },
    p: {
      x: 3,
      y: -5,
      xRef: useRef(),
      yRef: useRef(),
    },
    q: {
      x: 4 + Math.sqrt(3),
      y: -5,
      xRef: useRef(),
      yRef: useRef(),
    },
    r: {
      x: 5 + Math.sqrt(3),
      y: -3,
      xRef: useRef(),
      yRef: useRef(),
    },
    s: {
      x: 5 + Math.sqrt(3),
      y: 3,
      xRef: useRef(),
      yRef: useRef(),
    },
    t: {
      x: 4 + Math.sqrt(3),
      y: 5,
      xRef: useRef(),
      yRef: useRef(),
    },
  };
  const circlesDefault = {
    u: {
      x: -2 - Math.sqrt(3),
      y: 1,
      r: 2,
      aS: (30 / 180) * Math.PI,
      aE: Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    v: {
      x: -2 - Math.sqrt(3),
      y: -1,
      r: 2,
      aS: Math.PI,
      aE: (-30 / 180) * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    w: {
      x: 2 + Math.sqrt(3),
      y: -1,
      r: 2,
      aS: (210 / 180) * Math.PI,
      aE: 0,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    x: {
      x: 2 + Math.sqrt(3),
      y: 1,
      r: 2,
      aS: 0,
      aE: (150 / 180) * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    y: {
      x: 0,
      y: -5,
      r: 2,
      aS: 0,
      aE: 2 * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
    z: {
      x: 0,
      y: -5,
      r: 3,
      aS: -Math.PI,
      aE: 2 * Math.PI,
      xRef: useRef(),
      yRef: useRef(),
      rRef: useRef(),
      aSRef: useRef(),
      aERef: useRef(),
    },
  };

  const [points, setPoints] = useState(pointsDefault);
  const [circles, setCircles] = useState(circlesDefault);

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
              setCircles({
                ...circles,
                [key]: {
                  ...circles[key],
                  y: ~~e.target.value || ~~e.target.defaultValue,
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
                  r: ~~e.target.value || ~~e.target.defaultValue,
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
                  aS: ~~e.target.value || ~~e.target.defaultValue,
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
                  aE: ~~e.target.value || ~~e.target.defaultValue,
                },
              })
            }
          />
        </td>
      </tr>
    );
  });

  // setting parameters for transformation
  const paramsDefault = {
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
    },
    vectors: {
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
      w: {
        x: {
          value: 0,
          ref: useRef(),
        },
        y: {
          value: 0,
          ref: useRef(),
        },
        o: {
          value: 1,
          ref: useRef(),
        },
      },
    },
  };

  const [params, setParams] = useState(paramsDefault);

  const offsetRows = Object.entries(params.offset).map(([key, value]) => {
    return (
      <label className="input-group input-group-xs" key={key}>
        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <input
          type="number"
          placeholder={value.value}
          defaultValue={value.value}
          ref={value.ref}
          onChange={(e) =>
            setParams({
              ...params,
              offset: {
                ...params.offset,
                [key]: {
                  ...params.offset[key],
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
    );
  });
  const rotationRows = Object.entries(params.rotation).map(([key, value]) => {
    return (
      <label className="input-group input-group-xs" key={key}>
        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <input
          type="number"
          placeholder={value.value}
          defaultValue={value.value}
          ref={value.ref}
          onChange={(e) =>
            setParams({
              ...params,
              rotation: {
                ...params.rotation,
                [key]: {
                  ...params.rotation[key],
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
    );
  });
  const vectorsRows = Object.entries(params.vectors).map(([key, value]) => {
    return (
      <div className="form-control" key={key}>
        <label className="label">
          <span className="label-text">
            {key.charAt(0).toUpperCase() + key.slice(1)} Vector
          </span>
        </label>
        <div className="gap-2 join">
          {Object.entries(value).map(([k, v]) => {
            return (
              <label className="input-group input-group-xs" key={k}>
                <span>{k.charAt(0).toUpperCase() + k.slice(1)}</span>
                <input
                  type="number"
                  placeholder={v.value}
                  defaultValue={v.value}
                  ref={v.ref}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      vectors: {
                        ...params.vectors,
                        [key]: {
                          ...params.vectors[key],
                          [k]: {
                            ...params.vectors[key][k],
                            value: e.target.value
                              ? ~~e.target.value
                              : ~~e.target.defaultValue,
                          },
                        },
                      },
                    })
                  }
                  className="w-full input input-xs input-bordered"
                />
              </label>
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
              {key.charAt(0).toUpperCase() + key.slice(1)} Vector
            </span>
          </label>
          <div className="gap-2 join">
            {Object.entries(value).map(([k, v]) => {
              return (
                <label className="input-group input-group-xs" key={k}>
                  <span>{key.toUpperCase() + k}</span>
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
                    className="w-full input input-xs input-bordered"
                  />
                </label>
              );
            })}
          </div>
        </div>
      );
    }
  );

  const resetPoints = () => {
    // setPoints(pointsDefault);
    // for (const point of Object.values(points)) {
    //   point.xRef.current.value = point.xRef.current.defaultValue;
    //   point.yRef.current.value = point.yRef.current.defaultValue;
    // }
  };
  const resetCircles = () => {
    // setCircles(circlesDefault);
    // for (const circle of Object.values(circles)) {
    //   circle.xRef.current.value = circle.xRef.current.defaultValue;
    //   circle.yRef.current.value = circle.yRef.current.defaultValue;
    //   circle.rRef.current.value = circle.rRef.current.defaultValue;
    //   circle.aSRef.current.value = circle.aSRef.current.defaultValue;
    //   circle.aERef.current.value = circle.aERef.current.defaultValue;
    // }
  };
  const resetEuTrans = () => {
    // setParams(paramsDefault);
    // for (const [key, param] of Object.entries(params)) {
    //   if (!(key == "offset" || key == "rotation")) continue;
    //   for (const setting of Object.values(param)) {
    //     setting.ref.current.value = setting.ref.current.defaultValue;
    //   }
    // }
  };
  const resetAfTrans = () => {
    // setParams(paramsDefault);
    // for (const param of Object.values(params.vectors)) {
    //   for (const setting of Object.values(param)) {
    //     setting.ref.current.value = setting.ref.current.defaultValue;
    //   }
    // }
  };
  const resetPrTrans = () => {
    // setParams(paramsDefault);
    // for (const param of Object.values(params.projective)) {
    //   for (const setting of Object.values(param)) {
    //     setting.ref.current.value = setting.ref.current.defaultValue;
    //   }
    // }
  };

  useEffect(() => {
      const paper = paperFull.setup(canvasRef.current);
      paper.project.currentStyle = {
        strokeColor: "#D7D8DA",
        strokeWidth: 0.05,
      };
      const gridSize = 15;
      drawGrid(paper, gridSize);
      paper.project.currentStyle = {
        strokeColor: "#1B4F72",
        strokeWidth: 0.06,
      };
      drawAxes(paper, gridSize);
      paper.project.currentStyle = {
        strokeColor: "#3498DB",
        strokeWidth: 0.08,
      };
      drawFigure(paper, points, circles);

      // paper.view.center = [8,-8];
      // paper.view.scaling = [15, -15];
      paper.view.draw();
      // paper.project.activeLayer.children[0].rotate(10)
  }, [points]);

  return (
    <div className="grid items-start justify-center grid-cols-1 gap-2 md:grid-cols-2">
      <div className="top-16 md:sticky aspect-square">
        <canvas ref={canvasRef} className="!w-full !h-full" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Setting Line Points
            </h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetPoints}
            >
              Reset
            </button>
          </div>
          <div className="overflow-x-auto h-60 md:h-48">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Point</th>
                  <th>X coordinate</th>
                  <th>Y coordinate</th>
                </tr>
              </thead>
              <tbody>{pointRows}</tbody>
            </table>
          </div>
        </div>
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">Setting Circles</h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetCircles}
            >
              Reset
            </button>
          </div>
          <div className="overflow-x-auto h-60 md:h-48">
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Circle</th>
                  <th>X coordinate</th>
                  <th>Y coordinate</th>
                  <th>Radius</th>
                  <th>Start Angle</th>
                  <th>End Angle</th>
                </tr>
              </thead>
              <tbody>{circlesRows}</tbody>
            </table>
          </div>
        </div>
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Euclidean Transformation
            </h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetEuTrans}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Offset</span>
              </label>
              <div className="gap-2 join join-vertical">{offsetRows}</div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rotation</span>
              </label>
              <div className="gap-2 join join-vertical">{rotationRows}</div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Affine Transformation
            </h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetAfTrans}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col">{vectorsRows}</div>
        </div>
        <div className="p-4 space-y-2 border rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-center">
              Projective Transformation
            </h2>
            <button
              className="px-2 py-1 text-xs transition-shadow border rounded-md shadow active:shadow-none"
              onClick={resetPrTrans}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col">{projectiveRows}</div>
        </div>
      </div>
    </div>
  );
}

export default Scene;
