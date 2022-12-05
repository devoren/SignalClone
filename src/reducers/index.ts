import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import account from "./account";

const rootReducer = combineReducers({
	account,
});

export type State = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
