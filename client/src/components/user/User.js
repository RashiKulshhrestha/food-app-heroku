import React from "react";
import Owners from "../owner/OwnerList";
import NavbarUser from "../layout/NavbarUser";

const User = () => {
    return (  
      <div>
        <NavbarUser/>
        <Owners/>
       </div>
    );
  };
    

export default User;