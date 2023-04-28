import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    AuthService.getAllUsers().then(
      (response) => {
        setUsers(response);
      }
    )

    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );


    
  }, []);

  const printUsers = (users) => {
    if (!users) return null;
    return users.map(( {name }) => (
      <h2>{name}</h2>)
    )
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <h3>Users:</h3>
         {printUsers(users)}
      </header>
     </div>
  );
};


export default BoardAdmin;
