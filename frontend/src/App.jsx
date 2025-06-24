import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import axios from "./config/axiosConfig";

function App() {
  const [healthStatus, setHealthStatus] = useState("Checking...");

  useEffect(() => {
    axios
      .get("/health")
      .then((response) => setHealthStatus(response.data))
      .catch(() => setHealthStatus("Failed to fetch health status"));
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
