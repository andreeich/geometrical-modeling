import SceneOne from "./SceneOne";
import SceneTwo from "./SceneTwo";
import React, { useEffect, useState } from "react";

function Main() {
  const [lab, setLab] = useState(~~localStorage.getItem("lab") || 1);

  useEffect(() => {
    localStorage.setItem("lab", lab);
  }, [lab]);

  return (
    <main className="grid grid-flow-row mt-navbar">
      <section>
        <div className="container">
          <div className="mb-10 tabs">
            <a
              className={`tab tab-bordered ${lab === 1 ? " tab-active" : ""}`}
              onClick={() => setLab(1)}
            >
              Laboratory 1
            </a>
            <a
              className={`tab tab-bordered ${lab === 2 ? " tab-active" : ""}`}
              onClick={() => setLab(2)}
            >
              Laboratory 2
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
