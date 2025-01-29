import {isAxiosError} from "axios";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

import useAuthContext from "../../../../hooks/useAuthContext";
import {useErrorLogger} from "../../../../hooks/useErrorLogger";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import {logoutUser} from "./logoutService";
import useToast from "../../../../hooks/useToast";

export function useLogout() {
  const {setAuth} = useAuthContext();

  const toastInstance = useToast();
  const logError = useErrorLogger();
  const navigate = useNavigate();

  const privateAxiosInstance = useAxiosPrivate();

  return useMutation(
    async () => {
      await logoutUser(privateAxiosInstance);
    },
    {
      onSuccess: () => {
        setAuth({accessToken: ""});
        navigate("/login");
      },
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          const errorCode = error.response?.data.code;
          if (errorCode === 401) {
            navigate("/login");
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
