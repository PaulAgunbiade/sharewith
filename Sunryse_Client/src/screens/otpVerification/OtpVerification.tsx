import React, {useCallback} from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import StyledButton from "../../components/styledButton/StyledButton";
// import OtpInput from "../../components/otpInput/OtpInput";
import {Loader} from "../../components/loading/Loader";

import logo from "../../assets/SunryseLogoWideFillBlue.png";
import {useSendOtp} from "../../services/api/auth/otp/useSendOtp";
import {useVerifyOtp} from "../../services/api/auth/otp/useVerifyOtp";
import {RootState} from "../../services/redux/reducers/rootReducer";

import styles from "./OtpVerification.module.scss";
import InputField from "../../components/inputField/InputField";

export default function OtpVerification() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const isDisabled = code.length < 6;
  const {from, email} = useSelector((state: RootState) => state.otp);

  const otpVerifier = useVerifyOtp();
  const otpSender = useSendOtp();
  const {isLoading: isSendingOtp} = otpSender;
  const {isLoading: isVerifyingOtp} = otpSender;

  async function submitOtp() {
    const payload = {data: {code, email}};
    await otpVerifier.mutateAsync(payload);
  }

  const sendNewOtp = useCallback(async () => {
    const payload = {data: {email}};
    await otpSender.mutateAsync(payload);
  }, [email, otpSender]);

  useEffect(() => {
    if (!email) {
      const revertTo = from || "/login";
      navigate(revertTo);
    } else {
      sendNewOtp();
    }
  }, [email, from, navigate]);

  if (isSendingOtp || isVerifyingOtp) {
    return <Loader type="white" />;
  }

  const Header = () => (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} />
      <h2 className={styles.title}>Verification Code</h2>
      <p className={styles.subtitle}>
        Please enter the verification code sent to your email
      </p>
    </div>
  );

  const Footer = () => (
    <div className={styles.footerContainer}>
      <p className={styles.text}>
        Did not receive code?{" "}
        <span className={styles.link} onClick={() => sendNewOtp()}>
          Resend
        </span>
      </p>
    </div>
  );

  return (
    <div id="Otp" className={styles.card}>
      <Header />
      <div className={styles.formContainer}>
        {/* TODO FIX THis: <OtpInput setValue={(value) => setCode(() => value)} numInputs={6} /> */}
        <InputField
          classname=""
          title="One Time Password"
          value={code}
          setValue={setCode}
          placeholder="123456"
        />
        <StyledButton
          baseClassname={styles.button}
          onClick={() => submitOtp()}
          text="Submit"
        />
        <Footer />
      </div>
    </div>
  );
}
