import { takeLatest, all } from "redux-saga/effects";
import API from "~/services/fetcher";

/* ------------- Types ------------- */
import {
  login as loginType,
  signup as signupType,
  logout as logoutType
} from "~/redux/userDux";

import {
  getTasksRequest as getTasksRequestType,
  getTaskByIdRequest as getTaskByIdRequestType,
  addTaskRequest as addTaskRequestType,
  updateTaskRequest as updateTaskRequestType,
  deleteTaskRequest as deleteTaskRequestType
} from "~/redux/tasksDux";

/** Global error handler */
import { handleError as handleErrorType } from "~/redux/errorDux";

/* ------------- Sagas ------------- */
import { login, signup, logout } from "~/sagas/userSaga";
import {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
} from "~/sagas/tasksSaga";

/** error request handler saga */
import { handleRequestError } from "~/sagas/requestSaga";

/* ------------- API ------------- */
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(loginType.type, login, api),
    takeLatest(signupType.type, signup, api),
    takeLatest(logoutType.type, logout, api),
    takeLatest(getTasksRequestType.type, getTasks, api),
    takeLatest(getTaskByIdRequestType.type, getTaskById, api),
    takeLatest(addTaskRequestType.type, addTask, api),
    takeLatest(updateTaskRequestType.type, updateTask, api),
    takeLatest(deleteTaskRequestType.type, deleteTask, api),
    takeLatest(handleErrorType.type, handleRequestError, api)
  ]);
}
