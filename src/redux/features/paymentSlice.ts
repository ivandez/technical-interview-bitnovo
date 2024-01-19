import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
  identifier: string;
}

const initialState: PaymentState = {
  identifier: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<string>) => {
      state.identifier += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
