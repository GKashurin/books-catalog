import { combineReducers } from "redux";
import {loginReducer} from "./loginReducer";
import {booksReducer} from "./booksReducer";

export default combineReducers(
	{
		loginReducer,
		booksReducer,
	}
)
