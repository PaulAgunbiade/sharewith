import {useDispatch} from "react-redux";
import {closeToast, setToast} from "../services/redux/reducers/toastReducer";

export type ToastInstance = {
  error: (message: string) => void;
  success: (message: string) => void;
  close: (callback: () => void) => void;
};

const useToast = () => {
  const dispatch = useDispatch();

  const error = (message: string) => {
    dispatch(
      setToast({
        message,
        type: "error",
      })
    );
  };

  const success = (message: string) => {
    dispatch(
      setToast({
        message,
        type: "success",
      })
    );
  };

  const close = () => {
    dispatch(closeToast());
  };

  return {
    error,
    success,
    close,
  };
};

export default useToast;
