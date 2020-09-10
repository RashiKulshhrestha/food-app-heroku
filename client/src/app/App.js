import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../components/auth/Home";

import { Provider } from "react-redux";
import store from "../store";
import { Routes } from "../components/routing/Routes";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};


export default App;
