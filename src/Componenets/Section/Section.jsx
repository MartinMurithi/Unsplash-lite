import {React} from "react";
import "./Section.css";
import { useNavigate } from "react-router-dom";


const Section = () => {
  const navigate = useNavigate();
  
  const rosey = () => {
    navigate("/searchData")
}

  return (
    <div className="sectionContainer">
      <div className="sectionInfo">
        <div className="sectionText">
          <p className="siteName">Image~ly.io</p>
          <p className="siteAbt">
            The internet's source for visuals <br /> Powered by Unsplash
          </p>
          <button className="searchImagesPageBtn" onClick={rosey}>Search high resolution images</button>
        </div>
      </div>
    </div>
  );
};

export default Section;
