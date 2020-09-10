import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/authOwner";
import "./ownerRegister.css";

const OwnerRegister = ({ setAlert,register, isAuthenticatedOwner, owner_id }) =>  {
    const [formData, setFormdata] = useState({
        service_name: "",
        owner_name: "",
        email:"",
        mobile: "",
        password: "",
        confPassword:"",
        address: "",
        city: "",
        postal_code: ""
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
            register({ service_name,
                owner_name,
                email,
                mobile,
                password,
                confPassword,
                address,
                city,
                postal_code
            });
      };
    };
    const { service_name,
        owner_name,
        email,
        mobile,
        password,
        confPassword,
        address,
        city,
        postal_code
    } = formData;
    if (isAuthenticatedOwner) {
        return <Redirect to={`/owner/${owner_id}`} />;
    }
    return(
        <div className="owner-signup-container">
            <section className="tag-box">
                <header>
                    <div className="logo-heading">
                            <img src = "favicon.png" alt="Aahar" height="70px" width="70px"></img>
                            <div className="heading">
                                <div className="aahar">AaHar</div>
                                <div className="aahar-tagline">Serves Home Food...</div>
                            </div>
                    </div>
                </header>
                <div className="partner-tagline">
                    <h3>"Join us to serve HOME FOOD</h3>
                    <h3>to our Customers"</h3>
                </div>
                <img src="https://www.searchpng.com/wp-content/uploads/2019/01/Delivery-Boy-Clipart-Png.png" alt="delivery-boy" height="400px" width="360px"/>
            </section>
            <section className="form">
                <h1>Partner with us</h1>
                <form className="form-input" onSubmit={(e) => onSubmit(e)}>

                    <label className="owner-signup-label">1.Tiffin Service Name</label>
                    <input
                        className="owner-signup-input"
                        type="text"
                        name="service_name"
                        value={service_name}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">2.Owner Name</label>
                    <input 
                        className="owner-signup-input"
                        type="text"
                        name="owner_name"
                        value={owner_name}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">3.Mobile Number</label>
                    <input
                        className="owner-signup-input"
                        type="text"
                        name="mobile"
                        value={mobile}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">4.Owner Email ID</label>
                    <input
                        className="owner-signup-input"
                        type="text"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">5.Password</label>
                    <input
                        className="owner-signup-input"
                        type="password"
                        name="password"
                        value={password}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">6.Confirm Password</label>
                    <input
                        className="owner-signup-input"
                        type="password"
                        name="confPassword"
                        value={confPassword}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">7.Address</label>
                    <input
                        className="owner-signup-input"
                        type="text"
                        name="address"
                        value={address}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">8.City</label>
                    <input
                        className="owner-signup-input"
                        type="text"
                        name="city"
                        value={city}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <label className="owner-signup-label">9.zip/Postal Code</label>
                    <input
                        className="owner-signup-input"
                        type="text"
                        name="postal_code"
                        value={postal_code}
                        required
                        onChange={(e) => onChange(e)}>
                    </input>

                    <input
                    id="owner-signup-btn"
                    type="submit"
                    value="Signup"/>    

                </form>
            </section>
        </div>
    )
}

OwnerRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };
  const mapStateProps = (state) => ({
    isAuthenticatedOwner: state.authOwner.isAuthenticatedOwner,
    owner_id : state.authOwner.owner_id
  });
  export default connect(mapStateProps,{ setAlert, register })(OwnerRegister);