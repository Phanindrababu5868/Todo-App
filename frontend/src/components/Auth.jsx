import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [activeForm, setActiveForm] = useState("register");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data =
      activeForm === "register"
        ? { username, email, password }
        : { email, password };
    try {
      setLoading(true);
      console.log();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${activeForm}`,
        data
      );

      if (activeForm === "register") {
        alert("Registration Successful, Please Login ");
        setActiveForm("login");
        setEmail("");
        setPassword("");
        setUserName("");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/");
      }
    } catch (err) {
      alert(
        `${
          err.response.data.message ||
          err.response.data.error ||
          "something went wrong"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-section">
      <h1>My Notes</h1>
      <div id="auth-forms">
        {activeForm === "register" ? (
          <form id="register-form" onSubmit={onSubmit}>
            <h2>Register</h2>
            <input
              type="text"
              id="email"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              id="register-username"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="register-password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading} id="register-btn">
              {loading ? "Registering..." : "Register"}
            </button>

            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setPassword("");
                  setEmail("");
                  setActiveForm("login");
                }}
              >
                Login
              </span>
            </p>
          </form>
        ) : (
          <form id="login-form" onSubmit={onSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              id="login-username"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading} id="login-btn">
              {loading ? "Logging..." : "Login"}
            </button>
            <p>
              Don't have an account?
              <span
                onClick={() => {
                  setPassword("");
                  setEmail("");
                  setActiveForm("register");
                }}
              >
                {" "}
                Register
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
