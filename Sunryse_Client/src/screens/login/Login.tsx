import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import InputField from "../../components/inputField/InputField";
import StyledButton from "../../components/styledButton/StyledButton";
import {Loader} from "../../components/loading/Loader";

import {useLogin} from "../../services/api/auth/login/useLogin";

import logo from "../../assets/SunryseLogoWideFillBlue.png";
import styles from "./Login.module.scss";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormData, loginFormSchema} from "./loginHelper";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const loginUser = useLogin();
  const {isLoading} = loginUser;

  const submit: SubmitHandler<LoginFormData> = async (formData) => {
    const payload = {data: {...formData}};
    await loginUser.mutateAsync(payload);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") handleSubmit(submit);
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [submit]);

  const Header = () => (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} />
      <h2 className={styles.title}>Log in</h2>
      <p className={styles.subtitle}>Continue to Sunryse</p>
    </div>
  );

  const Help = () => (
    <div className={styles.footerContainer}>
      <p className={styles.text}>
        Forgot your password?{" "}
        <Link to="/login/reset" className={styles.link}>
          Reset
        </Link>
      </p>
    </div>
  );

  const RegisterOption = () => (
    <div className={styles.footerContainer}>
      <p className={styles.text}>
        New to Sunryse?{" "}
        <Link className={styles.link} to="/register">
          Create an account
        </Link>
      </p>
    </div>
  );

  if (isLoading) {
    return <Loader type={"white"} />;
  }

  return (
    <div className={styles.card}>
      <Header />
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              classname={styles.input}
              title="Email"
              value={value}
              setValue={onChange}
              error={errors.email?.message}
              type="text"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              classname={styles.input}
              title="Password"
              value={value}
              setValue={onChange}
              error={errors.password?.message}
              type="password"
            />
          )}
        />
        <StyledButton
          baseClassname={styles.button}
          text="Log in"
          disabled={isSubmitting}
          type={"submit"}
        />
      </form>
      <Help />
      <RegisterOption />
    </div>
  );
}
