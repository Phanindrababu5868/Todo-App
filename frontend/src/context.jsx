import React, { createContext, useContext, useState } from "react";

const appContext = createContext();

const ContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });
  return (
    <appContext.Provider value={{ todos, setTodos, filters, setFilters }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppState = () => useContext(appContext);

export default ContextProvider;
