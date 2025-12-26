import AccountOperations from "./components/AccountOperations";
import BalanceDisplay from "./components/BalanceDisplay";
import CreateCustomer from "./components/CreateCustomer";
import Customer from "./components/Customer";
import { useCustomer } from "./contexts/CustomerContext";

function App() {
  const { fullName } = useCustomer();

  return (
    <div>
      {!fullName.trim().length ? (
        <CreateCustomer />
      ) : (
        <>
          <BalanceDisplay />
          <Customer />
          <AccountOperations />
        </>
      )}
    </div>
  );
}

export default App;
