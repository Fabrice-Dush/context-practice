import { createContext, useContext, useRef, useState } from "react";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const CustomerContext = createContext();

export default function CustomerContextProvider({ children }) {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [createdAt, setCreatedAt] = useState(() => new Date().toISOString());

  function createCustomer(fullName, nationalId) {
    setFullName(fullName);
    setNationalId(nationalId);
    setCreatedAt(new Date().toISOString());
  }

  return (
    <CustomerContext.Provider
      value={{ fullName, nationalId, createdAt, createCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);

  if (!context)
    throw new Error("Context was used outside the context provider");

  return context;
}
