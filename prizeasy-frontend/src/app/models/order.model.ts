export interface OrderDetail {
  productName: string;
  quantity: number;
  pointsCost: number;
}

export interface Order {
  id: number;
  totalPoints: number;
  status: string;
  userEmail?: string;
  createdAt?: string;
  details: OrderDetail[];
}
