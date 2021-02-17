import "../less/main.less";

import * as ActiveStorage from "@rails/activestorage";
import Rails from "@rails/ujs";
import { FacebookProvider } from "react-facebook";

import { App } from "../components/app";

Rails.start();
ActiveStorage.start();

import React from "react";
import ReactDOM from "react-dom";

const root = document.createElement("div");
root.classList.add("root");

const appId = "369601344469446";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <FacebookProvider appId={appId} version="v9.0" cookie={true}>
      <App />
    </FacebookProvider>,
    document.body.appendChild(root)
  );
});
