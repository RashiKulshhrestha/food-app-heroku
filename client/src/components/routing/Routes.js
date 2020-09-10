import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRouteOwner from "./PrivateRouteOwner";
import PrivateRouteUser from "./PrivateRouteUser";
import UserRegister from "../auth/UserRegister";
import User from "../user/User";
import OwnerRegister from "../auth/OwnerRegister";
import Owner from "../owner/Owner";
import UserLogin from "../auth/UserLogin";
import OwnerLogin from "../auth/OwnerLogin";
import Order from "../order/Order";
import AddMenu from "../owner/AddMenu";
import { NotFound } from "../layout/NotFound";
import Alert from "../layout/Alert";

export const Routes = () => {
    return(
        <section>
            <Alert />
            <Switch>
                <Route exact path="/user-register" component={UserRegister}></Route>
                <PrivateRouteUser exact path="/user/:user_id" component={User}></PrivateRouteUser>
                <PrivateRouteUser exact path="/order/:user_id/:owner_id" component={Order}></PrivateRouteUser>
                <Route exact path="/partner-with-us" component={OwnerRegister}></Route>
                <PrivateRouteOwner exact path="/owner/:owner_id" component={Owner}></PrivateRouteOwner>
                <PrivateRouteOwner exact path="/add-menu/:owner_id" component={AddMenu}></PrivateRouteOwner>
                <Route exact path="/user-login" component={UserLogin}></Route>
                <Route exact path="/owner-login" component={OwnerLogin}></Route>
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};