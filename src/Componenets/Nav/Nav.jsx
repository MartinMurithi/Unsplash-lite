import React from "react";
import "./Nav.css";
import { FaImage, FaHamburger } from "react-icons/fa";

const Nav = () => {
  return (
    <div className="navBarContainer">
      <div className="logo">
        <FaImage className="imgLogo" />
      </div>

      <div className="rightSideUtils">
        <div className="submitImgBtn">
          <button className="submitBtn">Submit a photo</button>
        </div>{" "}
        <div className="navLinks">
          <p className="about">About</p>
          <p className="about">History</p>
          <p className="about">Contact us</p>
          <p className="about">Help center</p>
        </div>
        {/* <div className="menuIcon">
          <FaHamburger />
        </div> */}
      </div>
    </div>
  );
};

export default Nav;
