import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/RegisterNav";
import { registerUser } from "../../api/api";

const initialData = {
  name: "",
  email: "",
  password: "",
  confrimPassword: "",
  phoneNumber: "",
  gender: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialData });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confrimPassword) {
        setError("Password and confirm password do not match");
        return;
      }

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confrimPassword: formData.confrimPassword,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
      });

      console.log(response.data);
      setError("");
      setFormData({});
      navigate("/login");
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
        padding: " 6rem 40px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 1.2s ease-in",
      }}
    >
      <Nav />

      <div
        style={{
          backgroundColor: "#fff8f0",
          padding: " 25px 30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(230, 126, 34, 0.15)",
          color: "#4a4a4a",
          lineHeight: "1.6",
          textAlign: "center",
          maxWidth: "700px",
          width: "100%",
          fontSize: "1rem",
          marginBottom: "30px",
          border: "2px solid rgba(230, 126, 34, 0.4)",
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
          Discover a World of Flavor!
        </h2>
        <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
          Discover a World of Flavor! Join our culinary community and unlock
          access to a diverse menu of handpicked cuisines from around the world
          — crafted with love, tradition, and passion. Whether you're craving
          comforting classics or eager to explore bold new flavors, our expertly
          curated dishes promise to bring joy to your table. By registering
          today, you become part of a growing family of food lovers who value
          authenticity, quality, and unforgettable taste. Let’s embark on a
          flavorful journey together!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "white",
          padding: "40px 35px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(177, 114, 114, 0.94)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          animation: "slideUp 1.1s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#e67e22",
            fontWeight: "700",
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Register
        </h2>

        <input
          placeholder="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          name="confrimPassword"
          value={formData.confrimPassword}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div
          className="gender-options"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            fontWeight: "500",
          }}
        >
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              required
            />{" "}
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>

        {error && (
          <p
            style={{ color: "#e74c3c", textAlign: "center", fontWeight: "600" }}
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
          Register
        </button>

        <p style={{ textAlign: "center", fontSize: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#e67e22", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </form>

      {/* Animations */}
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  padding: "16px 20px",
  fontSize: "1.1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.3s, transform 0.3s",
  boxSizing: "border-box",
};

export default Register;
