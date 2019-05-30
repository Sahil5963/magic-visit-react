import React from "react";

import classes from "./WhitePage.module.css";
import WebsiteList from "../../containers/WebsiteList/WebsiteList";

import PushWebsiteForm from "../../containers/PushWebsiteForm/PushWebsiteForm";

function WhitePage() {
  return (
    <div className={classes.WhitePage}>
      <WebsiteList />
    </div>
  );
}

export default WhitePage;
