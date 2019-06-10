import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
      reqs: [],
      template: []
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/reqs" />;
    }
  };

  getRandomTemplate = () => {
    console.log("rando temp func hit");
    const id = Math.floor(Math.random() * 4) + 1;
    axios.get(`/api/library/random/${id}`).then(res => {
      console.log(res);
      // this.setState({
      //   req
      // });
    });
  };

  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <div>
        {!user ? (
          <div>
            <h2 />
            <p />
            <div>
              {this.renderRedirect()}
              <button
                onClick={this.setRedirect}
                onClick={this.getRandomTemplate}
              >
                Random
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              {this.renderRedirect()}
              <button
                onClick={this.setRedirect}
                onClick={this.getRandomTemplate}
              >
                Random
              </button>
            </div>
            {/* <NavLink />
            <NavLink />
            <NavLink />
            <NavLink /> */}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

//   const mapDispatchToProps = {
//     setUser
//   };

const invokedConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);
export default invokedConnect(Home);
