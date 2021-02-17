import { combineReducers } from "redux";
import {loginReducer} from "./loginReducer";
import {booksReducer} from "./booksReducer";

const rootReducer = combineReducers(
	{
		loginReducer,
		booksReducer,
	}
)
export default rootReducer