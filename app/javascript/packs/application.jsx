import "../less/main.less";

import * as ActiveStorage from "@rails/activestorage";
import Rails from "@rails/ujs";

import { App } from "../components/app";

Rails.start();
ActiveStorage.start();

import React from "react";
import ReactDOM from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
