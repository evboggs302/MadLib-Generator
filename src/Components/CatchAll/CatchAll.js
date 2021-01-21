// render photo of pirate Josh

import { Component } from "react";
import josh from "../josh.jpg";
import "./CatchAll.css";

export default class CatchAll extends Component {
  render() {
    return (
      <div className="catchEMall">
        <h2>OH NO! </h2>
        <div>You've found the Josh! So now you must go home.</div>
        <img src={josh} alt="" />
      </div>
    );
  }
}
