import React from "react";
import resultItem from "./resultItem.css"

export const ResultItem = ({ className, index, item }) => (
    <li key={index} className={className}>
        {item}
    </li>
);

export default ResultItem;
