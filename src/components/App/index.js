import React from "react";
import { IconContext } from "react-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import SignUp from "../Signup";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";

function AppMarvel() {
  return (
    <Router>
      <IconContext.Provider value={{style:{verticalAlign: 'middle'}}}>
      <Header />
      <Routes>
        <Route path="/signup" component={SignUp} element={<SignUp />} errorElement={<ErrorPage />}/>
        <Route path="/login" component={Login} element={<Login />} errorElement={<ErrorPage />}/>
        <Route path="/forget" component={ForgetPassword} element={<ForgetPassword />}  errorElement={<ErrorPage />} />
        <Route path="/welcome" component={Welcome} element={<Welcome />} errorElement={<ErrorPage />}/>
        <Route path="/" component={Landing} element={<Landing />} errorElement={<ErrorPage />}/>
      
      </Routes>

      <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default AppMarvel;
