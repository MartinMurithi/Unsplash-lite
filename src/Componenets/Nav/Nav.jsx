import React, { useState } from "react";
import "./Nav.css";
import { FaImage, FaEllipsisV } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

const Nav = () => {

  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  const showModalMenu = () => {
    setShowLinks(!showLinks);
  }

  return (
    <div className="navBarContainer">
      <div className="logo">
        <FaImage className="imgLogo" onClick={()=>{navigate("/")}} />
      </div>

      <div className="rightSideUtils">
        {/* <div className="submitImgBtn">
          <button className="submitBtn">Submit a photo</button>
        </div> */}
        <div className="menuIcon"><FaEllipsisV onClick={showModalMenu} /></div>
        
          <div className="navLinks" id={showLinks ? "hidden" : ""}>
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
