import React, { useState } from "react";
import "./login.css";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Please sign in to continue</p>

        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="row">
          <label className="checkbox">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember me
          </label>
        </div>
        <button className="btn" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
