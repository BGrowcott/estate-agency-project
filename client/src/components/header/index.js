import React from "react";
import Auth from "../../utils/auth";
import Button from 'react-bootstrap/Button';
import { SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP } from '../../utils/actions';
import { useStoreContext } from "../../utils/GlobalState";

const Header = () => {
  const [state, dispatch] = useStoreContext();

  function toggleModalLogin(e){
    dispatch({type: SHOW_MODAL_LOGIN})
  }

  function toggleModalSignup(e){
    dispatch({type: SHOW_MODAL_SIGNUP})
  }

  return (
    <header className="bg-dark text-white p-1">
      <div className="d-flex justify-content-between">
        <h1>Website Title</h1>
        {Auth.loggedIn() ? (
          <div className="d-flex align-items-center">
            <div className="me-3">
              Welcome back, {Auth.getProfile().data.username}
            </div>
            <button onClick={Auth.logout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-around">
            <Button className="btn-sm m-1" variant="primary" onClick={toggleModalLogin}>
              Login
            </Button>
            <Button className="btn-sm m-1" variant="primary" onClick={toggleModalSignup}>
              SignUp
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
