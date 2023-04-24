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

export default {
    register
};