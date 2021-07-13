import React from "react";
import FadeIn from "react-fade-in";
import quotes from "../quotes.json";
//import axios from "axios";
//import decode from "jwt-decode";
import apiConstant from "../constants/apiContants.js";
import "../index.css";
import Modal from "./Modal.js";

function QuoteHeader() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const navQuote = `${quote.q} ~ ${quote.a}`;

  // save quote to database
  const addQuote = (e) => {
   const quote = { quote: navQuote };
   apiConstant.createQuote(quote).then(res=>console.log(res)).catch(error=> console.log(error))
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-dark justify-content-center">
        <div className="container-fluid d-flex justify-content-center ">
          {/* Modified quote to render in static navbar */}
          <FadeIn transitionDuration="6000">
            <span
              className="navbar navbar-brand mr-1"
              style={{
                fontSize: "26px",
                fontFamily: "caveat",
                color: "white",
              }}>
              {navQuote}
            </span>

          </FadeIn>
          <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
          <ul className="navbar-nav align-items-center"
            style={{ display: "flex", flexDirection: "row" }}>
            <li className="nav-item">
              <span onClick={addQuote}>
                <i className="nav-link fas fa-bookmark"
                  style={{
                    fontSize: "1.75rem",
                    color: "#dadad5",
                    background: "transparent",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}></i>
              </span>
            </li>

            <li className="nav-item">
              <span className="nav-link"><Modal
                className="nav-item"
              /></span>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}

export default QuoteHeader;
