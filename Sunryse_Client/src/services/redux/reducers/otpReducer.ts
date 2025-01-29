import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type OtpState = {
  from: string;
  email: string;
  callback: () => void;
};

const initialState: OtpState = {
  from: "",
  email: "",
  callback: () => {},
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setFrom: (state, action: PayloadAction<{from: string}>) => {
      state.from = action.payload.from;
    },
    setEmail: (state, action: PayloadAction<{email: string}>) => {
      state.email = action.payload.email;
    },
    setCallback: (state, action: PayloadAction<{callback: () => void}>) => {
      state.callback = action.payload.callback;
    },
  },
});

export const {setFrom, setEmail, setCallback} = otpSlice.actions;
export default otpSlice.reducer;
