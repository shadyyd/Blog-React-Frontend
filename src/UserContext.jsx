/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state, initially null

  const login = (userData) => {
    setUser(userData); // Set the user data when the user logs in
  };

  const logout = () => {
    setUser(null); // Clear the user data when the user logs out
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
