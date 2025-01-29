import {useEffect} from "react";
import {axiosPrivate} from "../services/api/axios";
import useAuthContext from "./useAuthContext";
import {AxiosError, InternalAxiosRequestConfig, isAxiosError} from "axios";
import {useRefreshToken} from "../services/api/auth/refresh/useRefreshToken";
import {useNavigate} from "react-router-dom";

// Extend InternalAxiosRequestConfig to include 'retry flag'
interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean;
}

const useAxiosPrivate = () => {
  const navigate = useNavigate();

  const refresh = useRefreshToken();
  const {auth} = useAuthContext();

  const addAuthHeader = (
    requestConfig: InternalAxiosRequestConfig,
    accessToken?: string
  ) => {
    requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
  };

  const retryRequestWithRefresh = async (error: AxiosError) => {
    if (error.config) {
      const previousRequestConfig: RetryAxiosRequestConfig = {...error.config};

      if (!previousRequestConfig.retry) {
        previousRequestConfig.retry = true;

        const newAccessToken = await refresh.mutateAsync();
        addAuthHeader(previousRequestConfig, newAccessToken);

        return axiosPrivate(previousRequestConfig);
      } else throw error;
    } else throw error;
  };

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const isRetryRequest = "retry" in config && config.retry;
        if (!isRetryRequest) {
          addAuthHeader(config, auth.accessToken);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isAxiosError(error)) {
          const errorCode = error.response?.status;
          if (errorCode == 401) {
            try {
              return await retryRequestWithRefresh(error);
            } catch (error) {
              navigate("/login");
            }
          } else return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, location, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
