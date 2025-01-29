import React from "react";
import PropTypes from "prop-types";
import {useRef, useState, useEffect} from "react";
import styles from "./OtpInput.module.scss";

OtpInput.propTypes = {
  numInputs: PropTypes.number,
  setValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

type OtpInput = {
  numInputs: number;
  setValue: () => void;
  classnames: string;
};
export default function OtpInput({
  numInputs = 6,
  setValue = () => {},
  classnames = "",
}) {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(numInputs).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  // when initialy the component mounted focus the first input field
  useEffect(() => {
    focusInput(0);
  }, []);

  const handleInputChange = (index, event) => {
    const {value} = event.target;
    handleOtpChange(index, value);
    if (index < numInputs - 1) {
      focusInput(index + 1);
    }
  };
  const handleKeyDown = (index, event) => {
    if (event.code === "Backspace") {
      handleOtpChange(index, "");
      if (index > 0 && index < numInputs) {
        focusInput(index - 1);
      }
      event.preventDefault();
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);
    setValue(parseInt(newOtpValues.join("")));
  };

  const handlePaste = (index, event) => {
    let activeInput;
    let otp = [...otpValues];
    const pastedData = event.clipboardData
      .getData("text/plain")
      .slice(0, numInputs - index)
      .split("");
    pastedData.forEach((num, i) => {
      otp[index + i] = num;
    });
    // Prevents activeInput from exceeding input limit.
    activeInput = Math.min(index + pastedData.length, numInputs - 1);
    focusInput(activeInput);
    setOtpValues(otp);
    // send to its parent component
    setValue(parseInt(otp.join("")));

    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      {otpValues.map((value, index) => (
        <input
          key={index}
          className={`${styles.input} ${classnames}`}
          type="number"
          maxLength={1}
          max={9}
          value={value}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onChange={(event) => handleInputChange(index, event)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </div>
  );
}
