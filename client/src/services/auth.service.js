import axios from "axios";
import authHeader from "./auth-header";

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

const getAllUsers = () => {
  return (axios.get(API_URL + "users", { headers: authHeader() })
  .then((response) => {
    console.log("users recieved")
      return response.data
  })
  .catch (()=>{
    console.log("error retrieving users")
  })
  )
};

const logout = () => {
    localStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const getSlots = () => {
    return axios.
    get(API_URL + "slots", { headers: authHeader() } )
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log("error retrieving slots")
    })
  }

  const createSlotAdmin = (name,lastname,date) => {
    //alert(name);
    return axios.
    post(API_URL + "slot", {
      name,
      lastname,
      date
    },
    { headers: authHeader() 
    }
    ).then((response) => {
          return response.data;
    });
  }; 

  const saveSlot = (id,startShift,endShift) => {
    //alert(name);
    return axios.
    post(API_URL + "saveslot", {
      id,
      startShift,
      endShift
    },
    {headers: authHeader()})
  };

  const removeUser = (id) => {
    return axios.
    delete(API_URL + "removeuser/" + id, {
      headers: authHeader()
    })
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    logout,
    getCurrentUser,
    getAllUsers,
    getSlots,
    createSlotAdmin,
    saveSlot,
    removeUser
};