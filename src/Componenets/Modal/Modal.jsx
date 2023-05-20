import React from "react";
import "./Modal.css";

function Modal({ image }) {
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
            <p className="userName">{image.user?.username}</p>
            <p></p>
            <a
              className="portfolioUrl"
              target="_blank"
              rel="noreferrer"
              href={image?.user?.portfolio_url}
            >
              User Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
