import "../less/main.less";

import * as ActiveStorage from "@rails/activestorage";
import Rails from "@rails/ujs";
import { FacebookProvider } from "react-facebook";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Helmet } from "react-helmet";

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
    <FacebookProvider appId={appId} version="v10.0" xfbml={true} cookie={true}>
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
        <Helmet>
          <meta name="title" content="Melobeem" data-react-helmet="true" />
          <meta
            name="description"
            content="Melobeem is a free photo contest for Babies up to 4 years!"
            data-react-helmet="true"
          />
        </Helmet>
        <App />
      </GoogleReCaptchaProvider>
    </FacebookProvider>,
    document.body.appendChild(root)
  );
});
