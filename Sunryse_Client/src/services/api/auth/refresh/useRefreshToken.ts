import {isAxiosError} from "axios";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

import useToast from "../../../../hooks/useToast";
import useAuthContext from "../../../../hooks/useAuthContext";
import {useErrorLogger} from "../../../../hooks/useErrorLogger";

import {refreshAccessToken} from "./refreshTokenService";

export function useRefreshToken() {
  const {setAuth} = useAuthContext();

  const logError = useErrorLogger();
  const navigate = useNavigate();
  const toastInstance = useToast();

  return useMutation(
    async () => {
      const response = await refreshAccessToken();
      const accessToken = response.data.accessToken;
      return accessToken;
    },
    {
      onSuccess: (accessToken) => {
        setAuth({accessToken});
      },
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          const errorCode = error.response?.data.code;
          if (errorCode === 401) {
            setAuth({accessToken: ""});
            navigate("/login");
          } else {
            toastInstance.error("There was an error, please try again soon");
            logError(error);
          }
        } else {
          toastInstance.error("There was an error, please try again soon");
          logError(error);
        }
        navigate("/login");
      },
    }
  );
}
