import Scene from "./Scene";
import SceneControl from "./SceneControl";

function Main() {
  return (
    <main className="grid grid-flow-row mt-navbar">
      <section>
        <div className="container">
          <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2">
            <Scene />
            <SceneControl />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
