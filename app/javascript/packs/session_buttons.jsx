import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { FacebookProvider, LoginButton } from "react-facebook";

// Temp solution
const appId = "2495138454127282";

const handleResponse = (data, endpoint = "users/auth/facebook/callback") => {
  // { cookie: true } for FB.init does not work. We'll have to set the required cookie manually
  document.cookie = `fbsr_${appId}=${data.tokenDetail.signedRequest}`;

  // adding csrf token to headers
  const headers = {
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
  };

  axios.get(endpoint, { headers: headers }).then((response) => {
    console.log(response); // response 200 with user data
  });
};

const handleError = (error) => {
  console.log(error);
};

const logOut = (endpoint = "users/sign_out") => {
  console.log(endpoint);

  // adding csrf token to headers
  const headers = {
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
  };

  axios.delete(endpoint, { headers: headers }).then((response) => {
    console.log(response); // response 204 no content for successful logout
  });
};

const buttonStyle = {
  font: "bold 11px Arial",
  textDecoration: "none",
  backgroundColor: "#EEEEEE",
  color: "#333333",
  padding: "2px 6px 2px 6px",
  borderTop: "1px solid #CCCCCC",
  borderRight: "1px solid #333333",
  borderBottom: "1px solid #333333",
  borderLeft: "1px solid #CCCCCC",
  cursor: "pointer",
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <>
      <FacebookProvider appId={appId} version="v9.0" cookie={true}>
        <LoginButton onCompleted={handleResponse} onError={handleError}>
          <span style={buttonStyle}>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>

      <button style={buttonStyle} onClick={() => logOut()}>
        Logout
      </button>
    </>,
    document.getElementById("session-buttons")
  );
});
