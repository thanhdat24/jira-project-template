import { NavLink } from "react-router-dom";
import React from "react";

export default function Menu() {
  return (
    //  Menu
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img
            src={require("../../assets/img/download.jfif").default}
            alt="logo"
          />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-3" />
          <NavLink
            style={{ color: "#000", fontWeight: "bold" }}
            activeStyle={{ color: "rgb(0, 82, 204)" }}
            to="/cyberbugs"
            activeClass="active"
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-3" />
          <NavLink
            style={{ color: "#000", fontWeight: "bold" }}
            activeStyle={{ color: "rgb(0, 82, 204)" }}
            to="/projectsettings"
            activeClass="active"
          >
            Project Settings
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck mr-3" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals mr-3" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-3" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-3" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box mr-3" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
