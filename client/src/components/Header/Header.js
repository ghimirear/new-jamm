import React, { useState, useEffect } from 'react';
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import logotrans from "../../assets/logotrans.png"
import "bootstrap/js/src/collapse.js";
import "./header.css";

const Header = () => {
    const [user, setuser] = useState([]);
    const NewUser = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (NewUser) {
            setuser(prevState => ({
                ...prevState,
                userId: NewUser.id,
                token: NewUser.token,
                name: NewUser.name
            }))
        }
    }, []);
    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login";
    }
    const token = NewUser?.token;
    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
        }
    }

    return (
        <div>


            { NewUser ? (

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container mt-0 mb-0" style={{ height: "60px" }}>

                        <div className="navbar-brand brand-text pb-0 pt-0"><Link to="/alljournals" className={window.location.pathname === "/alljournals" ? "nav-link active" : "nav-link"}><img className="jot" src={logotrans} width="120px" /><span style={{ color: "#000" }}>write it all down</span></Link></div>
                        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto ">
                                <li className="nav-item ">
                                    <Link to="/allentries" className={window.location.pathname === "/allentries" ? "nav-link active" : "nav-link"}></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/alljournals" className={window.location.pathname === "/alljounsals" ? "nav-link active" : "nav-link"}>Home</Link>
                                </li>
                                <li className="nav-item " >
                                    <Link to="/createentry" className={window.location.pathname === "/createentry" ? "nav-link active" : "nav-link"}></Link>
                                </li>
                                <li className="nav-item" >
                                    <Link to={`/quotes/${NewUser.id}`} className={window.location.pathname === "/quotes" ? "nav-link active" : "nav-link"}>Quotes</Link>
                                </li>
                                <li className="nav-item " >
                                    <Link to="/entrypage" className={window.location.pathname === "/entrypage" ? "nav-link active" : "nav-link"}></Link>
                                </li>
                                <li className="nav-item" >
                                    <Link to="/about" className={window.location.pathname === "/entries" ? "nav-link active" : "nav-link"}>About</Link>
                                </li>
                                <li>
                                    <button id="button1" className="btn " onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav >
            ) : (<div></div>)}



        </div>
    )

}
export default Header;



