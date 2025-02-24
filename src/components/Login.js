import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../components/authSlice";
import { useNavigate } from "react-router-dom";
import "./auth.css"; // Import the CSS file

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/"); // Redirect to your desired route
      }
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
