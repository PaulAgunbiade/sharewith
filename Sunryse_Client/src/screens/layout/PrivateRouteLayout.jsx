import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SideNavbar from "../../components/sideNavbar/SideNavbar";

import {useRefreshToken} from "../../services/api/auth/refresh/useRefreshToken";
import styles from "./PrivateRouteLayout.module.scss";

const PrivateRouteLayout = () => {
  const refresh = useRefreshToken();

  // TODO: Determine is this is a necessary check
  // useEffect(() => {
  //   const onRefresh = async () => {
  //     await refresh.mutateAsync();
  //   };
  //   onRefresh();
  // }, []);

  return (
    <div className={styles.app}>
      <SideNavbar />
      <div className={styles.contentContainer}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouteLayout;
