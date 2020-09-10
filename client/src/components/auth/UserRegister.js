import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/authUser";
import "./UserRegister.css";

const UserRegister = ({ setAlert,register, isAuthenticatedUser, user_id }) =>  {
    const [formData, setFormdata] = useState({
        name: "",
        email:"",
        mobile: "",
        password: "",
        confPassword:""
    });
    const onChange = (e) =>{
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
          });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            setAlert("Password do not match", "danger");
        } else {
            console.log("register");
            register({ name, email, mobile, password });
      
      };
    
    };
    const { name, email, mobile, password, confPassword } = formData;
    if (isAuthenticatedUser) {
        return <Redirect to={`/user/${user_id}`}/>;
    }
    return(
        <div className= "signup-container">
            <header className="header">
                <div className="signup-header">Signup</div>
                <Link to="/" >
                    <button className="close-window"></button>
                </Link>
            </header>
            <main>
                <div className="login-banner">Already have an account?<Link to ="/user-login">Login</Link></div>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input
                        className="input-field"
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={name}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>
                    <input
                        className="input-field"
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>
                    <input
                        className="input-field"
                        placeholder="Mobile no.- 0123456789"
                        type="text"
                        name="mobile"
                        value={mobile}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>
                    <input 
                        className="input-field"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>
                    <input
                        className="input-field"
                        placeholder="Confirm Password"
                        type="password"
                        name="confPassword"
                        value={confPassword}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>
                    <input
                        className="signup-btn"
                        type="submit"
                        value="Signup"/>
                    <div>--------------------------or--------------------------</div>
                    <Link to="/partner-with-us">
                        <button className="ownersignup-btn">Partner with us</button>
                    </Link>
                </form>
            </main>
        </div>
    )
    
}

UserRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };
  const mapStateProps = (state) => ({
    isAuthenticatedUser: state.authUser.isAuthenticatedUser,
    user_id : state.authUser.user_id
  });
  export default connect(mapStateProps,{ setAlert, register })(UserRegister);