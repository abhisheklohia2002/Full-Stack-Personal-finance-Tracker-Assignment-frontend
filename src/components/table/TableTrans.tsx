import type { ITransaction, IType } from "@/constant";
import React from "react";
import { Drawer, Button } from "@chakra-ui/react";
import { useAuth } from "@/auth/AuthContext";

interface IProps {
  transaction: ITransaction[] | null;
  handleDelete: (id: number) => void;
  handleEdit: (
    data: ITransaction,
    type: IType,
    amount: string,
    category: string,
    transactionDate: string,
    userId: number,
  ) => void;
}
export default function TableTransaction({
  transaction,
  handleDelete,
  handleEdit,
}: IProps) {
  const { user } = useAuth();
  return (
    <>
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
            <tr
              style={{
                backgroundColor: "black",
                color: "wheat",
              }}
            >
              <th style={{ textAlign: "left", padding: 12 }}>Date</th>
              <th style={{ textAlign: "left", padding: 12 }}>Type</th>
              <th style={{ textAlign: "left", padding: 12 }}>Category</th>
              <th style={{ textAlign: "right", padding: 12 }}>Amount</th>
              <th style={{ textAlign: "left", padding: 12 }}>User</th>
              {user?.role !== "read-only" ? (
                <th style={{ textAlign: "right", padding: 12 }}>Actions</th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {transaction?.map((t: ITransaction) => (
              <tr key={t.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 12 }}>{t.transactionDate}</td>
                <td style={{ padding: 12 }}>{t.type}</td>
                <td style={{ padding: 12 }}>{t.category}</td>
                <td style={{ padding: 12, textAlign: "right" }}>
                  {Number(t.amount).toFixed(2)}
                </td>
                <td style={{ padding: 12 }}>{t.user.email}</td>
                {user?.role !== "read-only" ? (
                  <td style={{ padding: 12, textAlign: "right" }}>
                    <Drawer.Root>
                      <Drawer.Trigger asChild>
                        <Button
                          size="sm"
                          mr={2}
                          onClick={() =>
                            handleEdit(
                              t,
                              t?.type,
                              t?.amount,
                              t?.category,
                              t?.transactionDate,
                              t.user.id,
                            )
                          }
                        >
                          Edit
                        </Button>
                      </Drawer.Trigger>
                    </Drawer.Root>
                    <Button onClick={() => handleDelete(t.id)}>Delete</Button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
