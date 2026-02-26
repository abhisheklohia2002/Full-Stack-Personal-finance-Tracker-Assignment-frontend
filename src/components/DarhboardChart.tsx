import { Box, Container } from "@chakra-ui/react";
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
  Cell,
} from "recharts";

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
interface IPropsCharts {
  transactions: IIncomeExpense | null;
  category: ICategory[] | null;
  trend: ITrend[] | null;
}
const PIE_COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F97316",
  "#EF4444",
  "#06B6D4",
  "#A855F7",
];
const BAR_COLORS = ["#22C55E", "#EF4444"];
export default function DashboardCharts({
  transactions,
  category,
  trend,
}: IPropsCharts) {
  const monthly = useMemo(() => trend ?? [], [trend]);

  const byCategory = useMemo(() => {
    return (category ?? []).map((elem: ICategory) => ({
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
    <Container>
      <Box
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(12, 1fr)",
          background: "white",
          marginTop: "12px",
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
              <PieChart
                style={{
                  background: "",
                }}
              >
                <Pie
                  data={byCategory}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                >
                  {byCategory.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
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
                <Bar dataKey="value">
                  {totals.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={BAR_COLORS[idx % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
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
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Box>
    </Container>
  );
}
