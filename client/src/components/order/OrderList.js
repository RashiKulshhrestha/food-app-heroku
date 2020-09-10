import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/order";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import "./order.css";

const Orders = ({ getOrders, order: { orders, loading } }) => {
  let { owner_id } = useParams();
  console.log(owner_id);
  useEffect(() => {
    getOrders(owner_id);
  }, [getOrders, owner_id]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="order-list-container">
      <div className="order-list-header">
        <div>Order ID</div>
        <div>No. of Meals</div>
        <div>No. of Days</div>
        <div>Status</div>
      </div>
      {orders.map((order) => (
        <div className="order-list-content">
          <div>{order._id}</div>
          <div>{order.no_of_meals}</div>
          <div>{order.no_of_days}</div>
          <div>{order.status}</div>
        </div>
      ))}
      </div>
  )
}

Orders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    order: state.order,
});
export default connect(mapStateToProps, { getOrders })(Orders);
