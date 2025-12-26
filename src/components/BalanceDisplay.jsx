import { useAccount } from "../contexts/AccountContext";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useAccount();
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
