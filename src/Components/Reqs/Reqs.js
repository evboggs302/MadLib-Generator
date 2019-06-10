import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Reqs.css";

class Reqs extends Component {
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

  render() {
    console.log(this.props);
    // let mappedInputs =
    //   arr && arr.length
    //     ? arr.map((element, index) => {
    //         return (
    //           <div className="layout" key={index}>
    //             <input
    //               placeholder={element}
    //               onChange={event => this.changeHandler(event, index)}
    //             />
    //           </div>
    //         );
    //       })
    //     : [];

    return (
      <div className="inputs">
        <h3 className="wordsBruh">Words, Bruh. WORDS!</h3>
        {/* {mappedInputs} */}
        <br />
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};
const invokedConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);
export default invokedConnect(Reqs);
