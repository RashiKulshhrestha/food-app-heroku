import axios from "axios";
import { setAlert } from "./alert";
import { 
  GET_OWNERS,
  OWNER_ERROR,
  ADD_MENU,
} from "./types";

// get owners

export const getOwners = () => async(dispatch) =>{
    try {
        const res = await axios.get("http://localhost:5000/api/owners");
    
        dispatch({
          type: GET_OWNERS,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: OWNER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
}

// Add menu
export const addMenu = (owner_id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `http://localhost:5000/api/owners/${owner_id}`,
      formData,
      config
    );

    dispatch({
      type: ADD_MENU,
      payload: res.data,
    });
    dispatch(setAlert("MENU Added", "success"));
  } catch (err) {
    dispatch({
      type: OWNER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
