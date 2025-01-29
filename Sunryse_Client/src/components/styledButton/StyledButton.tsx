import React from "react";

import styles from "./StyledButton.module.scss";

type StyledButtonProps = {
  baseClassname?: string;
  disabledClassname?: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
};

export default function StyledButton({
  baseClassname = "",
  disabledClassname = "",
  text,
  onClick = () => {},
  disabled = false,
  type = "button",
}: StyledButtonProps) {
  const disabledStyle = `${disabledClassname} ${styles.disabled}`;
  const baseStyle = `${baseClassname} ${styles.base}`;
  return (
    <button
      className={`${styles.button} ${disabled ? disabledStyle : baseStyle}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
