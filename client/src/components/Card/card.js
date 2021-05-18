import React from 'react';
import "./card.css";

function Card(props) {


    return (
        <div className="card">
            <div className="card-body">
                <div>
                    <h3 className="card-title" key={props.id}>
                        { }
                    </h3>
                    <div className="card-div">
                        <ul className="card-ul">
                            <li><span><i className="fas fa-edit"></i>
                            </span>Jot a New Entry!</li>
                            <li>
                                <i className="fas fa-book"></i>
                                <span>See All Jots</span></li>
                            <li>
                                <i class="fas fa-cog"></i>
                                <span>Journal Settings</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div >
        </div >
    );
}

export default Card;