import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setSelected,
  setBlanks,
  setLines,
  setTitle
} from "../../ducks/CreationReducer";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class CreateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdTitle: "",
      selectedWordInfo: [],
      wordBlanks: [],
      lines: []
    };
  }

  changeTitle = event => {
    this.setState({
      createdTitle: event.target.value
    });
    this.props.setTitle();
  };

  getWordInfo = EventTarget => {
    const index = +EventTarget.key;
    console.log(index);
    const word = EventTarget.props.children.props.children;
    console.log(word);
    const wordInfo = [word, index];

    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=68c81f9b-028f-4b22-82ae-8ee40ce43404`
      )
      .then(res => {
        console.log("response from api", res.data);
        let arr = res.data;
        let types = [];
        for (let i = 0; i < arr.length; i++) {
          types.push(arr[i].fl);
        }
        const uniqueVals = new Set(types);
        const partsOfSpeech = [...uniqueVals];
        this.setState({
          selectedWordInfo: [
            ...this.state.selectedWordInfo,
            { word: wordInfo, type: partsOfSpeech }
          ]
        });
      });
  };

  clearSelectedWords = () => {
    this.setState({
      createdTitle: "",
      selectedWordInfo: [],
      finalWordSelection: [],
      lines: []
    });
  };

  render() {
    const Button = styled.button`
      border: none;
      background: none;
    `;
    console.log(this.state);
    const { given } = this.props.creation;
    const mappedCreation = given.split(" ").map((e, index) => {
      return (
        <div key={index}>
          <Button
            type="clear"
            onClick={() => this.getWordInfo(mappedCreation[index])}
          >
            {e}
          </Button>
        </div>
      );
    });
    const { selectedWordInfo } = this.state;

    console.log("this is wordInfo", selectedWordInfo);
    const menu = selectedWordInfo.map((e, index) => {
      return (
        <div key={index}>
          {" "}
          {e.word[0]}
          <select>
            {e.type.map((type, index) => {
              return <option key={index + 1}>{type}</option>;
            })}
          </select>
        </div>
      );
    });

    return (
      <div>
        <h2>Your Story</h2>
        <br />
        <div>
          Title:
          <input required onChange={event => this.changeTitle(event)} />
        </div>
        <div>
          <div>{mappedCreation}</div>
        </div>
        <br />
        <h2>Selected Words' Type</h2>
        <span>
          <div>{menu}</div>
        </span>
        {!selectedWordInfo.length ? (
          <div />
        ) : (
          <div>
            <button onClick={this.clearSelectedWords}>Clear Selected</button>
            <NavLink to="/review">
              <button>Continue to Review</button>
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setLines,
  setTitle,
  setSelected,
  setBlanks
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(CreateSelect);
