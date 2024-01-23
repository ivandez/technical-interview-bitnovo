import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  OrderState,
  PaymentPayload,
  PaymentState,
  ResetPayload,
} from "./domain/interfaces";

const initialState: PaymentState = {
  identifier: "",
  fiat_amount: 0,
  currency_id: "",
  created_at: "",
  notes: "",
  address: "",
  expired_time: "",
  orderState: OrderState.PENDING,
  crypto_amount: 0,
};

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
      state.expired_time += action.payload.expired_time;
      state.crypto_amount += action.payload.crypto_amount;
    },
    setOrderState: (state, action: PayloadAction<any>) => {
      state.orderState = action.payload.orderState;
    },
    setResetState: (state) => {
      state.identifier += "";
      state.fiat_amount += 0;
      state.currency_id += "";
      state.created_at = "";
      state.address = "";
      state.notes += "";
      state.orderState = OrderState.PENDING;
      state.expired_time += "";
      state.crypto_amount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPayment, setOrderState, setResetState } =
  paymentSlice.actions;

export default paymentSlice.reducer;
