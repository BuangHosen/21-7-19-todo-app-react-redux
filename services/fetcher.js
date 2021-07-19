import apisauce from "apisauce";
import { API_LOGIN, API_SIGNUP, API_LOGOUT, API_TASKS } from "./api";

const create = (baseURL = "https://api-nodejs-todolist.herokuapp.com") => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache"
    },
    // 10 second timeout...
    timeout: 10000
  });

  const login = ({ email, password }) =>
    api.post(API_LOGIN, { email, password });

  const signup = ({ name, email, password }) =>
    api.post(API_SIGNUP, { name, email, password });

  const logout = token =>
    api.post(
      API_LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const getAllTasks = token =>
    api.get(
      API_TASKS,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const getTaskById = ({ id, token }) =>
    api.get(
      `${API_TASKS}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const addTask = ({ description, token }) =>
    api.post(
      API_TASKS,
      { description },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const updateTask = ({ id, description, token }) =>
    api.put(
      `${API_TASKS}/${id}`,
      { description },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const deleteTask = ({ id, token }) =>
    api.delete(
      `${API_TASKS}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  return {
    login,
    signup,
    logout,
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
  };
};

export default {
  create
};
