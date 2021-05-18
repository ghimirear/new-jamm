import React from 'react';
import "./cardjournal.css";

function CardJournal(props) {


    return (
        <div className="card">
            {props.children}
        </div >
    );
}

export default CardJournal;