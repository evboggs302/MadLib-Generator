const initialState = {
  history: [],
  id: null,
  title: "",
  story: [],
  date: "",
  share: false
};

const SET_HISTORY = "SET_HISTORY";
const SET_ID = "SET_ID";
const SET_TITLE = "SET_TITLE";
const SET_STORY = "SET_STORY";
const SET_DATE = "SET_DATE";

export default function HistoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HISTORY:
      return { ...state, history: action.payload };
    case SET_ID:
      return { ...state, id: action.payload };
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_STORY:
      return { ...state, story: action.payload };
    case SET_DATE:
      return { ...state, date: action.payload };
    default:
      return state;
  }
}

export function setHistory(passed) {
  return {
    type: SET_HISTORY,
    payload: passed
  };
}

export function setID(num) {
  return {
    type: SET_HISTORY,
    payload: num
  };
}

export function setHistoryTitle(title) {
  return {
    type: SET_HISTORY,
    payload: title
  };
}

export function setHistoryStory(text) {
  return {
    type: SET_HISTORY,
    payload: text
  };
}

export function setHistoryDate(date) {
  return {
    type: SET_HISTORY,
    payload: date
  };
}
export function setShare(boolean) {
  return {
    type: SET_HISTORY,
    payload: boolean
  };
}
