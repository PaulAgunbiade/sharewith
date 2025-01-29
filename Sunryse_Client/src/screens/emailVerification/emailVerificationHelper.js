import axios from "../../services/api/axios";

function validateEmail(email) {
  const validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return validRegex.test(email);
}

async function verifyEmail(
  email,
  setEmailError,
  otpInstance,
  navigate,
  toastInstance
) {
  const valid = validateEmail(email);
  if (valid) {
    try {
      const res = await axios.post("/resetPassword/email", {
        data: {email},
      });
      const isEmailFound = res.data.isEmailFound;
      if (isEmailFound) {
        otpInstance.storeFrom("/resetPassword/email");
        otpInstance.storeEmail(email);
        otpInstance.storeCallback(() => navigate("/resetPassword"));
        navigate("/otp");
      } else {
        setEmailError("Email is not associated with an account");
      }
    } catch (error) {
      toastInstance.error("There was an error on our end, please try again");
      navigate("/login");
    }
  } else {
    setEmailError("Email is invalid");
  }
}

export {verifyEmail, validateEmail};
