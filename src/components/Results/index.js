import React from "react";
import ResultItem from "../ResultItem";
import  "./results.css";

const Results = ({ resultsArray, current, className }) => (
  <div className="ui container results-wrapper">
    <ol className="results">
      {resultsArray.map((item, index) => (
        <ResultItem className={className} key={index} item={item} />
      ))}
    </ol>
  </div>
);

export default Results;
