import React, { Component } from "react";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  render() {
    return <div>Review Component</div>;
  }
}
