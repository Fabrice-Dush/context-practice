import { act, createContext, useContext, useReducer, useState } from "react";

const initialState = {
  balance: 0,
  loanBalance: 0,
  loanPurpose: "",
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      if (action.payload > state.balance) return state;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loanBalance || action.payload.loanBalance > state.balance)
        return state;
      return {
        ...state,
        loanBalance: action.payload.loanBalance,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.loanBalance,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loanBalance,
        loanBalance: 0,
        loanPurpose: "",
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    case "account/error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

const AccountContext = createContext();

export default function AccountContextProvider({ children }) {
  const [{ balance, loanBalance, loanPurpose, isLoading }, dispatch] =
    useReducer(reducer, initialState);

  async function deposit(amount, currency) {
    try {
      if (currency === "USD")
        return dispatch({ type: "account/deposit", payload: amount });

      dispatch({ type: "account/convertingCurrency" });
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );
      const data = await res.json();
      const convertedAmount = amount * data.rates?.["USD"];

      dispatch({ type: "account/deposit", payload: convertedAmount });
    } catch (err) {
      dispatch({ type: "account/error", payload: err.message ?? err });
    }
  }

  function withdraw(amount) {
    dispatch({ type: "account/withdraw", payload: amount });
  }

  function requestLoan(amount, purpose) {
    dispatch({
      type: "account/requestLoan",
      payload: { loanBalance: amount, loanPurpose: purpose },
    });
  }

  function payLoan() {
    dispatch({ type: "account/payLoan" });
  }

  return (
    <AccountContext.Provider
      value={{
        balance,
        loanBalance,
        loanPurpose,
        deposit,
        withdraw,
        requestLoan,
        payLoan,
        isLoading,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error("Account context was used outside the account provider");

  return context;
}
