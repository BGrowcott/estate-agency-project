import { useReducer } from "react";
import {
  PROPERTY_VIEW,
  SHOW_MODAL_LOGIN,
  SHOW_MODAL_SIGNUP,
  SHOW_MODAL_UPDATE,
  SHOW_MODAL_UPDATE_USER,
  SHOW_MODAL_CONTACTS,
  SELECTED_UPDATE_PROPERTY,
  SHOW_MODAL_DELETE,
  DOB,
} from "./actions";

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
    case SHOW_MODAL_UPDATE:
      return {
        ...state,
        setShowUpdateModal: !state.setShowUpdateModal,
      };
    case SHOW_MODAL_UPDATE_USER:
      return {
        ...state,
        setShowUpdateUserModal: !state.setShowUpdateUserModal,
      };
    case SHOW_MODAL_CONTACTS:
      return {
        ...state,
        setShowContactsModal: !state.setShowContactsModal,
      };
    case SHOW_MODAL_DELETE:
      return {
        ...state,
        setShowDeleteModal: !state.setShowDeleteModal,
      };
    case PROPERTY_VIEW:
      return {
        ...state,
        propertyView: [...action.propertyView],
      };
    case SELECTED_UPDATE_PROPERTY:
      return {
        ...state,
        selectedUpdateProperty: action.property,
      };
    case DOB:
      return {
        ...state,
        dob: action.selectedDob,
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
