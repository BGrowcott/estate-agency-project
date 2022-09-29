import React, { useState } from "react";
import logoMain from "../../images/logos/logoEng.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./style.css";
import NavList from "./navList/NavList";
import { Link } from "react-router-dom";

const Header = () => {
  const navArray = [
    { text: "HiZoom Properties", href: "/content", faIcon: "building" },
    { text: "WeChat", href: "#", faIcon: "weixin"},
  ];

  const [menuDisplay, setMenuDisplay] = useState(false);

  function toggleMenuDisplay() {
    setMenuDisplay(!menuDisplay);
  }

  function closeMenuDisplay() {
    setTimeout(()=> {setMenuDisplay(false)}, 300);
  }

  return (
    <header className="bg-light-fade p-1 pt-md-0 pb-md-0 shadow-custom position-fixed w-100">
      <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between text-center">
        <div className="d-flex justify-content-between align-items-center text-center">
          <div>
            <Link to={"/"}>
              <img className="main-logo" src={logoMain} alt="HiZOOM logo" />
            </Link>
          </div>
          <button className="btn" onClick={toggleMenuDisplay} onBlur={closeMenuDisplay}>
            <FontAwesomeIcon
              className={`d-block d-md-none fs-2 pointer text-center`}
              icon={solid("bars")}
            />
          </button>
        </div>
        <NavList navArray={navArray} menuDisplay={menuDisplay} />
      </div>
    </header>
  );
};

export default Header;
