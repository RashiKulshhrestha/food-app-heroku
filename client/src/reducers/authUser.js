import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
   } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticatedUser: false,
    loadingUser: true,
    user: null,
    user_id: ""
  };
  
  const isAuthenticatedUser=()=>{
    let token = localStorage.getItem("token");
    let userType = localStorage.getItem("user_type");

    return token !=null && userType !=null && userType === "user";
  }
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticatedUser: isAuthenticatedUser(),
          loadingUser: false,
          user: payload,
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem("token", payload.res.token); 
        localStorage.setItem("user_type", "user");
        console.log("User login");
        return {
          ...state,
          ...payload.res,
          user_id : payload.user_id,
          isAuthenticatedUser: isAuthenticatedUser(),
          loadingUser: false,
        };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        console.log("user logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
        return {
          ...state,
          token: null,
          isAuthenticatedUser: false,
          loadingUser: false,
        };
      default:
        return state;
    }
  }
  