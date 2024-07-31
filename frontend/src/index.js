/**
 * NUR SYAFIQAH AUNI SHAHARUDIN
 * TP066621
 * APU3F2311SE
 */


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";


// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import ItStartsRoles from "views/pages/ItStartsRoles";
import SignUpHomeschooler from "views/pages/SignUpHomeschooler";
import Login from "views/pages/Login";
import Homeschooler from "views/pages/Homeschooler";
import EmailVerification from "views/index-sections/EmailVerification";
import RegistrationSuccess from "views/index-sections/RegistrationSuccess";
import LoginSuccess from "views/index-sections/LoginSuccess";
import WaitingApproval from "views/index-sections/WaitingApproval";


// Set the base URL for axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/it-starts-roles" element={<ItStartsRoles />} />
      <Route path="/sign-up-homeschooler" element={<SignUpHomeschooler />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeschooler" element={<Homeschooler />} />
      <Route path="/email/verify/:userId/:token" element={<EmailVerification />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/waiting-approval" element={<WaitingApproval />} />





      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>
);
