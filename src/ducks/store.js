import { createStore, combineReducers } from "redux";
import UserReducer from "./UserReducer";
import StoryReducer from "./StoryReducer";

const rootReducer = combineReducers({ user: UserReducer, story: StoryReducer });

export default createStore(rootReducer);
