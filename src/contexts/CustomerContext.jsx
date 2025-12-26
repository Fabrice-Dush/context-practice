import { act, createContext, useContext, useReducer } from "react";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    case "customer/createdAt":
      return { ...state, createdAt: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

const CustomerContext = createContext();

export default function CustomerContextProvider({ children }) {
  const [{ fullName, nationalId, createdAt }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function createCustomer(fullName, nationalId) {
    dispatch({
      type: "customer/createCustomer",
      payload: { fullName, nationalId, createdAt: new Date().toISOString() },
    });
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
