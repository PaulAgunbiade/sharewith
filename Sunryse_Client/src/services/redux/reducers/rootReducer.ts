import {combineReducers} from "redux";
import toastReducer from "./toastReducer";
import otpReducer from "./otpReducer";

const rootReducer = combineReducers({
  toast: toastReducer,
  otp: otpReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
