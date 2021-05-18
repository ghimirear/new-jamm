import React from "react";
import "./ContainerJournal.css";

export function ContainerJournal({ fluid, children }) {
    return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export default ContainerJournal;