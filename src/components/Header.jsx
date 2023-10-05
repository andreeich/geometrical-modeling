import { Icon } from "@iconify/react";

import logo from "../assets/logo.svg";
import { useState } from "react";
// import anime from "animejs";

function Header(props) {
  const { isDarkModeToggled, handleDarkModeToggle } = props;

  return (
    <header className="fixed top-0 left-0 z-20 w-full bg-base-100">
      <div className="container">
        <div className="navbar">
          <div className="navbar-start">
            <p className="text-lg">
              <b>Geometrical modelling</b> | Laboratory 1
            </p>
          </div>
          <div className="hidden navbar-center lg:flex"></div>
          <div className="gap-4 navbar-end">
            <p className="text-xs">
              Created by <b>Andrei Chervoniak</b> TR-03
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
