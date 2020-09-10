import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authUser";
import "./navbar.css";
const logo = require("./aahar.png");
// eslint-disable-next-line
const NavbarUser = ({ logout}) => {
  const user_id = useParams();
  console.log(user_id);
  return (
      <nav className="navbar-bg-user">
        <Fragment>
              <div className="logo-heading">
                  <img src = {logo} alt="Aahar" height="70px" width="70px"></img>
                  <div className="heading">
                      <Link to="/">
                        <div className="aahar">AaHar</div>
                      </Link>
                  </div>
              </div>
              <ul>
                
                <li className="li-nav">
                <a onClick={logout} href="user-login">
                  <i className="fas fa-sign-out-alt"></i>{" "}
                  <span className="hide-sm">Logout</span>
                </a>
                </li>
              </ul>
        </Fragment>
      </nav>
    );
  };

NavbarUser.propTypes = {
  logout: PropTypes.func.isRequired,
};

// const mapStateToProps= (state)=>({
//     user_id: state.authUser.user_id
// });

export default connect(null,{ logout })(NavbarUser);
