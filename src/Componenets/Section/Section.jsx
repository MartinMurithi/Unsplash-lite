import React from "react";
import "./Section.css";

const Section = () => {
  return (
    <div className="sectionContainer">
      <div className="sectionInfo">
        <div className="sectionText">
          <p className="siteName">Image~ly.io</p>
          <p className="siteAbt">
            The internet's source for visuals <br /> Powered by Unsplash
          </p>
          <div className="searchContainer">
            <input
              type="search"
              name="search"
              id="searchInput"
              placeholder="Search high resolution images"
            />
            {/* <button className="searchBtn">Search</button> */}
            <p className="searchText">
              Trending: 3D, Nature, Wallpapers, love, film
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
