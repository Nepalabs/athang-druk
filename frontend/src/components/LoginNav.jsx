import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div className="nav-left">
        <Link to="/" className="logo">
          Druk Food Recipe
        </Link>
      </div>

      <div className="nav-right" style={{ position: "relative" }}>
        <div
          className="kebab-menu"
          onClick={toggleMenu}
          style={{ fontSize: "24px", cursor: "pointer", userSelect: "none" }}
        >
          &#8942;
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              right: 0,
              top: "100%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              zIndex: 10,
              marginTop: "8px",
              minWidth: "150px",
            }}
          >
            <Link
              to="/about"
              className="dropdown-item"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px",
                textDecoration: "none",
                color: "black",
              }}
            >
              About
            </Link>
            <Link
              to="/profile"
              className="dropdown-item"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px",
                textDecoration: "none",
                color: "black",
              }}
            >
              Profile
            </Link>

            {user ? (
              <div
                onClick={handleLogout}
                className="dropdown-item"
                style={{
                  display: "block",
                  padding: "10px",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                Logout
              </div>
            ) : (
              <Link
                to="/login"
                className="dropdown-item"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
