import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMenu } from "../../actions/owner";
import { useParams } from "react-router-dom";
import "./owner.css";

const AddMenu = ({ addMenu }) => {
  const [description, setDescription] = useState("");
  let { owner_id } = useParams();
  console.log(owner_id);
  return (
    <div className="add-menu-container">
      <div className="add-menu-heading">Add Menu</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMenu(owner_id, { description });
          setDescription("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add MENU Of Your Tiffin Service..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input className="add-btn" type="submit" value="Add" />
      </form>
    </div>
  );
};

AddMenu.propTypes = {
  addMenu: PropTypes.func.isRequired,
};

export default connect(null, { addMenu })(AddMenu);
