import { useCustomer } from "../contexts/CustomerContext";

function Customer() {
  const { fullName } = useCustomer();

  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
