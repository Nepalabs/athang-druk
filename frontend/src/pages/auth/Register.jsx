import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/RegisterNav";

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
    try {
      e.preventDefault();
      if (formData.password !== formData.confrimPassword) {
        setError("Password and confirm password does not match");
        return;
      }
      const response = await axios.post("http://localhost:3000/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confrimPassword: formData.confrimPassword,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
      });

      console.log(response.data);
      setError("");
      setFormData({ ...initialData });
      navigate("/login");
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
          boxShadow: "0 4px 12px rgba(216, 146, 86, 0.15)",
          color: "#4a4a4a",
          lineHeight: "1.6",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto 30px auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          border: "2px solid rgb(224, 235, 214)",
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
          Discover a World of Flavor!
        </h2>
        <p>
          Join our culinary community and unlock access to a diverse menu of
          handpicked cuisines from around the world — crafted with love,
          tradition, and passion. Whether you're craving comforting classics or
          eager to explore bold new flavors, our expertly curated dishes promise
          to bring joy to your table. By registering today, you become part of a
          growing family of food lovers who value authenticity, quality, and
          unforgettable taste. Let’s embark on a flavorful journey together!
        </p>
      </div>

      {/* Form Section - Bigger and More Spacious */}
      <form
        onSubmit={handleSubmit}
        className="register-form"
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "40px 40px",
          borderRadius: "10px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
          fontSize: "1.1rem",
        }}
      >
        <h2
          className="form-header"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Create Your Account
        </h2>

        <label
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <input
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "16px 18px",
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
            placeholder="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "16px 18px",
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
              padding: "16px 18px",
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
            placeholder="Confirm Password"
            type="password"
            name="confrimPassword"
            value={formData.confrimPassword}
            onChange={handleChange}
            required
            style={{
              padding: "16px 18px",
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
            placeholder="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={{
              padding: "16px 18px",
              fontSize: "1.1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#e67e22")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <div
            className="gender-options"
            style={{ marginTop: "15px", fontSize: "1.1rem" }}
          >
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
                style={{ marginRight: "8px" }}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
              />
              Female
            </label>
          </div>
        </label>

        {error && (
          <p
            className="register-error"
            style={{
              color: "red",
              marginTop: "15px",
              fontSize: "1.05rem",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            marginTop: "30px",
            padding: "14px 24px",
            backgroundColor: "#e67e22",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "1.2rem",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#cf711f")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#e67e22")}
        >
          Register
        </button>

        <p
          className="login-link"
          style={{ marginTop: "25px", textAlign: "center", fontSize: "1.1rem" }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#e67e22", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
