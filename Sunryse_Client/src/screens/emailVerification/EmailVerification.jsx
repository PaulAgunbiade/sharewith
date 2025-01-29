import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import StyledButton from '../../components/styledButton/StyledButton';
import InputField from '../../components/inputField/InputField';

import useToast from '../../hooks/useToast';
import useOtp from '../../hooks/useOtp';
import { verifyEmail } from './emailVerificationHelper';

import logo from '../../assets/SunryseLogoWideFillBlue.png';
import styles from './EmailVerification.module.scss';

export default function EmailVerification() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const toastInstance = useToast();
  const otpInstance = useOtp();
  const navigate = useNavigate();

  const Header = () => (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} />
      <p className={styles.title}>Reset your password</p>
      <p className={styles.subtitle}>
        Enter the email address for your account
      </p>
    </div>
  );

  const submit = useCallback(async () => {
    await verifyEmail(
      email,
      setEmailError,
      otpInstance,
      navigate,
      toastInstance,
    );
  }, [email, toastInstance]);

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <Header />
        <InputField
          classname={styles.input}
          title="Email"
          type="text"
          value={email}
          error={emailError}
          resetError={() => setEmailError('')}
          setValue={setEmail}
          minValue={8}
        />
        <StyledButton
          baseClassname={styles.button}
          text="Next"
          onClick={submit}
        />
      </div>
    </div>
  );
}
