import {useMutation} from "react-query";
import {useSelector} from "react-redux";
import {isAxiosError} from "axios";

import useToast from "../../../../hooks/useToast";
import {useErrorLogger} from "../../../../hooks/useErrorLogger";

import {RootState} from "../../../redux/reducers/rootReducer";
import {OtpVerifierRequestPayload, verifyOtp} from "./otpService";

export function useVerifyOtp() {
  const logError = useErrorLogger();
  const toastInstance = useToast();

  const {callback} = useSelector((state: RootState) => state.otp);

  return useMutation(
    async (requestData: OtpVerifierRequestPayload) => {
      await verifyOtp(requestData);
    },
    {
      onSuccess: async () => {
        callback();
      },
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          const errorCode = error.response?.data.code;
          if (errorCode === 401) {
            toastInstance.error("The one time password is incorrect");
          } else if (errorCode === 403) {
            toastInstance.error(
              "The one time password has expired, please request a new one"
            );
          } else {
            toastInstance.error(
              "There was an error, please request another one time password"
            );
            logError(error);
          }
        } else {
          toastInstance.error("There was an error, please try again soon");
          logError(error);
        }
      },
    }
  );
}
