import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/client";

type Role = "admin" | "user" | "read-only";
type IType = "income" | "expense";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface ITransaction {
  id: number;
  user: IUser;
  type: IType;
  amount: string;
  category: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}


export default function Transactions() {
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    const transaction = async () => {
      const transaction = await api.get("/api/transaction/");
      setTransaction(transaction.data?.data);
    };
    transaction();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Transactions</h2>
        </div>

        <div
          style={{
            marginTop: 12,
            border: "1px solid #eee",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#fafafa" }}>
              <tr>
                <th style={{ textAlign: "left", padding: 12 }}>Date</th>
                <th style={{ textAlign: "left", padding: 12 }}>Type</th>
                <th style={{ textAlign: "left", padding: 12 }}>Category</th>
                <th style={{ textAlign: "right", padding: 12 }}>Amount</th>
                <th style={{ textAlign: "left", padding: 12 }}>User</th>
                <th style={{ textAlign: "right", padding: 12 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transaction.map((t: ITransaction) => (
                <tr key={t.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>{t.transactionDate}</td>
                  <td style={{ padding: 12 }}>{t.type}</td>
                  <td style={{ padding: 12 }}>{t.category}</td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    {Number(t.amount).toFixed(2)}
                  </td>
                  <td style={{ padding: 12 }}>{t.user.email}</td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    <button style={{ marginRight: 8 }}>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
