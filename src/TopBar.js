import React from "react";
import { Link } from "react-router-dom";

const AppTopMainBar = (props) => {
  return (
    <div id="background-blue" className="layout-topbar ">
      <div className="topbar-left">
        <Link to="/" className="logo">
          <img
            id="app-logo"
            height={50}
            className="logo-image"
            src="assets/layout/images/emx.png"
            alt="diamond layout"
          />
        </Link>
      </div>
      <div className="topbar-middle">
        <span className="company-label">EmpowerMX </span>{" "}
        <span>Online Help</span>
        <i className="pi pi-question-circle"></i>
      </div>
      <div className="topbar-right"></div>
    </div>
  );
};

export default AppTopMainBar;
