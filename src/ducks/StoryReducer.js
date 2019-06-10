const initialState = {
  story_id: 0,
  title: "",
  blanks: [],
  lines: []
};
const SET_STORY = "SET_STORY";

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STORY:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
