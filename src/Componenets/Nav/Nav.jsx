import React, { useState } from "react";
import "./Nav.css";
import { FaImage, FaEllipsisV } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  const showModalMenu = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <div className="navBarContainer">
      <div className="logo">
        <FaImage
          className="imgLogo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="rightSideUtils">
        <div className="menuIcon">
          <FaEllipsisV onClick={showModalMenu} />
        </div>

        <div className="navLinks" id={showLinks ? "hidden" : ""}>
          <NavLink to={"/"} className={"link"}>
            Home
          </NavLink>
          <NavLink to="/about" className={"link"}>
            About
          </NavLink>
          <NavLink to="/history" className={"link"}>
            History
          </NavLink>
          <NavLink to="/contacts" className={"link"}>
            Contacts
          </NavLink>
          <NavLink to="/helpcenter" className={"link"}>
            Help Center
          </NavLink>
        </div>
        
      </div>
    </div>
  );
};

export default Nav;
