import React from "react";
import "./Modal.css";
import { FaHeart, FaDownload } from "react-icons/fa";

function Modal({ image }) {
  const downloadImg = (id) => {
    console.log(id);
    console.log(image.user.username);
  };

  return (
    <div className="imgModal">
      <div className="modalUtils">
        <div className="left">
          <div>
            <img
              src={image.user?.profile_image?.small}
              alt="User profile"
              className="profilePic"
            />
          </div>
          <div className="names">
            <p className="userName">
              {image.user?.username}
            </p>
            <a className="portfolioUrl" target="_blank" rel="noreferrer" href={image?.user?.portfolio_url}>User Portfolio</a>

          </div>
        </div>

        <div className="right">
          <div className="likes">
            <FaHeart className="heart" />
            <p className="likesCount">{image.likes}</p>
          </div>
          <div className="download">
            <FaDownload
              className="downloadBtn"
              onClick={() => downloadImg(image.id)}
            />
          </div>
        </div>
      </div>

      {/* <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="modalImage"
      /> */}
    </div>
  );
}

export default Modal;
