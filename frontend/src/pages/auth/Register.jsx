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
        setError("Password and confirm password doesnt not match");
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
      setFormData({});
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "some error occured");
    }
  };

  return (
    <div>
      <>
        <Nav />
      </>

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
          Discover a World of Flavor!
        </h2>
        <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
          Join our culinary community and unlock access to a diverse menu of
          handpicked cuisines from around the world — crafted with love,
          tradition, and passion. Whether you're craving comforting classics or
          eager to explore bold new flavors, our expertly curated dishes promise
          to bring joy to your table. By registering today, you become part of a
          growing family of food lovers who value authenticity, quality, and
          unforgettable taste. Let’s embark on a flavorful journey together!
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <h2
            style={{
              color: "#e67e22",
              marginBottom: "15px",
              fontWeight: "700",
              fontSize: "2rem",
              letterSpacing: "0.05em",
            }}
          >
            Register
          </h2>
          <label
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
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Password"
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              placeholder="ConfrimPassword"
              type="text"
              name="confrimPassword"
              value={formData.confrimPassword}
              onChange={handleChange}
              required
            />

            <input
              placeholder="PhoneNumber"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required
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
                />
                Female
              </label>
            </div>
          </label>
          {error && <p className="register-error"> {error}</p>}
          <button type="submit">Register</button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
