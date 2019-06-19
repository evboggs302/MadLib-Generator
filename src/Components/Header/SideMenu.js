import React from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = props => {
  let menuClasses = "sideMenu";
  if (props.show) {
    menuClasses = "sideMenu open";
  }
  return (
    <nav className={menuClasses}>
      <ul>
        <li>
          <NavLink exact to="/" onClick={props.click}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" onClick={props.click}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={props.click}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" onClick={props.click}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default SideMenu;
