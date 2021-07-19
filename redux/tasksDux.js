import autodux from "autodux";

const initialState = { count: 0, data: [], description: "", loading: false };

export const {
  reducer,
  initial,
  slice,
  actions: {
    getTasksRequest,
    getTasksSuccess,
    getTaskByIdRequest,
    getTaskByIdSuccess,
    addTaskRequest,
    addTaskSuccess,
    updateTaskRequest,
    updateTaskSuccess,
    deleteTaskRequest,
    deleteTaskSuccess,
    getTasksFailure
  },
  selectors
} = autodux({
  slice: "tasks",
  initial: initialState,
  actions: {
    getTasksRequest: state => ({ ...state }),
    getTasksSuccess: (state, payload) => ({
      ...state,
      ...payload,
      loading: false
    }),
    getTaskByIdRequest: state => ({ ...state }),
    getTaskByIdSuccess: (state, payload) => ({
      ...state,
      description: payload
    }),
    addTaskRequest: state => ({ ...state }),
    addTaskSuccess: state => ({ ...state, loading: true }),
    updateTaskRequest: state => ({ ...state }),
    updateTaskSuccess: state => ({ ...state, loading: true }),
    deleteTaskRequest: state => ({ ...state }),
    deleteTaskSuccess: state => ({ ...state, loading: true }),
    getTasksFailure: state => ({ ...state })
  }
});
