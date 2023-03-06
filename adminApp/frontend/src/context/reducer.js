let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

export const initialState = {
  userDetail: null || user,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST LOGIN":
      return {
        ...initialState,
      };
    case "LOGIN SUCCESS":
      return {
        ...initialState,
        userId: action.payload.user
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
      };
    default:
      throw new Error("Unhandled Action");
  }
};
