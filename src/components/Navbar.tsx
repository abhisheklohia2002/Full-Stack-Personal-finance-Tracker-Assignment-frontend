import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  appName = "Finance Tracker",
  current = "dashboard",
}) {
  const { logout, user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linkStyle = (key:any) => ({
    padding: "10px 12px",
    borderRadius: 10,
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid transparent",
    background: current === key ? "#f3f4f6" : "transparent",
    color: "#111827",
    fontWeight: current === key ? 600 : 500,
  });
  const navigate = useNavigate()
  const onNavigate = (nav: string) => {
        navigate(nav)
  };
  const onLogout = () => {
    logout();
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "white",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid #eee",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            ₹
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
              {appName}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Track. Budget. Grow.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span
            style={linkStyle("dashboard")}
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </span>
          <span
            style={linkStyle("transactions")}
            onClick={() => onNavigate("transactions")}
          >
            Transactions
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              padding: "6px 10px",
              border: "1px solid #eee",
              borderRadius: 12,
              fontSize: 13,
              color: "#111827",
              background: "#fafafa",
            }}
          >
            <span style={{ fontWeight: 700 }}>
              {user?.firstName + " " + user?.lastName}
            </span>{" "}
            <span style={{ color: "#6b7280" }}>({user?.role})</span>
          </div>

          <button
            onClick={onLogout}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #eee",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
