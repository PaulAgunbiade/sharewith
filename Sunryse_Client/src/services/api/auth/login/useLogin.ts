import {isAxiosError} from "axios";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

import useToast from "../../../../hooks/useToast";
import useOtp from "../../../../hooks/useOtp";
import useAuthContext from "../../../../hooks/useAuthContext";
import {useErrorLogger} from "../../../../hooks/useErrorLogger";

import {loginUser} from "./loginService";
import {LoginRequestPayload} from "./loginService";

export function useLogin() {
  const otpInstance = useOtp();
  const {setAuth} = useAuthContext();

  const logError = useErrorLogger();
  const toastInstance = useToast();
  const navigate = useNavigate();

  return useMutation(
    async (requestPayload: LoginRequestPayload) => {
      const response = await loginUser(requestPayload);
      return {response, email: requestPayload.data.email};
    },
    {
      // TODO: The usage of our OTP screen could probably be more intuitive
      onSuccess: ({response, email}) => {
        const accessToken = response.data.accessToken;

        otpInstance.storeFrom("/login");
        otpInstance.storeEmail(email);
        otpInstance.storeCallback(() => {
          setAuth({accessToken});
          navigate("/home");
        });

        navigate("/otp");
      },
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          const errorCode = error.response?.data.code;
          if (errorCode === 404) {
            toastInstance.error("This email is not registered with an account");
          } else if (errorCode === 401) {
            toastInstance.error("Incorrect email or password");
          } else {
            toastInstance.error("There was an error, please try again soon");
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
