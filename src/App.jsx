import { AppProvider } from "./context/AppContext.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
  return (
    <AppProvider>
      <DashboardPage />
    </AppProvider>
  );
}

