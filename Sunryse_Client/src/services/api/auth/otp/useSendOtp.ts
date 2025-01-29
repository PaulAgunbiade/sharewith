import {useMutation} from "react-query";

import useToast from "../../../../hooks/useToast";

import {OtpSenderRequestPayload, sendOtp} from "./otpService";
import {useErrorLogger} from "../../../../hooks/useErrorLogger";

export function useSendOtp() {
  const logError = useErrorLogger();
  const toastInstance = useToast();

  return useMutation(
    async (requestPayload: OtpSenderRequestPayload) => {
      await sendOtp(requestPayload);
    },
    {
      onSuccess: () => {
        toastInstance.success("One time password has been sent");
      },
      onError: (error: unknown) => {
        toastInstance.error(
          "There was an error on our end, please try again soon"
        );
        logError(error);
      },
    }
  );
}
