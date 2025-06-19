import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import About from "../pages/About";
import Profile from "../pages/auth/Profile";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && isLoggedIn) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/about" Component={About} />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
