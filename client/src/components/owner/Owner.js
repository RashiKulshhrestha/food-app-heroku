import React from "react";
import Orders from "../order/OrderList";
import NavbarOwner from "../layout/NavbarOwner";

const Owner = () => {
    return (  
      <div>
        <NavbarOwner/>
        <Orders/>
       </div>
    );
  };
    

export default Owner;