const initialState = {
  given: "",
  selected: [],
  lines: []
};
const SET_GIVEN = "SET_GIVEN";
const SET_SELECTED = "SET_SELECTED";
const SET_LINES = "SET_LINES";

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
    case SET_LINES:
      return {
        ...state,
        lines: action.payload
      };
    default:
      return state;
  }
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

export function setLines(lines) {
  return {
    type: SET_LINES,
    payload: lines
  };
}
