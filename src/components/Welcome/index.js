import React from "react";
import logo from "../../assets/logo.png";
import Button from "../Button";
import welcome from "./welcome.css";

export const Welcome = ({ text, onClick }) => (
  <div className="ui center aligned container welcome">
    <div>
      <img src={logo} className="logo" />
    </div>
    <div className="eight wide column centered row">
      <Button
        className="large ui inverted button"
        text={text}
        onClick={onClick}
      />
    </div>
  </div>
);

export default Welcome;
