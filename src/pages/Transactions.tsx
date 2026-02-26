import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/client";
import { Button, createListCollection } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import TableTransaction from "@/components/table/TableTrans";
import type { ITransaction, IType, IUser } from "@/constant";
import TransactionDrawer from "@/components/TransactionDrawer";

const typeCollection = createListCollection({
  items: [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ],
});

export default function Transactions() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [transaction, setTransaction] = useState<ITransaction[] | null>(null);
  const [selected, setSelected] = useState<ITransaction | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [type, setType] = useState<IType>("expense");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");
  const handleDelete = useCallback(async (id: number) => {
    try {
      const res = await api.delete(`/api/transaction/${id}`);
      if (res) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTransaction((prev: any) => prev.filter((t: any) => t.id !== id));
        toaster.create({
          title: "Transaction",
          description: "Transaction removed successfully",
        });
      }
    } catch {
      toaster.create({
        title: "Error",
        description: "Failed to delete transaction",
      });
    }
  }, []);

  const handleAdd = useCallback(() => {
    setSelected(null);
    setMode("add");
    setType("expense");
    setAmount("0.00");
    setCategory("");
    setTransactionDate("");
    setUserId('');

  }, []);
  const handleEdit = useCallback((data: ITransaction) => {
    setSelected(data);
    setMode("edit");
    setType(data.type);
    setAmount(data.amount);
    setCategory(data.category);
    setTransactionDate(data.transactionDate);
    setUserId(data.userId);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const payload = {
        type,
        amount: String(Number(amount).toFixed(2)),
        category: category.trim(),
        transactionDate,
        user:+userId,
      };
      if (
        !payload.category ||
        !payload.transactionDate ||
        Number(payload.amount) <= 0
      ) {
        toaster.create({
          title: "Validation",
          description: "Fill all fields correctly",
        });
        return;
      }
      if (mode === "add") {
        const res = await api.post("/api/transaction/", payload);
        console.log(res,'create')
        const created: ITransaction = {...res?.data?.txt,email:userId};
        setTransaction((prev) => [created, ...(prev ?? [])]);
        toaster.create({
          title: "Transaction Added",
          description: "Created successfully",
        });
      }
      if (mode === "edit" && selected) {
        const res = await api.put(`/api/transaction/${selected.id}`, payload);
        const updated: ITransaction = res?.data?.data ?? {
          ...selected,
          ...payload,
          updatedAt: new Date().toISOString(),
        };
        console.log(updated.user.email,'update')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTransaction((prev: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prev.map((tx: any) => (tx.id === selected.id ? {...updated,email:updated.user.email} : tx)),
        );
        toaster.create({
          title: "Transaction Updated",
          description: "Updated successfully",
        });
      }
      setMode(null);
      setSelected(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toaster.create({
        title: "Error",
        description: error?.response?.data?.message ?? "Request failed",
      });
    }
  }, [mode, selected, type, amount, category, transactionDate,userId]);

  useEffect(() => {
    const transaction = async () => {
      const transaction = await api.get("/api/transaction/");
      setTransaction(transaction.data?.data);
    };
    transaction();
  }, []);

  const userCollection = useMemo(() => {
    return createListCollection({
      items: users.map((u) => ({
        value: String(u.id),
        label: `${u.email}`,
      })),
    });
  }, [users]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/api/auth/user");
      console.log(res.data.user, "-");
      setUsers(res.data.user ?? []);
    };
    fetchUsers();
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
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0 }}>Transactions</h2>
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <TableTransaction
          transaction={transaction}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>

      <TransactionDrawer
        mode={mode}
        setMode={setMode}
        typeCollection={typeCollection}
        type={type}
        setType={setType}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        transactionDate={transactionDate}
        setTransactionDate={setTransactionDate}
        onSubmit={handleSubmit}
        userCollection={userCollection}
        setUserId={setUserId}
        userId={userId}
      />
    </>
  );
}
