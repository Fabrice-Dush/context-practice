import { useState } from "react";
import { useAccount } from "../contexts/AccountContext";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [loanBalance, setLoanBalance] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  const {
    balance,
    deposit,
    withdraw,
    requestLoan,
    payLoan,
    loanBalance: loan,
    isLoading,
  } = useAccount();

  function handleDeposit() {
    if (!depositAmount || !Number.isFinite(depositAmount)) return;
    deposit(depositAmount, currency);

    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawAmount || withdrawAmount > balance) return;
    withdraw(withdrawAmount);
    setWithdrawAmount("");
  }

  function handleRequestLoan() {
    if (!loanBalance || !loanPurpose || loan || loanBalance > balance) return;
    requestLoan(loanBalance, loanPurpose);
    setLoanBalance("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (!loan) return;
    payLoan();
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount || ""}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawAmount || ""}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            placeholder="Loan amount"
            value={loanBalance}
            onChange={(e) => setLoanBalance(Number(e.target.value))}
          />
          <input
            placeholder="Loan purpose"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {loan > 0 && (
          <div>
            <span>Pay back ${loan}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
