import { put, call } from "redux-saga/effects";
import Router from "next/router";

import {
  getTasksSuccess,
  getTaskByIdSuccess,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  getTasksFailure
} from "~/redux/tasksDux";
import requestManager from "./requestSaga";

export function* getTasks(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.getAllTasks,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        yield put(getTasksSuccess(response.data));
      }
    }
  } catch (error) {
    yield put(getTasksFailure(error.message ?? "Something is wrong"));
  }
}

export function* getTaskById(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.getTaskById,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        yield put(getTaskByIdSuccess(response.data.data.description));
      }
    }
  } catch (error) {
    yield put(getTasksFailure(error.message ?? "Something is wrong"));
  }
}

export function* addTask(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.addTask,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        yield put(addTaskSuccess());
        Router.push("/task");
      }
    }
  } catch (error) {
    yield put(getTasksFailure(error.message ?? "Something is wrong"));
  }
}

export function* updateTask(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.updateTask,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        yield put(updateTaskSuccess());
        Router.push("/task");
      }
    }
  } catch (error) {
    yield put(getTasksFailure(error.message ?? "Something is wrong"));
  }
}

export function* deleteTask(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.deleteTask,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        yield put(deleteTaskSuccess());
      }
    }
  } catch (error) {
    yield put(getTasksFailure(error.message ?? "Something is wrong"));
  }
}
