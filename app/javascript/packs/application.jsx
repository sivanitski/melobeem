import "../less/main.less";

import * as ActiveStorage from "@rails/activestorage";
import Rails from "@rails/ujs";
import { FacebookProvider } from "react-facebook";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// import { Helmet } from "react-helmet";
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
        {/* <Helmet>
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://melobeem.com"
            data-react-helmet="true"
          />
          <meta
            property="og:site_name"
            content="Melobeem"
            data-react-helmet="true"
          />
          <meta
            property="og:title"
            content="Melobeem"
            data-react-helmet="true"
          />
          <meta
            property="og:description"
            content="Programa de fiestas"
            data-react-helmet="true"
          />
          <meta
            property="og:image"
            content="../images/header-left@2x.png"
            data-react-helmet="true"
          />
          <meta property="og:type" content="website" data-react-helmet="true" />
          <meta
            property="og:updated_time"
            content="1626969003992"
            data-react-helmet="true"
          />
          <meta charSet="utf-8" data-react-helmet="true" />
          <title>Melobeem</title>
          <meta
            name="description"
            content=" Melobeem is a free photo contest for Babies up to 4 years!"
            data-react-helmet="true"
          />
          <link
            rel="canonical"
            href="https://melobeem.com"
            data-react-helmet="true"
          />
        </Helmet> */}
        <App />
      </GoogleReCaptchaProvider>
    </FacebookProvider>,
    document.body.appendChild(root)
  );
});
