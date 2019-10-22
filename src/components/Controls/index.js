import React from "react";
import Button from "../Button";
import controls from "./controls.css";

export const Controls = ({
  text1,
  text2,
  text3,
  className,
  onClick1,
  onClick2,
  onClick3,
  disabled
}) => (
  <div className="ui vertical footer segment ">
    <div className="ui center aligned container">
      <div className="ui stackable grid">
        <div className={"eight wide column centered row"}>
          <Button
            className={className}
            text={text1}
            onClick={onClick1}
            disabled={disabled}
          />
          <Button
            className={className}
            text={text2}
            onClick={onClick2}
            disabled={disabled}
          />
          <Button
            className={className}
            text={text3}
            onClick={onClick3}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Controls;
