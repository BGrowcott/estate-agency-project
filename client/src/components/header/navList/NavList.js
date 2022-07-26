import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Auth from "../../../utils/auth";
import Button from "react-bootstrap/Button";
import { SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP, SHOW_MODAL_CONTACTS } from "../../../utils/actions";
import { useStoreContext } from "../../../utils/GlobalState";
import { Link } from "react-router-dom";

let user;

const NavList = ({ navArray, menuDisplay }) => {

  if (Auth.loggedIn()){
    user = Auth.getProfile()
  };  

  const [state, dispatch] = useStoreContext();

  function toggleModalLogin(e) {
    dispatch({ type: SHOW_MODAL_LOGIN });
  }

  function toggleModalSignup(e) {
    dispatch({ type: SHOW_MODAL_SIGNUP });
  }

  function toggleModalContacts() {
    dispatch({ type: SHOW_MODAL_CONTACTS });
  }

  function faIcon(item) {
    if (item.faIcon) {
      switch (item.faIcon) {
        case "weixin":
          return <FontAwesomeIcon className="me-1" icon={brands("weixin")} />;
        case "building":
          return <FontAwesomeIcon className="me-1" icon={solid("building")} />;
      }
    }
  }

  function loginDisplay() {
    if (Auth.loggedIn()) {
      return (
        <li>
          <button onClick={Auth.logout} className="btn btn-secondary btn-sm">
            Logout
          </button>
        </li>
      );
    } else {
      return (
        <>
          <li>
            <Button
              className="btn-sm m-1"
              variant="primary"
              onClick={toggleModalLogin}
            >
              Login
            </Button>
            <Button
              className="btn-sm m-1"
              variant="primary"
              onClick={toggleModalSignup}
            >
              SignUp
            </Button>
          </li>
        </>
      );
    }
  }

  function adminDisplay() {
    if (Auth.loggedIn() && user.data.role === "admin") {
      return (
        <li
          className="ms-2 me-2 mb-2 mb-md-0 ps-2 pe-2 d-flex align-items-center nav-list-custom-item"
        >
          <Link to="/admin">
            <div className="p-1 text-decoration-none">
              Admin
            </div>
          </Link>
        </li>
      );
    }
  }

  return (
    <nav className="d-flex justify-content-center align-items-center">
      <ul
        className={`
                justify-content-between 
                align-items-center 
                m-0 
                p-0 
                nav-list-custom 
                ${menuDisplay ? "d-flex slide-down" : "d-none"} 
                d-md-flex 
                flex-column
                flex-md-row`}
      >
        {navArray.map((item, index) => (
          <li
            className="ms-2 me-2 mb-2 mb-md-0 ps-2 pe-2 d-flex align-items-center nav-list-custom-item"
            key={index}
            onClick={item.faIcon === "weixin" ? toggleModalContacts : null}
          >
            <Link to={item.href}>
              <div className="p-1 text-decoration-none">
                {faIcon(item)}
                {item.text}
              </div>
            </Link>
          </li>
        ))}
        {adminDisplay()}
        {loginDisplay()}
      </ul>
    </nav>
  );
};

export default NavList;
