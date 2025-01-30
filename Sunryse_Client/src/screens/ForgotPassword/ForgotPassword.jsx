import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/inputField/InputField";
import StyledButton from "../../components/styledButton/StyledButton";

import logo from "../../assets/SunryseLogoWideFillBlue.png";
import styles from "./ForgotPassword.module.scss";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    // Simulate API call for password reset
    setTimeout(() => {
      setMessage("If an account exists, a password reset link has been sent.");
    }, 1000);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <h2 className={styles.title}>Forgot Password</h2>
        <p className={styles.subtitle}>
          Enter your email to receive a password reset link.
        </p>

        {message && <p className={styles.message}>{message}</p>}

        <InputField
          inputId="email_input"
          classname={styles.input}
          title="Email"
          type="email"
          value={email}
          setValue={setEmail}
          error={!email && "Email is required"}
        />

        <StyledButton baseClassname={styles.button} text="Send Reset Link" onClick={handleSubmit} />

        <div className={styles.backToLogin} >
        <StyledButton baseClassname={styles.backToLogin} text="Back to Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
