import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

import Register from "./components/Register";
import Login from "./components/Login"
import Profile from "./components/Profile";
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Calendar from "./components/Calendar";
import Slot from "./components/Slot";
import UserDelete from "./components/UserDelete";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    
  };

  return (
    <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Calendar
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/userdelete"} className="nav-link">
                Users' manager
              </Link>
            </li>
          )}
          
          {currentUser && (

            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
              </li>
              
          )}
          {currentUser && (

         <li className="nav-item">
               <Link to={"/calendar"} className="nav-link">
               Calendar
             </Link>
              </li>  
          )}
          {currentUser && (

         <li className="nav-item">
               <Link to={"/chart"} className="nav-link">
               Chart
             </Link>
              </li>  
          )}
        </div>
        

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={logOut}>
                LogOut
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

            <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/calendar" component={Calendar}/>
          <Route path="/slot" component={Slot}/>
          <Route path="/userdelete" component={UserDelete}/>
        </Switch>
      </div>
      { <AuthVerify logOut={logOut}/> }
    </div>
  )
};

export default App;