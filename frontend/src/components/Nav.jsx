import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          Druk Food Recipe
        </Link>
      </div>
      <div >
        <Link to="/about" >
          About
        </Link>
        
        <Link to="/profile" >
          Profile
        </Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="user-info">Hi, {user.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
