import autodux, { id } from "autodux";

const initialState = {
  reason: "",
  code: ""
};

export const {
  reducer,
  initial,
  slice,
  actions: { handleError, clearError },
  selectors
} = autodux({
  slice: "globalError",
  initial: initialState,
  actions: {
    handleError: (state, payload) => ({
      ...state,
      reason: payload.reason,
      code: payload.code
    }),
    clearError: () => initialState
  },
  selectors: {
    getValue: id
  }
});
