import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/LoginNav";

const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const { getLoggedInUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialData });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
        formData
      );

      console.log(response.data);
      setError("");
      setFormData({ ...initialData });
      localStorage.setItem("drukdragon-token", response.data.token);
      await getLoggedInUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Some error occurred");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff8f0",
        minHeight: "100vh",
        paddingBottom: "40px",
        backgroundImage:
          "linear-gradient(120deg, #ffe0c1 0%, #fff8f0 100%)",
        animation: "fadeIn 1.5s ease-in-out",
      }}
    >
      <Nav />
      <div style={{ height: "40px" }} />

      <div
        style={{
          backgroundColor: "#fff8f0",
          padding: "25px 30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(230, 126, 34, 0.15)",
          color: "#4a4a4a",
          lineHeight: "1.6",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto 30px auto",
          border: "2px solid rgba(230, 126, 34, 0.4)",
          fontSize: "1rem",
        }}
      >
        <h2
          style={{
            color: "#e67e22",
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          Craving a taste?
        </h2>
        <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
          Please log in to try the cuisine! Logging in ensures you get the full
          experience, including access to curated dishes, personalized
          recommendations, and exclusive culinary delights. Don’t miss out—your
          next favorite meal is just a click away!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="login-form"
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "40px 35px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          animation: "slideUp 1.3s ease",
        }}
      >
        <h2
          className="login-title"
          style={{
            textAlign: "center",
            color: "#e67e22",
            marginBottom: "15px",
            fontWeight: "700",
            fontSize: "2rem",
            letterSpacing: "0.03em",
          }}
        >
          Login
        </h2>

        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "16px 20px",
            fontSize: "1.1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s, transform 0.3s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#e67e22";
            e.target.style.transform = "scale(1.02)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.transform = "scale(1)";
          }}
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "16px 20px",
            fontSize: "1.1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s, transform 0.3s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#e67e22";
            e.target.style.transform = "scale(1.02)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.transform = "scale(1)";
          }}
        />

        {error && (
          <p
            style={{
              color: "#e74c3c",
              fontWeight: "600",
              textAlign: "center",
              fontSize: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#e67e22",
            color: "#fff",
            padding: "16px",
            fontSize: "1.2rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "700",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#cf711f";
            e.target.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#e67e22";
            e.target.style.transform = "scale(1)";
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", fontSize: "1rem" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#e67e22", fontWeight: "600" }}>
            Register
          </Link>
        </p>
      </form>

      {/* Keyframe styles */}
      <style>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  );
};

export default Login;
