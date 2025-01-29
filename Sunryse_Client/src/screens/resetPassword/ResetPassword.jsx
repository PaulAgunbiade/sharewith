import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import InputField from '../../components/inputField/InputField';
import StyledButton from '../../components/styledButton/StyledButton';

import useToast from '../../hooks/useToast';
import { onPasswordReset, validateData } from './resetPasswordHelper';

import logo from '../../assets/SunryseLogoWideFillBlue.png';
import styles from './ResetPassword.module.scss';
import LoadingHOC from '../../components/loading/LoadingHOC';

function ResetPassword() {
  const navigate = useNavigate();
  const toastInstance = useToast();

  const [formData, setFormData] = useState({
    password: '',
    passwordConf: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    passwordConf: '',
  });

  const { email } = useSelector((state) => state.otp);

  useEffect(() => {
    if (!email) navigate('/login');
  });

  const updateForm = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateErrors = (field, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  async function submit() {
    const valid = validateData(formData, setErrors);
    if (valid) {
      await onPasswordReset(formData, email, navigate, toastInstance);
    }
  }

  const Header = () => (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} />
      <p className={styles.title}>Reset your password</p>
      <p className={styles.subtitle}>Please Enter a new password</p>
    </div>
  );

  return (
    <div className={styles.screen}>
      <div id="ResetPassword" className={styles.card}>
        <Header />
        <InputField
          inputId="password_input"
          classname={styles.input}
          title="Password"
          type="password"
          description="Your password must be at least 8 characters"
          value={formData.password}
          setValue={(value) => updateForm('password', value)}
          error={errors.password}
          resetError={() => updateErrors('password', '')}
        />
        <InputField
          inputId="password_conf_input"
          classname={styles.input}
          title="Confirm password"
          type="password"
          value={formData.passwordConf}
          setValue={(value) => updateForm('passwordConf', value)}
          error={errors.passwordConf}
          resetError={() => updateErrors('passwordConf', '')}
        />
        <StyledButton
          baseClassname={styles.button}
          text="Reset"
          onClick={submit}
        />
      </div>
    </div>
  );
}

const loaderStyles = {
  color: 'white',
};
const containerStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default LoadingHOC(
  ResetPassword,
  'ResetPassword',
  false,
  loaderStyles,
  containerStyles,
);
