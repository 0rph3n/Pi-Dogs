import React from "react";
import "./PageNotFound.styles.css";
import notFoundImage from "../../assets/error-404-sticker.png";

function PageNotFound() {
  return (
    <div>
      <img src={notFoundImage} alt="Dog Not Found" />
    </div>
  );
}

export default PageNotFound;
