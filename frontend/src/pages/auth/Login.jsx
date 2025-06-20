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
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        paddingBottom: "40px",
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
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          border: "2px solidrgb(91, 165, 25)",
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
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
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
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
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
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        {error && (
          <p
            className="register-error"
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
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#cf711f")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e67e22")}
        >
          Login
        </button>

        <p
          className="login-link"
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#e67e22", fontWeight: "600" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
