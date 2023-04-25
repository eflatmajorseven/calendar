import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

import Register from "./components/Register";
import Login from "./components/Login"
import Profile from "./components/Profile";

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);

    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>

            <div className="container mt-3">
        <Switch>

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </div>
  )
};

export default App;