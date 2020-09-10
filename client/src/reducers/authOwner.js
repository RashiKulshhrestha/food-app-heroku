import {
    REGISTER_OWNER_SUCCESS,
    REGISTER_OWNER_FAIL,
    OWNER_LOADED,
    AUTH_OWNER_ERROR,
    LOGIN_OWNER_SUCCESS,
    LOGIN_OWNER_FAIL,
    LOGOUT_OWNER,
    NO_OWNER
   } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticatedOwner: null,
    loadingOwner: true,
    owner: null,
    owner_id: ""
  };
  
  const isAuthenticatedOwner=()=>{
    let token = localStorage.getItem("token");
    let userType = localStorage.getItem("user_type");

    return token !=null && userType !=null && userType === "owner";
  }
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case OWNER_LOADED:
       
        return {
          ...state,
          isAuthenticatedOwner: isAuthenticatedOwner(),
          loadingOwner: false,
          owner: payload,
        };
      case REGISTER_OWNER_SUCCESS:
      case LOGIN_OWNER_SUCCESS:
        localStorage.setItem("token", payload.res.token);
        localStorage.setItem("user_type","owner");
        console.log("owner login");
        return {
          ...state,
          ...payload.res,
          owner_id : payload.owner_id,
          isAuthenticatedOwner: isAuthenticatedOwner(),
          loadingOwner: false,
        };
      case REGISTER_OWNER_FAIL:
      case AUTH_OWNER_ERROR:
      case LOGIN_OWNER_FAIL:
      case LOGOUT_OWNER:
      case NO_OWNER:
        console.log("owner logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
        return {
          ...state,
          token: null,
          isAuthenticatedOwner: false,
          loadingOwner: false,
        };
      default:
        return state;
    }
  }
  