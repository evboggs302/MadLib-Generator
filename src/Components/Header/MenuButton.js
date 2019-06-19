import React from "react";
import "./MenuButton.css";

const MenuButton = props => (
  <button className="toggleButton" onClick={props.click}>
    <span className="buttonLine" />
    <span className="buttonLine" />
    <span className="buttonLine" />
  </button>
);
export default MenuButton;
