import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

const createAPI = (isUser) => {
  const api = applyCaseMiddleware(
    axios.create({
      baseURL: isUser ? `/users` : `/api/v1`,
      timeout: 1000 * 5,
    }),
    {
      preservedKeys: ["g-recaptcha-response-data"],
    }
  );

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const api = createAPI();

export const userAPI = createAPI(true);
