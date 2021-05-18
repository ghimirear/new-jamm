import React from "react";
import logotrans from "../../assets/logotrans.png";
import "./logo.css";

function Logo(props) {
    return (
        <div>

            <div className="card card-logo bg-transparent border-0" >
                <img className="card-img-top img-fluid card-img-logo jot" src={logotrans} style={{ width: "600px" }} alt="Card image cap" />
            </div>

        </div>
    )
}


export default Logo;