import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

export const createMockAPI = () => {
  const api = axios.create({
    baseURL: `https://6001809808587400174dac79.mockapi.io/melobeem`,
    timeout: 1000 * 5,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const createAPI = () => {
  const api = applyCaseMiddleware(
    axios.create({
      baseURL: `/api/v1`,
      timeout: 1000 * 5,
    })
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

export const createFbAPI = () => {
  const api = axios.create({
    baseURL: `users/auth/facebook/callback`,
    timeout: 1000 * 5,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
