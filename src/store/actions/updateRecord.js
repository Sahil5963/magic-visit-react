import * as actionTypes from "./actionTypes";
import axios from "axios";

export const updateRecordId = id => {
  return {
    type: actionTypes.UPDATE_RECORD_ID,
    id: id
  };
};

export const updateRecord = id => {
  return dispatch => {
    dispatch(updateRecordId(id));
  };
};
