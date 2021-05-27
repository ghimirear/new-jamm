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
    errorMessage: null,
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
    if (state.password.length < 8 || state.confirmPassword.length < 8) {
      setState((prevState) => ({
        ...prevState,
        errorMessage:
          "password must be 8 character or more",
          
      }));
      return;
    }
    if (!!state.email.includes("/^[^\s@]+@[^\s@]+$/")) {
      setState((prevState) => ({
        ...prevState,
        errorMessage:
          "invalid email",
          
      }));
      return;
    }
    if (state.firstName==="" || state.lastName==="") {
      setState((prevState) => ({
        ...prevState,
        errorMessage:
          "name is required",
          
      }));
      return;
    }


     if (state.email.length && state.password.length > 8 && state.password === state.confirmPassword) {
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

            };
            sessionStorage.setItem("user", JSON.stringify(user));
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            redirectToHome();
            props.showError(null);
          } else if (response.status === 400) {
            setState((prevState) => ({
              ...prevState,
              errorMessage:
                "This email is already registered",
            }));
          }
          else if(response.status===404){
            setState((prevState) => ({
              ...prevState,
              errorMessage:
                "you are not registered.",
            }));
          }
        })
        .catch(function (error) {
          setState((prevState) => ({
            ...prevState,
            errorMessage:
              "this email is already registered!!",
          }));
        });
    } else {
      setState((prevState) => ({
        ...prevState,
        errorMessage:
          "this email is already registered!!",
      }));
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
    } else if(!!state.email.includes("/\S+@\S+\.\S+/")){
      props.showError("please enter a valid email")
      return;
    }
     else {
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
                  required={true}
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
                  required
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
                  <a href="/login" style={{textDecoration:"underline"}}>Login here</a> 
              </span>
              </div>

              <div
                className="alert alert-success "
                style={{ display: state.successMessage ? "inline-block": "none" }}
                role="alert">
                {state.successMessage}
              </div>
              <div
                className="alert alert-danger "
                style={{ display: state.errorMessage ? "inline-block": "none" }}
                role="alert">
                {state.errorMessage}
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  );
}

export default withRouter(RegistrationForm);
