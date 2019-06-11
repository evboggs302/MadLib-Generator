const initialState = {
  story_id: 0,
  title: "",
  blanks: [],
  lines: [],
  final: []
};
const SET_STORY = "SET_STORY";
const SET_FINAL = "SET_FINAL";
const FILL_BLANKS = "FILL_BLANKS";

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STORY:
      return {
        ...state,
        story_id: action.payload.story_id,
        title: action.payload.title,
        blanks: action.payload.blanks,
        lines: action.payload.lines
      };
    case FILL_BLANKS:
      return {
        ...state,
        blanks: action.payload
      };
    case SET_FINAL:
      return {
        ...state,
        final: action.payload
      };
    default:
      return state;
  }
}
export function setStory(story) {
  return {
    type: SET_STORY,
    payload: story
  };
}
export function fillBlanks(words) {
  return {
    type: FILL_BLANKS,
    payload: words
  };
}

export function setFinal(final) {
  return {
    type: SET_FINAL,
    payload: final
  };
}
