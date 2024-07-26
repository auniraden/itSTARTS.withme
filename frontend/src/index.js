import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import ItStartsRoles from "views/pages/ItStartsRoles";
import SignUpHomeschooler from "views/pages/SignUpHomeschooler";
import SignUpParents from "views/pages/SignUpParents";
import SignUpTutor from "views/pages/SignUpTutors";
import Login from "views/pages/Login";
import Homeschooler from "views/pages/Homeschooler";
import EmailVerification from "views/index-sections/EmailVerification";
import ParentsHome from "views/pages/ParentsHome";
import TutorHome from "views/pages/TutorHome";
import RegistrationSuccess from "views/index-sections/RegistrationSuccess";
import LoginSuccess from "views/index-sections/LoginSuccess";


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
      <Route path="/sign-up-parents" element={<SignUpParents />} />
      <Route path="/sign-up-tutor" element={<SignUpTutor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homeschooler" element={<Homeschooler />} />
      <Route path="/email/verify/:userId/:token" element={<EmailVerification />} />
      <Route path="/parents-home" element={<ParentsHome />} />
      <Route path="/tutor-home" element={<TutorHome />} />
      <Route path="/registration-success" element={<RegistrationSuccess />} />
      <Route path="/login-success" element={<LoginSuccess />} />


      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>
);
