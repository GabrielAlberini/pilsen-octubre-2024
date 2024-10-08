// src/context/UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    dni: "",
    birthDate: null,
    registerTime: null, // Añadimos el momento de registro
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { useUser };
