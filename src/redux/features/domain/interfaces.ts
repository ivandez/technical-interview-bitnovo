export enum OrderState {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export interface OrderPayload {
  paymentState: OrderState;
}

export interface PaymentState {
  identifier: string;
  fiat_amount: number;
  currency_id: string;
  created_at: string;
  expired_time: string;
  notes: string;
  address: string;
  orderState: OrderState;
}

export interface PaymentPayload {
  identifier: string;
  fiat_amount: number;
  currency_id: string;
  created_at: string;
  expired_time: string;
  notes: string;
  address: string;
}
export interface OrderPayload {
  orderState: OrderState;
}

export interface ResetPayload {
  identifier: string;
  fiat_amount: number;
  currency_id: string;
  created_at: string;
  notes: string;
  address: string;
  orderState: OrderState;
}
