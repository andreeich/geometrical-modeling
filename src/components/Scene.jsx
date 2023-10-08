import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import regularFontJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import boldFontJson from "three/examples/fonts/helvetiker_bold.typeface.json";

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
        new THREE.Vector2(points.f.x, points.f.y),
        new THREE.Vector2(points.g.x, points.g.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.h.x, points.h.y),
        new THREE.Vector2(points.i.x, points.i.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.i.x, points.i.y),
        new THREE.Vector2(points.j.x, points.j.y),
      ]),
      lineMaterial
    )
  );
  // back shape
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.k.x, points.k.y),
        new THREE.Vector2(points.l.x, points.l.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.l.x, points.l.y),
        new THREE.Vector2(points.m.x, points.m.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.m.x, points.m.y),
        new THREE.Vector2(points.n.x, points.n.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.n.x, points.n.y),
        new THREE.Vector2(points.o.x, points.o.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.p.x, points.p.y),
        new THREE.Vector2(points.q.x, points.q.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.q.x, points.q.y),
        new THREE.Vector2(points.r.x, points.r.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.r.x, points.r.y),
        new THREE.Vector2(points.s.x, points.s.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.s.x, points.s.y),
        new THREE.Vector2(points.t.x, points.t.y),
      ]),
      lineMaterial
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(points.t.x, points.t.y),
        new THREE.Vector2(points.k.x, points.k.y),
      ]),
      lineMaterial
    )
  );
}
function drawCircles(figure, lineMaterial, circles) {
  // u
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(
          circles.u.x, // ax
          circles.u.y, // aY
          circles.u.r, // xRadius
          circles.u.r, // yRadius
          circles.u.aS, // aStartAngle
          circles.u.aE, // aEndAngle
          false, // aClockwise
          0 // aRotation
        ).getPoints(50)
      ),
      lineMaterial
    )
  );
  // v
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(
          circles.v.x, // ax
          circles.v.y, // aY
          circles.v.r, // xRadius
          circles.v.r, // yRadius
          circles.v.aS, // aStartAngle
          circles.v.aE, // aEndAngle
          false, // aClockwise
          0 // aRotation
        ).getPoints(50)
      ),
      lineMaterial
    )
  );
  // w
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(
          circles.w.x, // ax
          circles.w.y, // aY
          circles.w.r, // xRadius
          circles.w.r, // yRadius
          circles.w.aS, // aStartAngle
          circles.w.aE, // aEndAngle
          false, // aClockwise
          0 // aRotation
        ).getPoints(50)
      ),
      lineMaterial
    )
  );
  // x
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(
          circles.x.x, // ax
          circles.x.y, // aY
          circles.x.r, // xRadius
          circles.x.r, // yRadius
          circles.x.aS, // aStartAngle
          circles.x.aE, // aEndAngle
          false, // aClockwise
          0 // aRotation
        ).getPoints(50)
      ),
      lineMaterial
    )
  );
  // y
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(
          circles.y.x, // ax
          circles.y.y, // aY
          circles.y.r, // xRadius
          circles.y.r, // yRadius
          circles.y.aS, // aStartAngle
          circles.y.aE, // aEndAngle
          false, // aClockwise
          0 // aRotation
        ).getPoints(50)
      ),
      lineMaterial
    )
  );
  // z
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(
          circles.z.x, // ax
          circles.z.y, // aY
          circles.z.r, // xRadius
          circles.z.r, // yRadius
          circles.z.aS, // aStartAngle
          circles.z.aE, // aEndAngle
          false, // aClockwise
          0 // aRotation
        ).getPoints(50)
      ),
      lineMaterial
    )
  );
}
function drawText(figure, points, circles) {
  for (const [key, value] of Object.entries(points)) {
    const loader = new FontLoader();
    const font = loader.parse(regularFontJson);

    let text = new THREE.Mesh(
      new TextGeometry(key.toLocaleUpperCase(), {
        font,
        size: 0.3,
        height: 0,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
      })
    );
    text.position.set(value.x + 0.1, value.y + 0.1);
    figure.add(text);
  }
  for (const [key, value] of Object.entries(circles)) {
    const loader = new FontLoader();
    const font = loader.parse(regularFontJson);

    let text = new THREE.Mesh(
      new TextGeometry(key.toLocaleUpperCase(), {
        font,
        size: 0.3,
        height: 0,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
      })
    );
    switch (key) {
      case "y": {
        text.position.set(value.x - 0.4, value.y - 0.4);
        break;
      }
      case "z": {
        text.position.set(value.x + 0.1, value.y + 0.1);
        break;
      }
      default: {
        text.position.set(value.x, value.y);
      }
    }
    figure.add(text);
  }
}
function drawGrid(figure) {
  const size = 15;
  const gridMaterial = new THREE.LineBasicMaterial({
    color: 0x767676,
  });
  // drawing a grid
  for (let i = 0; i < size; i++) {
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(-Math.floor(size / 2) + i, Math.floor(size / 2)),
          new THREE.Vector2(-Math.floor(size / 2) + i, -Math.floor(size / 2)),
        ]),
        gridMaterial
      )
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector2(Math.floor(size / 2), -Math.floor(size / 2) + i),
          new THREE.Vector2(-Math.floor(size / 2), -Math.floor(size / 2) + i),
        ]),
        gridMaterial
      )
    );
  }
  // drawing axes
  // y
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(0, Math.floor(size / 2) + 1),
        new THREE.Vector2(0, -Math.floor(size / 2) - 1),
      ]),
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      })
    )
  );
  // x
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(Math.floor(size / 2) + 1, 0),
        new THREE.Vector2(-Math.floor(size / 2) - 1, 0),
      ]),
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      })
    )
  );
  // drawing arrows
  // y
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(0, Math.floor(size / 2) + 1),
        new THREE.Vector2(0.3, Math.floor(size / 2) + 1 - 0.3),
      ]),
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      })
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(0, Math.floor(size / 2) + 1),
        new THREE.Vector2(-0.3, Math.floor(size / 2) + 1 - 0.3),
      ]),
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      })
    )
  );
  // x
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(Math.floor(size / 2) + 1, 0),
        new THREE.Vector2(Math.floor(size / 2) + 1 - 0.3, 0.3),
      ]),
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      })
    )
  );
  figure.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector2(Math.floor(size / 2) + 1, 0),
        new THREE.Vector2(Math.floor(size / 2) + 1 - 0.3, -0.3),
      ]),
      new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 2,
      })
    )
  );
  // drawing axis's names
  const loader = new FontLoader();
  const font = loader.parse(boldFontJson);

  let text = new THREE.Mesh(
    new TextGeometry("X", {
      font,
      size: 0.35,
      height: 0,
    }),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
    })
  );
  text.position.set(Math.floor(size / 2) + 1, 0.3);
  figure.add(text);
  text = new THREE.Mesh(
    new TextGeometry("Y", {
      font,
      size: 0.35,
      height: 0,
    }),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
    })
  );
  text.position.set(0.3, Math.floor(size / 2) + 1);
  figure.add(text);
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
      aS: (-150 / 180) * Math.PI,
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
      aS: Math.PI,
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
                  x: e.target.value || e.target.defaultValue,
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
                  y: +e.target.value || +e.target.defaultValue,
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
                  x: e.target.value || e.target.defaultValue,
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
                  y: +e.target.value || +e.target.defaultValue,
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
        // z: {
        //   value: 0,
        //   ref: useRef(),
        // },
        // o: {
        //   value: 0,
        //   ref: useRef(),
        // },
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
        // z: {
        //   value: 0,
        //   ref: useRef(),
        // },
        // o: {
        //   value: 0,
        //   ref: useRef(),
        // },
      },
      // z: {
      //   x: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      //   y: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      //   z: {
      //     value: 1,
      //     ref: useRef(),
      //   },
      //   o: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      // },
      o: {
        x: {
          value: 0,
          ref: useRef(),
        },
        y: {
          value: 0,
          ref: useRef(),
        },
        // z: {
        //   value: 0,
        //   ref: useRef(),
        // },
        // o: {
        //   value: 0,
        //   ref: useRef(),
        // },
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
        // z: {
        //   value: 0,
        //   ref: useRef(),
        // },
        // w: {
        //   value: 0,
        //   ref: useRef(),
        // },
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
        // z: {
        //   value: 0,
        //   ref: useRef(),
        // },
        o: {
          value: 0,
          ref: useRef(),
        },
        // w: {
        //   value: 0,
        //   ref: useRef(),
        // },
      },
      // z: {
      //   x: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      //   y: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      //   z: {
      //     value: 1,
      //     ref: useRef(),
      //   },
        // o: {
        //   value: 0,
        //   ref: useRef(),
        // },
      // },
      // o: {
      //   x: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      //   y: {
      //     value: 0,
      //     ref: useRef(),
      //   },
      //   // z: {
      //   //   value: 0,
      //   //   ref: useRef(),
      //   // },
      //   w: {
      //     value: 1,
      //     ref: useRef(),
      //   },
      // },
      w: {
        x: {
          value: 1,
          ref: useRef(),
        },
        y: {
          value: 1,
          ref: useRef(),
        },
        // z: {
        //   value: 0,
        //   ref: useRef(),
        // },
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
    for (const [key, param] of Object.entries(params)) {
      if (key == "vectors") continue;
      for (const setting of Object.values(param)) {
        setting.ref.current.value = setting.ref.current.defaultValue;
      }
    }
  };
  const resetAfTrans = () => {
    setParams(paramsDefault);
    for (const param of Object.values(params.vectors)) {
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

  useEffect(() => {
    // basic setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100000);
    const cameraHeight = 12;
    camera.position.z = cameraHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(1000, 1000);

    // const gridHelper = new THREE.GridHelper(15, 15);
    // gridHelper.rotation.x = Math.PI / 2;
    // scene.add(gridHelper);

    // creating an object
    const figure = new THREE.Group();
    // adding grid
    drawGrid(scene);
    // creating a material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 2,
    });

    // adding elements to the figure
    // drawing lines
    drawLines(figure, lineMaterial, points);
    // drawing circles
    drawCircles(figure, lineMaterial, circles);
    // drawing text
    drawText(figure, points, circles);

    // adding figure to the scene
    scene.add(figure);

    // transformations
    figure.position.x = params.offset.x.value;
    figure.position.y = params.offset.y.value;
    figure.rotation.z = params.rotation.angle.value;

    const matrix = new THREE.Matrix4(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
    // ! епределать o na w
    const matrixAffine = new THREE.Matrix4(
      params.vectors.x.x.value, // 1
      params.vectors.y.x.value, // 0
      0, // 0
      params.vectors.o.x.value, // 0 d

      params.vectors.x.y.value, // 0
      params.vectors.y.y.value, // 1
      0, // 0
      params.vectors.o.y.value, // 0 h

      0, // 0
      0, // 0
      1, // 1
      0, // 0 l

      0, // 0 m
      0, // 0 n
      0, // 0 o
      1 // 1 p
    );

    // const matrixAffine = new THREE.Matrix4(
    //   params.vectors.x.x.value, // 1
    //   params.vectors.y.x.value, // 0
    //   params.vectors.z.x.value, // 0
    //   0, // 0 d

    //   params.vectors.x.y.value, // 0
    //   params.vectors.y.y.value, // 1
    //   params.vectors.z.y.value, // 0
    //   0, // 0 h

    //   params.vectors.x.z.value, // 0
    //   params.vectors.y.z.value, // 0
    //   params.vectors.z.z.value, // 1
    //   0, // 0 l

    //   params.vectors.x.o.value, // 0 m
    //   params.vectors.y.o.value, // 0 n
    //   params.vectors.z.o.value, // 0 o
    //   1 // 1 p
    // );
    // const matrixAffine = new THREE.Matrix4().makeBasis(
    //   new THREE.Vector3(
    //     params.vectors.x.x.value,
    //     params.vectors.x.y.value,
    //     params.vectors.x.z.value
    //   ),
    //   new THREE.Vector3(
    //     params.vectors.y.x.value,
    //     params.vectors.y.y.value,
    //     params.vectors.y.z.value
    //   ),
    //   new THREE.Vector3(
    //     params.vectors.z.x.value,
    //     params.vectors.z.y.value,
    //     params.vectors.z.z.value
    //   )
    // );
    // Projective transformations
    const matrixProjective = new THREE.Matrix4().setFromMatrix3(
      new THREE.Matrix3(
        params.projective.x.x.value * params.projective.w.x.value,  
        params.projective.y.x.value * params.projective.w.x.value, 
        params.projective.w.x.value,

        params.projective.x.y.value * params.projective.w.y.value,   
        params.projective.y.y.value * params.projective.w.y.value, 
        params.projective.w.y.value,

        params.projective.x.o.value * params.projective.w.o.value, 
        params.projective.y.o.value * params.projective.w.o.value, 
        params.projective.w.o.value,
      )
    );
    // const matrixProjective = new THREE.Matrix4(
    //   params.projective.x.x.value, // 1
    //   params.projective.y.x.value, // 0
    //   0, // 0
    //   params.projective.o.x.value, // 0 d

    //   params.projective.x.y.value, // 0
    //   params.projective.y.y.value, // 1
    //   0, // 0
    //   params.projective.o.y.value, // 0 h

    //   params.projective.y.x.value * params.projective.y.w.value, // 0
    //   params.projective.x.y.value * params.projective.x.w.value, // 0
    //   1, // 1
    //   params.projective.o.w.value, // 0 l

    //   params.projective.x.w.value, // 0 m
    //   params.projective.y.w.value, // 0 n
    //   0, // 0 o
    //   params.projective.o.w.value // 1 p
    // );
    // const matrixProjective = new THREE.Matrix4(
    //   params.projective.x.x.value, // 1
    //   params.projective.y.x.value, // 0
    //   0, // 0
    //   params.projective.w.x.value, // 0 d

    //   params.projective.x.y.value, // 0
    //   params.projective.y.y.value, // 1
    //   0, // 0
    //   params.projective.w.y.value, // 0 h

    //   params.projective.y.x.value * params.projective.w.x.value, // 0
    //   params.projective.x.y.value * params.projective.w.y.value, // 0
    //   1, // 1
    //   params.projective.w.o.value, // 0 l

    //   params.projective.x.o.value, // 0 m
    //   params.projective.y.o.value, // 0 n
    //   0, // 0 o
    //   params.projective.w.o.value // 1 p
    // );

    const vectorX = new THREE.Vector3();
    const vectorY = new THREE.Vector3();
    const vectorZ = new THREE.Vector3();
    matrixProjective.extractBasis(vectorX, vectorY, vectorZ);
    console.log(vectorX, vectorY, vectorZ);
    // console.log(camera.projectionMatrix);
    // camera.updateProjectionMatrix(matrixProjective);
    // Example of a simple perspective transformation

    scene.applyMatrix4(matrixProjective);
    camera.position.z =
      cameraHeight * Math.max(...Array.from(matrixProjective.elements));
    // scene.applyMatrix4(matrixAffine);
    // camera.position.z =
    //   cameraHeight * Math.max(...Array.from(matrixAffine.elements));
    // const pers = new THREE.Matrix4(
    //   2,0,0,0,
    //     0,-2,0,0,
    //     4,-1,-4.5,-1,
    //     -1,-1.2,-4.5,-1
    
    // );
    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 0),
    //   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    //   );
    //   const proj = new THREE.Matrix4(
    //     1,0,0,0,
    //     0,1,0,0,
    //     0,0,1,0,
    //     0,0,0,1
    //     )
    // // // const vX = new THREE.Vector3(), vY = new THREE.Vector3(), vZ = new THREE.Vector3();
    // // // proj.extractBasis(vX,vY,vZ);
    // // // console.log(vX,vY,vZ);
    // proj.makePerspective(0,1,0,1,1,5);
    // // console.log(proj.elements);
    // // console.log(pers.elements);
    // cube.applyMatrix4(pers)
    // scene.add(cube);

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
    };
  }, [points, circles, params]);

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
