export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface ITransaction {
  id: number;
  user: IUser;
  type: IType;
  amount: string;
  category: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  userId:string
}


export type Role = "admin" | "user" | "read-only";
export type IType = "income" | "expense";