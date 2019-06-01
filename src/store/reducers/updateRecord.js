import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  updateId: null,
  updating: false
};

const updateStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const updateSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.idToken,
    error: null,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_RECORD_ID:
      return updatedObject(state, { updateId: action.id });

    default:
      return state;
  }
};

export default reducer;
