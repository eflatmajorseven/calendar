import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Register from "./components/Register";
import Login from "./components/Login"

const App = () => {
  return (
    <div>
            <div className="container mt-3">
        <Switch>

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    </div>
  )
};

export default App;