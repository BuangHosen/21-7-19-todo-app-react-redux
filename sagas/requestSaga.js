/**
 * This function focus on more unified error that can be handle as a same situation across all request
 * For example, handling authentication error.
 * For error that are too specific to a reducer or need a special personalization, please handle it with the the reducer action
 *
 * Parameters
 * @Object API: the function that will call the API. This function are the one that should call the fetch of the API
 * @any params: the params to be passed to the API.
 *
 * return @object response, error, handled
 *
 * response will be the original response from the API, when the status is OK
 *
 * error will be the an error object, contain the response status code, and the error message, formed from the
 * response data or from the problem property, when the status is not 200
 *
 * handled will be a boolean, indicating that there's an error and it has been handled externally
 */
import Router from "next/router";
import { call, put } from "redux-saga/effects";
import { handleError, clearError } from "~/redux/errorDux";

export default function* requestManager(api, ...params) {
  const response = yield call(api, ...params);

  let handled = false;
  let error;

  if (response?.status === 403) {
    // if not ok, check on status code
    // for example, we want to check for session management and to unified the error handler
    // and central it here, we check on the status code of 403

    // handle specific error in a universal handler with redux action
    yield put(handleError({ reason: "Unauthorised", code: 403 }));

    handled = true;
  } else if (!response.ok) {
    error = {
      status: response.status,
      message: response.data || response.problem
    };
  }

  return {
    response,
    handled,
    error
  };
}

export function* handleRequestError(api, { payload: { code } }) {
  // clear error state
  yield put(clearError());

  if (code === 403) {
    //   clear any local storage or what not
    localStorage.setItem("isLoggedIn", "false");

    // TODO: clear cookies or wtv if any

    // redirect to login
    Router.replace("/login");
  }
}
