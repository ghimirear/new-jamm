import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
// import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';

// Site Routes
import AllJournals from "./pages/AllJournals";
import Quotes from "./pages/Quotes";
import About from "./pages/About";
import AllEntries from "./pages/AllEntries";
import EntryPage from "./pages/EntryPage";
import CreateEntry from "./pages/CreateEntry";
import Upload from "./pages/Upload"
import QuoteHeader from "./components/QuoteHeader";
import "bootstrap/js/src/collapse.js";
import Footer from "./components/Footer/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [logged, setLogged] = useState(false)
  const toggle = () => {
    setLogged(!logged)
  }
  const getuser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    setLogged(!!user)
  }
  useEffect(() => {
    getuser();
  }, [logged])

  return (
    <Router>
      <div className="App">
        <Header title={title} />
        {logged ? <QuoteHeader /> : null}
        <Switch>
          <Route exact path={["/", "/register"]} >
            <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
          </Route>
          <Route exact path="/login">
            <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
          </Route>
          <Route exact path="/alljournals">
            <AllJournals fn={ getuser } />
          </Route>
          <Route exact path="/quotes/:id"><Quotes /></Route>
          <Route exact path="/about"><About /></Route>
          <Route exact path="/entrypage"> <EntryPage /></Route>
          <Route exact path="/create/:id"><CreateEntry /> </Route>
          <Route exact path="/books/:id"><AllEntries fn={toggle} /> </Route>
          <Route exact path ="/upload/:id">< Upload /> </Route>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </Switch>
        {logged ? <Footer /> : null}
        <ToastContainer style={{zIndex:9999999999999}}/>
      </div>
    </Router>



  );
}

export default App;