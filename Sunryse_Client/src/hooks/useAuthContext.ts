import {useContext} from "react";
import AuthContext from "../services/context/authContext/AuthContext";
import {AuthContextData} from "../services/context/authContext/authContextTypes";

const useAuthContext = (): AuthContextData => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("No AuthContext.Provider found when calling useAuth.");

  return authContext;
};

export default useAuthContext;
