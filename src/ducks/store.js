import { createStore, combineReducers } from "redux";
import UserReducer from "./UserReducer";
import StoryReducer from "./StoryReducer";
import CreationReducer from "./CreationReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  story: StoryReducer,
  creation: CreationReducer
});

export default createStore(rootReducer);
