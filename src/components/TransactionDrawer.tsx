import React from "react";
import { Box, Button, Drawer, Input, Select } from "@chakra-ui/react";
import type { IType } from "@/constant";

type Mode = "add" | "edit" | null;

type Props = {
  mode: Mode;
  setMode: (m: Mode) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeCollection: any;
  type: IType;
  setType: (v: IType) => void;
  amount: string;
  setAmount: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  transactionDate: string;
  setTransactionDate: (v: string) => void;
  onSubmit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userCollection: any;
  userId: string;
  setUserId: (v: string) => void;
};

export default function TransactionDrawer({
  mode,
  setMode,
  typeCollection,
  type,
  setType,
  amount,
  setAmount,
  category,
  setCategory,
  transactionDate,
  setTransactionDate,
  onSubmit,
  userCollection,
  userId,
  setUserId,
}: Props) {
  return (
    <Drawer.Root
      open={mode !== null}
      onOpenChange={(e) => !e.open && setMode(null)}
    >
      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.CloseTrigger />

          <Drawer.Header>
            <Drawer.Title>
              {mode === "add" ? "Add Transaction" : "Edit Transaction"}
            </Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Box display="grid" gap={4}>
              <Box>
                <Select.Root
                  collection={typeCollection}
                  value={[type]}
                  onValueChange={(details) => {
                    const v = details.value?.[0] as IType | undefined;
                    if (v) setType(v);
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Type</Select.Label>

                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select type" />
                    </Select.Trigger>

                    <Select.IndicatorGroup>
                      <Select.Indicator />
                      <Select.ClearTrigger />
                    </Select.IndicatorGroup>
                  </Select.Control>

                  <Select.Positioner>
                    <Select.Content>
                      {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        typeCollection.items.map((item: any) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                          </Select.Item>
                        ))
                      }
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Box>

              <Box>
                <Box>Amount</Box>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>

              <Box>
                <Box>Category</Box>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Box>

              <Box>
                <Box>Date</Box>
                <Input
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                />
              </Box>

              <Box>
              {mode === "add" ? (
                <Select.Root
                  collection={userCollection}
                  value={userId ? [userId] : []}
                  onValueChange={(details) => {
                    setUserId(details.value?.[0] ?? "");
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Label>User</Select.Label>

                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select user" />
                    </Select.Trigger>

                    <Select.IndicatorGroup>
                      <Select.Indicator />
                      <Select.ClearTrigger />
                    </Select.IndicatorGroup>
                  </Select.Control>

                  <Select.Positioner>
                    <Select.Content>
                      {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        userCollection.items.map((item: any) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                          </Select.Item>
                        ))
                      }
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              ) : null}

                
              </Box>
            </Box>
          </Drawer.Body>

          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </Drawer.CloseTrigger>

            <Button colorScheme="blue" onClick={onSubmit}>
              {mode === "add" ? "Create" : "Save"}
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
