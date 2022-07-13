import React from "react";
import Auth from "../../utils/auth";

const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };
  return (
    <header>
      <div>
        {Auth.loggedIn() ? (
          <div>Logged in as: {Auth.getProfile().data.username}</div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
    </header>
  );
};

export default Header;
