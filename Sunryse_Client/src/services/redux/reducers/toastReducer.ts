import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ToastType = "success" | "error";

type ToastState = {
  message: string;
  type: ToastType;
  isOpen: boolean;
};

type SetToastPayload = {
  message: string;
  type: ToastType;
};

const initialState: ToastState = {
  message: "",
  type: "success",
  isOpen: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<SetToastPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isOpen = true;
    },
    closeToast: (state) => {
      state.isOpen = false;
    },
  },
});

export const {setToast, closeToast} = toastSlice.actions;
export default toastSlice.reducer;
