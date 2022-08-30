import React from "react";
import backgroundImage from "../images/birmingham-example-background.jpg";
import Button from "react-bootstrap/esm/Button";



const styles = {
  backgroundImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "96vh",
  },
};

const Home = () => {

  return (
    <main
      className="d-flex justify-content-around align-items-center"
      style={styles.backgroundImage}
    >
      <div className="w-75 box-fade-dark d-flex justify-content-around align-items-center fadeIn">
        <div>
          <h2 className="text-white">Something about your website</h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
