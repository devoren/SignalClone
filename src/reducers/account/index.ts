import { action } from "typesafe-actions";

import reducers from "./reducers";
import TYPE  from "./types";

export const setUser = (data: any) => (dispatch: any) => {
    dispatch(action(TYPE.USER, data))
}

export default reducers;