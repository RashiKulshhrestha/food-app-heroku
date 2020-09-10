import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRouteUser = ({
  component: Component,
  authUser: { isAuthenticatedUser, loadingUser},
  ...rest
}) => ( 
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticatedUser && loadingUser ? (
        <Redirect to="/user-login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRouteUser.propTypes = {
  authUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  
});
export default connect(mapStateToProps)(PrivateRouteUser);
