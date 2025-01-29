import {useMutation} from "react-query";

import useToast from "../../../hooks/useToast";
import {ApiError} from "../ApiError";

import {getClinicData, GetClinicDataRequestPayload} from "./clinicService";
import {useErrorLogger} from "../../../hooks/useErrorLogger";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export function useGetClinic() {
  const toastInstance = useToast();
  const logError = useErrorLogger();

  const axiosInstance = useAxiosPrivate();

  return useMutation(
    async (requestPayload: GetClinicDataRequestPayload) => {
      const response = await getClinicData(requestPayload, axiosInstance);
      return response;
    },
    {
      onSuccess: () => {},
      onError: (error: ApiError) => {
        toastInstance.error(
          "There was an error on our end, please try again soon"
        );
        logError(error);
      },
    }
  );
}
