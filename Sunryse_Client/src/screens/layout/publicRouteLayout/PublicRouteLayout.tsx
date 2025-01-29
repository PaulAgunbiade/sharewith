import React from "react";
import {Outlet} from "react-router-dom";

import styles from "./PublicRouteLayout.module.scss";

export default function PublicRouteLayout() {
  return (
    <div className={styles.screen}>
      <Outlet />
    </div>
  );
}
