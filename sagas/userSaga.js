import { put, call } from "redux-saga/effects";
import Router from "next/router";
import { loginSuccess, loginFailure, signupSuccess } from "~/redux/userDux";
import requestManager from "./requestSaga";

export function* login(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.login,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        // TODO: store the token in local storage and update state
        localStorage.setItem("isLoggedIn", "true");
        yield put(loginSuccess(response.data));
        Router.push("/task");
      }
    }
  } catch (error) {
    yield put(loginFailure(error.message ?? "Something is wrong"));
  }
}

export function* signup(api, { payload }) {
  try {
    const { response, handled, error } = yield call(
      requestManager,
      api.signup,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        yield put(signupSuccess(response.data));
        Router.push("/task");
      }
    }
  } catch (error) {
    yield put(loginFailure(error.message ?? "Something is wrong"));
  }
}

export function* logout(api, { payload }) {
  try {
    // should call whatever logout api
    const { response, handled, error } = yield call(
      requestManager,
      api.logout,
      payload
    );

    if (error) throw new Error(error.message);

    if (response && !handled) {
      localStorage.clear();

      // we uses window location instead router so we can flush all the other
      // screen from the memory
      window.location = "/login";
    }
  } catch (error) {
    yield put(loginFailure(error.message ?? "Something is wrong"));
  }
}
