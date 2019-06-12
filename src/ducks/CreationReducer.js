const initialState = {
  given: "",
  title: "",
  selected: [],
  blanks: [],
  lines: []
};
const SET_GIVEN = "SET_GIVEN";
const SET_SELECTED = "SET_SELECTED";
const SET_BLANKS = "SET_BLANKS";
const SET_LINES = "SET_LINES";
const SET_TITLE = "SET_TITLE";

export default function CreationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GIVEN:
      return {
        ...state,
        given: action.payload
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      };
    case SET_BLANKS:
      return {
        ...state,
        blanks: action.payload
      };
    case SET_LINES:
      return {
        ...state,
        lines: action.payload
      };
    default:
      return state;
  }
}

export function setTitle(title) {
  return {
    type: SET_TITLE,
    payload: title
  };
}

export function setGiven(typedInput) {
  return {
    type: SET_GIVEN,
    payload: typedInput
  };
}
export function setSelected(words) {
  return {
    type: SET_SELECTED,
    payload: words
  };
}
export function setBlanks(words) {
  return {
    type: SET_BLANKS,
    payload: words
  };
}

export function setLines(lines) {
  return {
    type: SET_LINES,
    payload: lines
  };
}
