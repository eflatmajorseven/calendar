import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username,name,lastname, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    name,
    lastname,
    email,
    password,
  });
};

const login = (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login
};