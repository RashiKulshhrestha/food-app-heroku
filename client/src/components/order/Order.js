import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {placeOrder} from "../../actions/order";
import "./order.css";

import "react-datepicker/dist/react-datepicker.css";

const Order = ({ placeOrder }) => {
  const [formData, setFormdata] = useState({
      no_of_meals: "",
      start_date: "",
      end_date: "",
  });
  const onChange = (e) =>{
      setFormdata({
          ...formData,
          [e.target.name]: e.target.value,
        });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    placeOrder({ no_of_meals, no_of_days,start_date,end_date, total_amount,user_id, owner_id });
    setFormdata({
      no_of_meals: "",
      start_date: "",
      end_date: "",
  });
  };
let {user_id} = useParams();
let { owner_id } = useParams();
const calculateDays = (start_date, end_date) =>{
    if (!moment.isMoment(start_date)) start_date = moment(start_date);
    if (!moment.isMoment(end_date)) end_date = moment(end_date);

    return end_date.diff(start_date, "days")+1;
  };
  const totalAmount = (no_of_meals,no_of_days) => {
    return (no_of_meals*80*no_of_days);
  };
  const { no_of_meals,
          start_date,
          end_date} = formData;
  const no_of_days = calculateDays(start_date,end_date);
  let total_amount = totalAmount(no_of_meals,no_of_days);
    return (  
      <div className= "placeorder-container">
        <div className="order-heading">Place your Order</div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="field-content">
            <label>Meals</label>
            <input
              type="text"
              value = {no_of_meals}
              name="no_of_meals"
              onChange={(e) => onChange(e)}>
            </input>
          </div>

          <div className="field-content">
            <label>Start Date</label>
            <DatePicker
            onChange={(e) => setFormdata({...formData,start_date : e})}
            minDate= {new Date()}
            value = {start_date}
            name = "start_date"
            selected = {start_date}/>
          
            <label>End Date</label>
            <DatePicker
            onChange={(e) => setFormdata({...formData,end_date: e})}
            minDate={start_date}
            value = {end_date}
            name = "end_date"
            selected = {end_date}/>
          </div>

          <div className="order-details">
            <label value={no_of_days} name= "no_of_days" >Total Number of Days : {no_of_days} days</label>
            <label>Cost of one meal :  <i className="fa fa-inr"></i>80.</label>
            <label >Amount to be paid : <i className="fa fa-inr"></i> {total_amount}</label>
          </div>
          
          <input
            className="signup-btn"
            type="submit"
            value="Order Now"/>
         </form>
      </div>
    );
};
    
Order.propTypes = {
  placeOrder: PropTypes.func.isRequired,
};

export default connect(null,{ placeOrder })(Order);