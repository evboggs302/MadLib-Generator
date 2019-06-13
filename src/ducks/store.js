import { createStore, combineReducers } from "redux";
import UserReducer from "./UserReducer";
import StoryReducer from "./StoryReducer";
import CreationReducer from "./CreationReducer";
import HistoryReducer from "./HistoryReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  story: StoryReducer,
  creation: CreationReducer,
  userHistory: HistoryReducer
});

export default createStore(rootReducer);
