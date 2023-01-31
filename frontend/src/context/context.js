import React, { useReducer } from "react";
import { AuthReducer, initialState } from "./reducer";
// context API
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

// hooks
export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("Use AuthState must be used within an auth provider.");
  }
  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("Use AuthDispatch must be used within an auth provider.");
  }
}

// function
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
