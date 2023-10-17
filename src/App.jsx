// import { useEffect, useState } from "react";

import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="relative grid min-h-screen grid-cols-1 grid-rows-[1fr_auto]">
      <Header />
      <Main />
    </div>
  );
}

export default App;
