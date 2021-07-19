import autodux from "autodux";

const initialState = {
  isLoggedIn: false,
  profile: {
    name: "",
    avatar: "",
    organization: {
      code: ""
    },
    id: 0
  },
  loading: false,
  error: ""
};

export const {
  reducer,
  initial,
  slice,
  actions: { login, loginSuccess, signup, signupSuccess, loginFailure, logout },
  selectors
} = autodux({
  slice: "user",
  initial: initialState,
  actions: {
    login: state => ({ ...state, loading: true }),
    loginSuccess: (state, payload) => ({
      ...state,
      profile: {
        ...payload
      },
      isLoggedIn: true,
      loading: false
    }),
    signup: state => ({ ...state, loading: true }),
    signupSuccess: (state, payload) => ({
      ...state,
      profile: {
        ...payload
      },
      isLoggedIn: true,
      loading: false
    }),
    loginFailure: (state, payload) => ({
      ...state,
      isLoggedIn: false,
      error: payload,
      loading: false
    }),
    logout: () => initialState
  }
});
