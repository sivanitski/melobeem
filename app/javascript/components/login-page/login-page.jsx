import React from "react";

import { Footer } from "../footer";
import { HeaderNotLogin } from "../header-not-login";

const LoginPage = () => {
  return (
    <>
      <HeaderNotLogin />

      <Footer active="leaderboard" />
    </>
  );
};

export default LoginPage;
