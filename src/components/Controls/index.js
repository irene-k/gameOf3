import React from "react";
import Button from "../Button";
import controls from "./controls.css";

const Controls = ({ buttons, disabled }) => (
  <div className="ui vertical footer segment center aligned container stackable grid eight wide column centered row">
          { buttons.map((control, index) => <Button
            className="ui button control white-text"
            text={control.text}
            onClick={control.onClick}
            disabled={disabled}
            key={index}
          /> )}
  </div>
);

export default Controls;
