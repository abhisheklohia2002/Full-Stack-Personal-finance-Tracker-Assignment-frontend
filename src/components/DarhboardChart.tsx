import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

interface IIncomeExpense{
totalIncome:number,
totalExpense:number
}
interface ICategory{
    category:string;
    total:number
}
interface ITrend {
  month: string;
  expense: number;
  income: number;
}
interface IPropsCharts {
    transactions:IIncomeExpense | null
    category:ICategory[] | null
    trend:ITrend[] | null
}
export default function DashboardCharts({ transactions, category,trend }:IPropsCharts) {
  const monthly = useMemo(
    () => trend ?? [],
    [trend],
  );

    const byCategory = useMemo(() => {
    return (category ?? []).map((elem:ICategory) => ({
      name: elem.category,
      value: Number(elem.total ?? 0),
    }));
  }, [category]);

  const totals = useMemo(
    () => [
      { name: "Income", value: transactions?.totalIncome },
      { name: "Expense", value: transactions?.totalExpense },
    ],
    [transactions],
  );

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      <div
        style={{
          gridColumn: "span 6",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 12,
        }}
      >
        <h3>Expense by Category</h3>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={byCategory}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          gridColumn: "span 6",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 12,
        }}
      >
        <h3>Income vs Expense</h3>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={totals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        style={{
          gridColumn: "span 12",
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 12,
        }}
      >
        <h3>Monthly Trends</h3>
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" />
              <Line type="monotone" dataKey="expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
