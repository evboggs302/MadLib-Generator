import React from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { NavLink } from "react-router-dom";

const Community = () => {
  return (
    <div>
      <h1>Community will be using sockets</h1>
      <div>
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
        <NavLink to="/library">
          <button>Library</button>
        </NavLink>
        <NavLink to="/history">
          <button>History</button>
        </NavLink>
      </div>
      <div>
        <span>Insert live feed here</span>
      </div>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState;
};

//   const mapDispatchToProps = {
//     setStory
//   };

const invokedConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);
export default invokedConnect(Community);
