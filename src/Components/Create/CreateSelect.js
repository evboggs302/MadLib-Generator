import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSelected,
  setBlanks,
  setLines,
  setTitle
} from "../../ducks/CreationReducer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./CreateSelect.css";

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
    const { given, blanks } = this.props.creation;
    const givenSplit = given.split(" ");
    let tempLines = [];
    var previBlank = -1;
    for (let i = 0; i < blanks.length; i++) {
      let index = blanks[i][1];
      let parrot = givenSplit.slice(previBlank + 1, index).join(" ");
      tempLines.push([parrot]);
      previBlank = index;
    }
    let echo = givenSplit.slice(previBlank + 1, givenSplit.length).join(" ");
    tempLines.push([echo]);
    this.props.setLines(tempLines);
  };

  saveBlanks = ([type, index]) => {
    const { blanks } = this.props.creation;
    console.log("arr blanks:", blanks);
    let copy = blanks.slice();
    if (copy.length === 0) {
      copy.push([type, index]);
      console.log("COPY---", copy);
      return this.props.setBlanks(copy);
    }
    for (let i = 0; i < blanks.length; i++) {
      if (blanks[i][1] === index) {
        copy.splice(i, 1, [type, index]);
        return this.props.setBlanks(copy);
      }
    }
    copy.push([type, index]);
    return this.props.setBlanks(copy);
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
        console.log(res);
        let arr = res.data;
        let types = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].fl) {
            types.push(arr[i].fl);
          }
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
    const { given } = this.props.creation;
    const mappedCreation = given.split(" ").map((e, index) => {
      return (
        <div id="mapbut" key={index}>
          <div
            type="clear"
            onClick={() => this.getWordInfo(mappedCreation[index])}
          >
            {e}
          </div>
        </div>
      );
    });

    const { selectedWordInfo } = this.state;
    const { title } = this.props.creation;
    const menu = selectedWordInfo.map((e, indexOfOriginal) => {
      return (
        <div className="menubox" key={indexOfOriginal}>
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
      <div className="creationSelection">
        <h2>Your Story</h2>
        <div id="titleinput">
          Title:
          <input required onChange={event => this.changeTitle(event)} />
        </div>
        <ul id="selectioninfo">
          **FOR THE BEST RESULTS;
          <li> - Click on the words below you'd like to be filled in later.</li>
          <li>- Try to only select a max of 2 words from the same sentence.</li>
          <li>
            {" "}
            - Try to avoid words with punctuation marks. The punctuation will
            not be saved.
          </li>
        </ul>
        <div id="mappedcreation">{mappedCreation}</div>
        <br />
        <h2>Selected Words' Type</h2>
        <div className="menucontainer">{menu}</div>
        {!selectedWordInfo.length ||
        !this.props.creation.blanks.length ||
        !title ? (
          <div id="neededinfotogo">
            **Word types and titles are mandatory.**
          </div>
        ) : (
          <div>
            <NavLink to="/review">
              <button id="reviewBut" onClick={this.saveTemplate}>
                Continue to Review
              </button>
            </NavLink>
          </div>
        )}
        <div className="selectionbuttonbucket">
          <NavLink to="/create">
            <button id="goinback" onClick={this.props.killStore}>
              Go Back
            </button>
          </NavLink>
          <button id="clearselect" onClick={this.clearSelectedWords}>
            Clear Selected
          </button>
        </div>
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
