import React from "react";
import Placeholder from "../../components/placeholder/Placeholder";
import SunryseLogo from "../../assets/SunryseLogoWideDetail.png";

import styles from "./ErrorOccurred.module.scss";

export default function ErrorOccurred() {
  return (
    <div className={styles.screen}>
      <Placeholder
        title={"An Error Occurred"}
        text={"Our wonderful team is on it please check back soon!"}
        button={true}
        buttonText={"Take me home"}
        onClick={() => (window.parent.location = window.parent.location.href)}
        image={SunryseLogo}
      />
    </div>
  );
}
