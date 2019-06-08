import { createStore } from "redux";
import reducer from "./reducer";

//use combinedRecuder for when you have multiple reducers with diff states

export default createStore(reducer);
