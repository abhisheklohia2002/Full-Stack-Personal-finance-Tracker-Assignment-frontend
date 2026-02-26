import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e:any) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e:any) {
    e.preventDefault();
    console.log("Login payload:", form);
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Please sign in to continue</p>

        <div className="field">
          <label className="label" htmlFor="email">Email</label>
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
          <label className="label" htmlFor="password">Password</label>
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
        <button className="btn" type="submit">Sign in</button>
      </form>
    </div>
  );
}