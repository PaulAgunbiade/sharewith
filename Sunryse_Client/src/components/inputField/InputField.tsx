import React, {Dispatch, SetStateAction} from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";

import styles from "./InputField.module.scss";

type InputFieldProps<T extends string | number> = {
  classname?: string;
  title: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<T>>;
  description?: string;
  placeholder?: string;
  error?: string;
  type?: "text" | "password" | "number";
  size?: "sm" | "md";
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
};

export default function InputField<T extends string | number>({
  classname = "",
  title,
  value,
  setValue,
  description = "",
  placeholder = "",
  error = "",
  type = "text",
  maxLength = 300,
  minValue = 0,
  size = "md",
}: InputFieldProps<T>) {
  const Header = () => (
    <div className={styles.header}>
      <p className={styles.title}>{title}</p>
      {error && <ErrorMessage data-testid={error} message={error} />}
    </div>
  );

  const setInputValue = (newValue: string) => {
    let sanitizedValue: T;
    if (type === "number") {
      sanitizedValue = parseInt(newValue) as T;
    } else {
      sanitizedValue = newValue as T;
    }
    setValue(sanitizedValue);
  };

  return (
    <div className={`${styles.container} ${classname}`}>
      <Header />
      <input
        className={`${styles.inputField} ${size === "sm" && styles.smallInput}`}
        value={value}
        onChange={(e) => setInputValue(e.target.value)}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        min={minValue}
      />
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
