import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import PrivateRouteLayout from "./screens/layout/PrivateRouteLayout";
import PublicRouteLayout from "./screens/layout/publicRouteLayout/PublicRouteLayout";

import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import ResetPassword from "./screens/resetPassword/ResetPassword";
import OtpVerification from "./screens/otpVerification/OtpVerification";
import EmailVerification from "./screens/emailVerification/EmailVerification";
import Unauthorized from "./screens/Unauthorized";
import Missing from "./screens/Missing";
import Home from "./screens/home/Home";
import BusinessHours from "./screens/businessHours/BusinessHours";
import Calendar from "./screens/calendar/Calendar";
import Finances from "./screens/finances/Finances";
import Marketing from "./screens/marketing/Marketing";
import Services from "./screens/services/Services";
import NewService from "./screens/services/newService/NewService";

import "./App.module.scss";

const PublicRoutes = (
  <Route path="/" element={<PublicRouteLayout />}>
    <Route index element={<Navigate to="/login" />} />{" "}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="otp" element={<OtpVerification />} />
    <Route path="resetPassword" element={<ResetPassword />} />
    <Route path="resetPassword/email" element={<EmailVerification />} />
    <Route path="unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<Missing />} />
  </Route>
);

const PrivateRoutes = (
  <Route path="/" element={<PrivateRouteLayout />}>
    <Route path="home" element={<Home />} />
    <Route path="hours" element={<BusinessHours />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="finances" element={<Finances />} />
    <Route path="services" element={<Services />} />
    <Route path="services/new" element={<NewService />} />
    <Route path="marketing" element={<Marketing />} />
  </Route>
);

export function App() {
  return (
    <Routes>
      {PublicRoutes}
      {PrivateRoutes}
    </Routes>
  );
}
