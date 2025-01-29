import {captureException} from "@sentry/react";
import {useCallback} from "react";

import config from "../config";

export const useErrorLogger = () => {
  return useCallback((error: unknown) => {
    if (config.env === "production") {
      captureException(error);
    } else console.log(error);
  }, []);
};
