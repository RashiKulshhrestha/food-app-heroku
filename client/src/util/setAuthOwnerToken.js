import axios from "axios";

const setAuthOwnerToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-authOwner-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-authOwner-token"];
  }
};

export default setAuthOwnerToken;
