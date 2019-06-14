import { createStore, combineReducers } from "redux";
import UserReducer from "./UserReducer";
import StoryReducer from "./StoryReducer";
import CreationReducer from "./CreationReducer";
import HistoryReducer from "./HistoryReducer";
import ShopReducer from "./ShopReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  story: StoryReducer,
  creation: CreationReducer,
  userHistory: HistoryReducer,
  shop: ShopReducer
});

export default createStore(rootReducer);
