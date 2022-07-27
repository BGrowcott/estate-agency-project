import React, { useState } from "react";
import logoMain from "../../images/logos/logo-secondary.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./style.css";
import NavList from "../navList/NavList";

const Header = () => {
  const navArray = [
    { text: "Home", href: "/", faIcon: "house" },
    { text: "Content", href: "/content", faIcon: "building" },
    { text: "Features", href: "#" },
    { text: "Get in Touch", href: "#" },
  ];

  const [menuDisplay, setMenuDisplay] = useState(false);

  function toggleMenuDisplay() {
    setMenuDisplay(!menuDisplay);
  }

  return (
    <header className="bg-light-fade p-1 pt-md-0 pb-md-0 shadow-custom position-fixed w-100">
      <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between text-center">
        <div className="d-flex justify-content-between align-items-center text-center">
          <div>
            <img className="main-logo" src={logoMain} alt="HiZOOM logo"/>
          </div>
          <FontAwesomeIcon
            className={`d-block d-md-none fs-2 pointer text-center`}
            icon={solid("bars")}
            onClick={toggleMenuDisplay}
          />
        </div>
        <NavList navArray={navArray} menuDisplay={menuDisplay} />
      </div>
    </header>
  );
};

export default Header;
