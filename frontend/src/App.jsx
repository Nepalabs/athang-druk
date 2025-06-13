import { useEffect, useState } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  const [healthStatus, setHealthStatus] = useState("Checking...");

  useEffect(() => {
    axios
      .get("http://localhost:3000/health")
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
