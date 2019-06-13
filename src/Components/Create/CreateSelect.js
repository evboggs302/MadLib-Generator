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
import { NavLink } from "react-router-dom";

class CreateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWordInfo: [],
      wordBlanks: [],
      lines: []
    };
  }

  saveTemplate = () => {
    const { given } = this.props.creation;
    const { wordBlanks } = this.state;
    const givenSplit = given.split(" ");
    let tempLines = [];

    let previBlank = -1;
    for (let i = 0; i < wordBlanks.length; i++) {
      let index = wordBlanks[i][1];
      let parrot = givenSplit.slice(previBlank + 1, index).join(" ");
      tempLines.push([parrot]);
      previBlank = index;
    }
    let echo = givenSplit
      .slice(previBlank + 1, givenSplit.length + 1)
      .join(" ");
    tempLines.push([echo]);

    this.props.setLines(tempLines);
    this.setState({
      lines: tempLines
    });
  };

  saveBlanks = ([type, index]) => {
    console.log("passed-in:", [type, index]);
    const { blanks } = this.props.creation;
    if (blanks.length === 0) {
      let copy = blanks.slice();
      copy.push([type, index]);
      console.log("COPY hit:", copy);
      return this.props.setBlanks(copy);
    } else if (blanks.length) {
      const { blanks } = this.props.creation;
      for (let i = 0; i < blanks.length; i++) {
        if (blanks[i][1] == index) {
          let parrot = blanks.slice();
          parrot.splice(i, 1, [type, index]);
          console.log("PARROT hit:", blanks[i][1], index);
          return this.props.setBlanks(parrot);
        } else if (blanks[i][1] !== index) {
          let echo = blanks.slice();
          echo.push([type, index]);
          console.log("ECHO hit:", echo);
          return this.props.setBlanks(echo);
        }
      }
    }
  };

  changeTitle = event => {
    this.props.setTitle(event.target.value);
  };

  getWordInfo = EventTarget => {
    const index = +EventTarget.key;
    const word = EventTarget.props.children.props.children;
    const wordInfo = [word, index];

    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=68c81f9b-028f-4b22-82ae-8ee40ce43404`
      )
      .then(res => {
        let arr = res.data;
        let types = [];
        for (let i = 0; i < arr.length; i++) {
          types.push(arr[i].fl);
        }
        const uniqueVals = new Set(types);
        const partsOfSpeech = ["", ...uniqueVals];
        this.setState({
          selectedWordInfo: [
            ...this.state.selectedWordInfo,
            { word: wordInfo, type: partsOfSpeech }
          ]
        });
        this.props.setSelected(this.state.selectedWordInfo);
      });
  };

  clearSelectedWords = () => {
    this.setState({
      createdTitle: "",
      selectedWordInfo: [],
      finalWordSelection: [],
      lines: []
    });
    this.props.setSelected([]);
  };

  render() {
    const Button = styled.button`
      border: none;
      background: none;
    `;

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
    const menu = selectedWordInfo.map((e, indexOfOriginal) => {
      return (
        <div key={indexOfOriginal}>
          {" "}
          {e.word[0]}
          <select
            onChange={event => {
              this.saveBlanks([event.target.value, e.word[1]]);
            }}
          >
            {e.type.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      );
    });

    console.log("store:", this.props.creation);

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
        ) : !this.props.creation.blanks.length ? (
          <div>
            <button onClick={this.clearSelectedWords}>Clear Selected</button>
          </div>
        ) : (
          <div>
            <button onClick={this.clearSelectedWords}>Clear Selected</button>
            <NavLink to="/review">
              <button onClick={this.saveTemplate}>Continue to Review</button>
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
