import React from "react";
import header from "./header.css"

const Header = ({ avatar, name, turnmsg }) => {
  return (
    <div className="eight wide column centered row scoober-blue">
      <h2 className="ui header has-padding">
        <img src={avatar} alt="pl-img" className="ui circular image avatar-img" />
        <div className="content white-text">
          {name}
          <div id="turnmsg" className="sub header white-text">
            {turnmsg}
          </div>
        </div>
      </h2>
    </div>
  );
};

export default Header;
