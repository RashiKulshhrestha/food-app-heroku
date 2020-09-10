import axios from "axios";
import { setAlert } from "./alert";
import setAuthUserToken from '../util/setAuthUserToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthUserToken(localStorage.token);
  }
  
  try {
    const res = await axios.get("http://localhost:5000/api/authUser");
    console.log("loadUser");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// register user
export const register = ({ name, email, mobile, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, mobile, password });
  try {
    const res = await axios.post("http://localhost:5000/api/users", body, config);
    const user_id = await axios.get(`http://localhost:5000/api/users/${email}`);
    console.log(email);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload:{res: res.data,
        user_id:user_id.data._id }
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("http://localhost:5000/api/authUser", body, config);
    const user_id = await axios.get(`http://localhost:5000/api/users/${email}`);
    console.log(email);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload:{res: res.data,
        user_id:user_id.data._id }
    });
    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
    
  }
};

// logout

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
