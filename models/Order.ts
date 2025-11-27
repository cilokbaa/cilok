export interface Order {
  transactionId: string;
  plan: string;
  amount: number;
  depositId: string;
  paymentStatus: string;
  panel?: {
    username: string;
    password: string;
    url: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
