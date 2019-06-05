import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };

    axios
      .post("http://13.59.190.116/api/v1/login", authData)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch(authSuccess(response.data.token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    }
    dispatch(authSuccess(token));
  };
};
