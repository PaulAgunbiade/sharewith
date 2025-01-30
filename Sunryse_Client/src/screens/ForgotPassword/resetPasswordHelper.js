import axios from "../../services/api/axios";
import {checkFormData} from "../../utilities/formChecks";
import {RESET_PASSWORD_FORM_RULES} from "./resetPasswordFormRules";

export async function onPasswordReset(formData, email, navigate, toast) {
  const data = {...formData, email};
  try {
    const res = await axios.post("/resetPassword", {
      data,
    });
    toast.success(res.data.message);
    navigate("/login");
  } catch (error) {
    if (error.response) {
      toast.error(error?.response?.data?.message);
    }
  }
}

export function validateData(formData, setErrors) {
  const newErrors = checkFormData(formData, RESET_PASSWORD_FORM_RULES);
  if (Object.keys(newErrors).length > 0) {
    setErrors((prevState) => ({
      ...prevState,
      ...newErrors,
    }));
    return false;
  }
  return true;
}
