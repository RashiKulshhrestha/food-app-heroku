import axios from "axios";

const setAuthUserToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-authUser-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-authUser-token"];
  }
};

export default setAuthUserToken;
