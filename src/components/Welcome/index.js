import React from "react";
import logo from "../../assets/logo.png";
import Button from "../Button";
import  "./welcome.css";

const Welcome = ({ isWaiting, onSetPlayerReady }) => (

  <div className="ui center aligned container welcome">
    <div>
      <img src={logo} alt="logo" className="logo" />
    </div>
    <div className="eight wide column centered row">
      <Button
        className="large ui inverted button welcome-btn"
        text={ !isWaiting ?  "Play!" : "Waiting..."}
        onClick={onSetPlayerReady}
      />
    </div>
  </div>
);

export default Welcome;
