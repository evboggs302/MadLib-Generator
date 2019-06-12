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
      createdTitle: "",
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
      let parrot = givenSplit.slice(previBlank + 1, index);
      tempLines.push(parrot);
      previBlank = index;
    }

    this.setState({});
    this.props.setLines(this.state.lines);
  };

  saveBlanks = ([type, index]) => {
    const { wordBlanks } = this.state;
    if (wordBlanks.length === 0) {
      let copy = this.state.wordBlanks.slice();
      copy.push([type, index]);
      this.setState({
        wordBlanks: copy
      });
      const { wordBlanks } = this.state;
      this.props.setBlanks(wordBlanks);
    } else if (wordBlanks.length) {
      const { wordBlanks } = this.state;
      for (let i = 0; i < wordBlanks.length; i++) {
        if (wordBlanks[i][1] === index) {
          let parrot = this.state.wordBlanks.slice();
          parrot.splice(i, 1, [type, index]);
          this.setState({
            wordBlanks: parrot
          });
          this.props.setBlanks(this.state.wordBlanks);
        } else {
          let echo = this.state.wordBlanks.slice();
          echo.push([type, index]);
          this.setState({
            wordBlanks: echo
          });
          this.props.setBlanks(this.state.wordBlanks);
        }
      }
    }
  };

  changeTitle = event => {
    this.setState({
      createdTitle: event.target.value
    });
    this.props.setTitle();
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
        <div key={indexOfOriginal + 1}>
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
