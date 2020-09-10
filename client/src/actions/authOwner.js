import axios from "axios";
import { setAlert } from "./alert";
import setAuthOwnerToken from '../util/setAuthOwnerToken';
import {
  REGISTER_OWNER_SUCCESS,
  REGISTER_OWNER_FAIL,
  OWNER_LOADED,
  AUTH_OWNER_ERROR,
  LOGIN_OWNER_SUCCESS,
  LOGIN_OWNER_FAIL,
  LOGOUT_OWNER,
} from "./types";

export const loadOwner = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthOwnerToken(localStorage.token);
  }
  
  try {
    console.log("before loadOwner");
    const res = await axios.get("http://localhost:5000/api/authOwner");
    console.log("loadOwner");
    dispatch({
      type: OWNER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_OWNER_ERROR,
    });
  }
};

// register owner
export const register = ({ service_name,
  owner_name,
  email,
  mobile,
  password,
  address,
  city,
  postal_code 
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ service_name,
    owner_name,
    email,
    mobile,
    password,
    address,
    city,
    postal_code });
  try {
    const res = await axios.post("http://localhost:5000/api/owners", body, config);
    const ownerID = await axios.get(`http://localhost:5000/api/owners/${email}`);
    dispatch({
      type: REGISTER_OWNER_SUCCESS,
      payload:{res: res.data,
        owner_id:ownerID.data._id }
    });
    dispatch(loadOwner());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_OWNER_FAIL,
    });
  }
};

// login owner
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("http://localhost:5000/api/authOwner", body, config);
    const ownerID = await axios.get(`http://localhost:5000/api/owners/${email}`);
    console.log(email);
    console.log(ownerID);
    dispatch({
      type: LOGIN_OWNER_SUCCESS,
      payload:{res: res.data,
      owner_id:ownerID.data._id }

    });
    // dispatch(loadOwner());
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_OWNER_FAIL,
    });
  }
};


// logout

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_OWNER,
  });
};
