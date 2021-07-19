import { combineReducers } from "redux";
import { reducer as user } from "~/redux/userDux";
import { reducer as tasks } from "~/redux/tasksDux";
import { reducer as globalError } from "~/redux/errorDux";

const rootReducer = combineReducers({
  user,
  tasks,
  globalError
});

export default rootReducer;
