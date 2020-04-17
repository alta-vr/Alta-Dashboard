
import React from "react";

export default function footerDetails() {
    return(
        <span>
        &copy; {1900 + new Date().getYear()} {" "}
        <a href="http://altavr.io/">
            Alta VR
        </a>{" "}
        </span>
    )
}