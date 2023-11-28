import SceneOne from "./SceneOne";
import SceneTwo from "./SceneTwo";
import React, { useEffect, useState } from "react";

function Main() {
  const [lab, setLab] = useState(~~localStorage.getItem("lab") || 1);

  useEffect(() => {
    localStorage.setItem("lab", lab);
  }, [lab]);

  return (
    <main className="grid grid-flow-row">
      <section>
        <div className="container">
          <div className="w-full mb-10 tabs tabs-lifted">
            <a
              className={`tab ${lab === 1 ? " tab-active" : ""}`}
              onClick={() => setLab(1)}
            >
              Лабораторна 1
            </a>
            <a
              className={`tab ${lab === 2 ? " tab-active" : ""}`}
              onClick={() => setLab(2)}
            >
              Лабораторна 2
            </a>
          </div>
        </div>
        <div className="container">
          {lab === 1 ? <SceneOne /> : lab === 2 ? <SceneTwo /> : ""}
        </div>
      </section>
    </main>
  );
}

export default Main;
