import React from "react";

import RedX from "../../assets/RedX.png";

import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  message: string;
  classname?: string;
};

export default function ErrorMessage({
  message,
  classname = "",
}: ErrorMessageProps) {
  return (
    <div className={`${styles.container} ${classname}`}>
      <img className={styles.image} src={RedX} alt="X" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
