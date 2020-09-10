import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const HomePage = () => {
    return (
        <div className = "home-container">
            <div className="logo-heading">
                <img src = "favicon.png" alt="Aahar" height="200px" width="200px"></img>
                <div className="heading">
                    <div className="aahar-header">AaHar</div>
                    <div className="tagline">Serves Home Food...</div>
                </div>
            </div>
            <div className="auth">
                <Link to = "/user-register" className="auth-btn">Register</Link>
                <Link to = "/user-login" className="auth-btn">Login</Link>
            </div>
        </div>
    )
};

// HomePage.propTypes = {
//     isAuthenticated: PropTypes.bool,
//   };
//   const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated,
//   });
  export default HomePage;