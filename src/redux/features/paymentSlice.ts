import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
  identifier: string;
  fiat_amount: number;
  currency_id: string;
  created_at: Date;
  notes: string;
  address: string;
}

const initialState: PaymentState = {
  identifier: "",
  fiat_amount: 0,
  currency_id: "",
  created_at: new Date(),
  notes: "",
  address: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<PaymentState>) => {
      state.identifier += action.payload.identifier;
      state.fiat_amount += action.payload.fiat_amount;
      state.currency_id += action.payload.currency_id;
      state.created_at = action.payload.created_at;
      state.address = action.payload.address;
      state.notes += action.payload.notes;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
