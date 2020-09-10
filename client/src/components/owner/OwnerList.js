import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getOwners } from "../../actions/owner";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import './owner.css';
const Owners = ({ getOwners, owner: { owners, loading } }) => {
  useEffect(() => {
    getOwners();
  }, [getOwners]);
  let { user_id }= useParams(); console.log(user_id);
  return loading ? (
    <Spinner />
  ) : (
    <div className="ownerlist-container">
      <div>
        {owners.map((owner) => (
          <div key={owner._id} className="ownercard">
            <Link style={{textDecoration : "none"}} to={`/order/${user_id}/${owner._id}`}>
            <div className="medium-text-heading">{owner.service_name}</div>
            <div style={{ color: "black" }}><i>{owner.description}</i></div>
            </Link>
          </div>
        ))}
      </div>
      <img src="http://www.dsource.in/tool/trinetra/img/tool_images/2_1470640064.png" alt="food-lover" height="30%" width="30%" />
     </div>
  )
}

Owners.propTypes = {
    getOwners: PropTypes.func.isRequired,
    owner: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    owner: state.owner,
 });
export default connect(mapStateToProps, { getOwners })(Owners);
