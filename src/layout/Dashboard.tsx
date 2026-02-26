import React, { useEffect, useState } from "react";
import DashboardCharts from "../components/DarhboardChart";
import Navbar from "../components/Navbar";
import api from "../api/client";
interface IIncomeExpense {
  totalIncome: number;
  totalExpense: number;
}
interface ICategory {
  category: string;
  total: number;
}
interface ITrend {
  month: string;
  expense: number;
  income: number;
}
export default function Dashboard() {
  const [transactions, setTransactions] = useState<IIncomeExpense | null>(null);
  const [catgeory, setCatgeory] = useState<ICategory[] | null>(null);
  const [trend, setTrend] = useState<ITrend[] | null>(null);

  useEffect(() => {
    const transactions = async () => {
      const data = await api.get("/api/analytics/summary/");
      setTransactions(data.data?.data ?? null);
    };
    const catgeory = async () => {
      const categoryData = await api.get("/api/analytics/category-breakdown/");
      setCatgeory(categoryData.data.data ?? null);
    };

    const trend = async () => {
      const trendData = await api.get("/api/analytics/trend/");
      console.log(trendData.data.data, "trend");
      setTrend(trendData.data.data ?? null);
    };
    transactions();
    catgeory();
    trend();
  }, []);

  return (
    <>
      <Navbar />
      <DashboardCharts
        transactions={transactions}
        category={catgeory}
        trend={trend}
      />
      ;
    </>
  );
}
