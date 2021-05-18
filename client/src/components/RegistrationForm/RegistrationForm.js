import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";

import { withRouter } from "react-router-dom";
import Logo from "../Logo/logo";


function RegistrationForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
    firstName: "",
    lastName: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      props.showError(null);
      const payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      };
      axios
        .post("/api/signup", payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            const user = {
              token: response.data.token,
              id: response.data.result._id,
              name: response.data.result.firstName,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            redirectToHome();
            props.showError(null);
          } else if (response.status === 400) {
            props.showError("this email is already register");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  return (
    <>

      <div className="container-fluid px-0">
        <div className="row">
          <div className="col col-lg-9 col-md-8 col-sm-6 col-xs-7 col-xl-9 login register ">
            <Logo />
          </div>

          <div id="regform1" className="col col-lg-3 col-md-4 col-sm-6 col-xs-5 col-xl-3 pr-0 pl-0 register">
            <form className="registration-form">
              <h1> Sign Up</h1>

              <div className="form-group text-center">
                <label htmlFor="exampleInputfirstName"></label>
                <input
                  type="firstName"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={state.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group text-center">
                <label htmlFor="exampleInputlastName"></label>
                <input
                  type="lastName"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={state.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-center">
                <label htmlFor="exampleInputEmail1"></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group regis-password">
                <label htmlFor="exampleInputPassword1 text-center">
                  <h3><em>Shhhhh!</em></h3></label>
                <input
                  type="password"
                  className="form-control text-left"
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-center">
                <label htmlFor="exampleInputPassword1"></label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-group">
                <button
                  type="submit"
                  className="btn-submit btn btn-lg btn-dark"
                  style={{ marginTop: "35px" }}
                  onClick={handleSubmitClick}>
                  Sign Up
              </button>
              </div>
              <br />
              <div>
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>
                  Login HERE
              </span>
              </div>

              <div
                className="alert alert-success "
                style={{ display: state.successMessage ? "block" : "none" }}
                role="alert">
                {state.successMessage}
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  );
}

export default withRouter(RegistrationForm);
