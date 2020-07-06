import React from "react";

const authentication = {
  isLogin: false,
  email: null
}

const login = (email) => {
  authentication.isLogin = true;
  authentication.email = email;
}

const logout = () => {
  authentication.isLogin = false;
  authentication.email =  null;
}

export const UserContext = React.createContext({
  authentication,
  login,
  logout
}
);