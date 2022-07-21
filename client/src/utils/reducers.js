import { useReducer } from "react";
import { SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP } from "./actions";

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {

    case SHOW_MODAL_LOGIN:
      return {
        ...state,
        setShowLoginModal: !state.setShowLoginModal,
      };
    case SHOW_MODAL_SIGNUP:
      return {
        ...state,
        setShowSignupModal: !state.setShowSignupModal,
      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
