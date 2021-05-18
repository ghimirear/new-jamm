import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

import { withRouter } from "react-router-dom";
import Logo from "../Logo/logo";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios
      .post("/api/signin", payload)
      .then(function (response) {
        if (response.status === 200) {
          const user = {
            token: response.data.token,
            id: response.data.result._id,
            name: response.data.result.firstName,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          redirectToHome();
          props.showError(null);
        } else if (response.status === 400) {
          props.showError("Username or password do not match");
        } else {
          props.showError("this email is not registered");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/alljournals");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };

  return (


    <div className="container-fluid">
      <div className="row ">
        <div className="col col-lg-9 col-md-8 col-sm-6 col-xs-7 col-xl-9 login register ">
          <Logo />
        </div>

        <div className="col col-lg-3 col-md-4 col-sm-6 col-xs-5 col-xl-3 pr-0 pl-0 register ">
          <form className="loginForm">
            <div className="inner-border">
              <h1 style={{ marginBottom: "35px" }}>Log In</h1>

              <div className="form-group text-center">
                <label htmlFor="exampleInputEmail1"></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group text-center">
                <label htmlFor="exampleInputPassword1"></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-check form-group">
                <button
                  type="submit"
                  className="btn btn-submit btn-lg btn-dark"
                  style={{ marginTop: "35px" }}
                  onClick={handleSubmitClick}>
                  Submit
          </button>
              </div>

              <div
                className="alert alert-success mt-2"
                style={{ display: state.successMessage ? "block" : "none" }}
                role="alert">
                {state.successMessage}
              </div>
              <div className="registerMessage" style={{ marginTop: "35px" }}>
                <span>Don't have an account? </span>
                <span className="loginText"

                  onClick={() => redirectToRegister()}>
                  Register HERE</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div >

  );
}

export default withRouter(LoginForm);
