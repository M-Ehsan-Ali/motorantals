import { CLEAR_OMISE_INSTANCE, SET_OMISE_INSTANCE } from "../constants";

const initialState = {
  omiseInstance: null,
};

const omiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OMISE_INSTANCE:
      return {
        ...state,
        omiseInstance: action.payload,
      };
    case CLEAR_OMISE_INSTANCE:
      return {
        ...state,
        omiseInstance: null,
      };
    default:
      return state;
  }
};

export default omiseReducer;
