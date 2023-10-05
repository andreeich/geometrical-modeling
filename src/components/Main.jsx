import Form from "./Form";
import ThreejsScene from "./Scene";

function Main() {
  return (
    <main className="grid grid-flow-row mt-navbar">
      <section>
        <div className="container">
          <div className="flex flex-col items-center">
            <ThreejsScene />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
