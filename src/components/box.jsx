import React from "react";

export default function Box(props) {
    return (
        <>
            <div className="box">
                <p>{props.title}</p>
                <h1>{props.value}</h1>
            </div>
        </>
    )
}