import { createContext, useContext } from "react";

const AuthContext = createContext({
  isAuthenticate: false,
  login: () => {
    isAuthenticate: true;
  },
  logout: () => {
    isAuthenticate: false;
  },
});

export const useAuth = () => useContext(AuthContext);
