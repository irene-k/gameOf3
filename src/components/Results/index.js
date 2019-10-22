import React from "react";
import ResultItem from "../ResultItem";
import results from "./results.css";

export const Results = ({ resultsArray, current, className }) => (
  <div className="ui container results-wrapper">
    <ol className="results">
      {resultsArray.map((item, index) => (
        <ResultItem className={className} index={index} item={item} />
      ))}
      <ResultItem className={className} item={current} />
    </ol>
  </div>
);

export default Results;
