import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ORDERS,
  ORDER_ERROR,
  PLACE_ORDER
} from "./types";

// get orders

export const getOrders = (owner_id) => async(dispatch) =>{
    try {
      console.log(owner_id);
        const res = await axios.get(`http://localhost:5000/api/orders/${owner_id}`);
        console.log(res.data);
        dispatch({
          type: GET_ORDERS,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: ORDER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
};

// Place Order
export const placeOrder = ({  
  no_of_meals,
  no_of_days,
  start_date,
  end_date,
  total_amount,
  user_id,
  owner_id 
}) => async(dispatch) =>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(
    {no_of_meals,
    no_of_days,
    start_date,
    end_date,
    total_amount,
    user_id,
    owner_id});
  try {
      const res = await axios.post("http://localhost:5000/api/orders",body,config);
      console.log(res.data);
      dispatch({
        type: PLACE_ORDER,
        payload: res.data,
      });
      dispatch(setAlert("ORDER PLACED", "success"));
    } catch (err) {
      console.error(err.response.data.errors);
      const errors = err.response.data.errors;
      if (errors) {
        
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        
      }
      dispatch({
        type: ORDER_ERROR,
      });
    }
}
