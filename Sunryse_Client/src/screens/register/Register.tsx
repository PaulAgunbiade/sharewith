import React from "react";
import {Link} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import InputField from "../../components/inputField/InputField";
import StyledButton from "../../components/styledButton/StyledButton";
import {Loader} from "../../components/loading/Loader";

import {useRegisterClinic} from "../../services/api/clinic/register/useRegisterClinic";
import {registerFormSchema, RegisterFormData} from "./registerHelper";

import logo from "../../assets/SunryseLogoWideFillBlue.png";
import styles from "./Register.module.scss";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const registerClinic = useRegisterClinic();
  const {isLoading} = registerClinic;

  const submit: SubmitHandler<RegisterFormData> = async (formData) => {
    const payload = {data: {...formData}};
    await registerClinic.mutateAsync(payload);
  };

  const Header = () => (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} />
      <h2 className={styles.title}>Create a Sunryse ID</h2>
      <h4 className={styles.subtitle}>One last step before we begin</h4>
    </div>
  );

  const Terms = () => (
    <div className={styles.footerContainer}>
      <p className={styles.text}>
        By proceeding, you agree to the{" "}
        <a
          className={styles.link}
          href="https://sunryse.app"
          target="_blank"
          rel="noreferrer"
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          className={styles.link}
          href="https://sunryse.app"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy.
        </a>
      </p>
    </div>
  );

  const LoginOption = () => (
    <div className={styles.footerContainer}>
      <p className={styles.text}>
        Already have a Sunryse ID?{" "}
        <Link className={styles.link} to="/login">
          Log in
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
              description="Password must be 8+ characters"
              value={value}
              setValue={onChange}
              error={errors.password?.message}
              type="password"
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              classname={styles.input}
              title="Password Confirmation"
              value={value}
              setValue={onChange}
              error={errors.passwordConfirmation?.message}
              type="password"
            />
          )}
        />
        <StyledButton
          baseClassname={styles.button}
          text="Create Sunryse ID"
          disabled={isSubmitting}
          type={"submit"}
        />
      </form>
      <Terms />
      <LoginOption />
    </div>
  );
}
