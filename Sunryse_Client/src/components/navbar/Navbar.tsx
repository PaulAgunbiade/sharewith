import React, {useCallback} from "react";
import {useState, useEffect} from "react";

import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import LockIcon from "@mui/icons-material/Lock";

import {GetClinicDataRequestPayload} from "../../services/api/clinic/clinicService";
import {useGetClinic} from "../../services/api/clinic/useGetClinic";
import {useLogout} from "../../services/api/auth/logout/useLogout";

import styles from "./Navbar.module.scss";

type NavbarClinicDataResponsePayload = {
  data: {
    account: {email: string};
  };
};

export default function Navbar() {
  const [clinicName, setClinicName] = useState("");

  const getClinicData = useGetClinic();
  const logoutUser = useLogout();

  const getClinicName = useCallback(
    async (payload: GetClinicDataRequestPayload) => {
      const response: NavbarClinicDataResponsePayload =
        await getClinicData.mutateAsync(payload);
      setClinicName(response.data.account.email);
    },
    [getClinicData]
  );

  const logout = useCallback(async () => {
    await logoutUser.mutateAsync();
  }, [logoutUser]);

  useEffect(() => {
    const payload = {data: {fields: ["account.email"]}};
    getClinicName(payload);
  }, []);

  function Notifications() {
    return (
      <div className={styles.iconContainer}>
        <NotificationsIcon className={styles.icon} fontSize="medium" />
      </div>
    );
  }
  function Logout() {
    return (
      <div className={styles.iconContainer}>
        <LockIcon className={styles.icon} onClick={() => logout()} />{" "}
      </div>
    );
  }
  return (
    <div className={styles.navBarContainer}>
      <p className={styles.clinicName}>{clinicName}</p>
      <div className={styles.navOptionsContainer}>
        <Notifications />
        <Logout />
      </div>
    </div>
  );
}
