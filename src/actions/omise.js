// Action Types

import { CLEAR_OMISE_INSTANCE, SET_OMISE_INSTANCE } from "../constants";

// Action Creator
export const setOmiseInstance = (omiseInstance) => ({
  type: SET_OMISE_INSTANCE,
  payload: omiseInstance,
});

export const clearOmiseInstance = () => ({
  type: CLEAR_OMISE_INSTANCE,
});
