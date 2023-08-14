import axios, { AxiosInstance } from "axios";

import { config } from "~/config/index";

export const createAPIClientDefault = (apiPath: string): AxiosInstance =>
  axios.create({
    auth: {
      username: config.s4.username,
      password: config.s4.password,
    },
    baseURL: config.s4.url + apiPath,
  });
