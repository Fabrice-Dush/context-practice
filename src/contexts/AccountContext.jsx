import { createContext, useContext, useState } from "react";

const initialState = {
  balance: 0,
  loanBalance: 0,
  loanPurpose: "",
  isLoading: false,
  error: "",
};

const AccountContext = createContext();

export default function AccountContextProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const [loanBalance, setLoanBalance] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function deposit(amount, currency) {
    try {
      if (currency === "USD") return setBalance((balance) => balance + amount);

      setIsLoading(true);

      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );
      const data = await res.json();
      const convertedAmount = amount * data.rates?.["USD"];

      setBalance((balance) => balance + convertedAmount);
      setIsLoading(false);
    } catch (err) {
      setError(err.message ?? err);
      setIsLoading(false);
    }
  }

  function withdraw(amount) {
    setBalance((balance) => balance - amount);
  }

  function requestLoan(amount, purpose) {
    setLoanBalance(amount);
    setLoanPurpose(purpose);
    setBalance((balance) => balance + amount);
  }

  function payLoan() {
    setBalance((balance) => balance - loanBalance);
    setLoanBalance(0);
    setLoanPurpose("");
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
        error,
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
