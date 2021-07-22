import "../less/main.less";

import * as ActiveStorage from "@rails/activestorage";
import Rails from "@rails/ujs";
import { FacebookProvider } from "react-facebook";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { App } from "../components/app";

Rails.start();
ActiveStorage.start();

import React from "react";
import ReactDOM from "react-dom";

const root = document.createElement("div");
root.classList.add("root");

const appId = process.env.FACEBOOK_APP_ID;
const recaptchaKey = process.env.RECAPTCHA_PUBLIC_KEY;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <FacebookProvider appId={appId} version="v9.0" cookie={true}>
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
        <App />
      </GoogleReCaptchaProvider>
    </FacebookProvider>,
    document.body.appendChild(root)
  );
});
