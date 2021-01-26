import axios from "axios";

export const createAPI = () => {
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
