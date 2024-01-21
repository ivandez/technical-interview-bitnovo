import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  created_at: Date;
  notes: string;
  address: string;
  orderState: OrderState;
}

const initialState: PaymentState = {
  identifier: "",
  fiat_amount: 0,
  currency_id: "",
  created_at: new Date(),
  notes: "",
  address: "",
  orderState: OrderState.PENDING,
};

export interface PaymentPayload {
  identifier: string;
  fiat_amount: number;
  currency_id: string;
  created_at: Date;
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
  created_at: Date;
  notes: string;
  address: string;
  orderState: OrderState;
}

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<PaymentPayload>) => {
      state.identifier += action.payload.identifier;
      state.fiat_amount += action.payload.fiat_amount;
      state.currency_id += action.payload.currency_id;
      state.created_at = action.payload.created_at;
      state.address = action.payload.address;
      state.notes += action.payload.notes;
    },
    setOrderState: (state, action: PayloadAction<any>) => {
      state.orderState = action.payload.orderState;
    },
    setResetState: (state, action: PayloadAction<ResetPayload>) => {
      state.identifier += action.payload.identifier;
      state.fiat_amount += action.payload.fiat_amount;
      state.currency_id += action.payload.currency_id;
      state.created_at = action.payload.created_at;
      state.address = action.payload.address;
      state.notes += action.payload.notes;
      state.orderState = action.payload.orderState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPayment, setOrderState, setResetState } =
  paymentSlice.actions;

export default paymentSlice.reducer;
