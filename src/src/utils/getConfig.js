import axios from "axios";
import {
  getToken, getOrganizationId, getUsername, getUserId,
} from "@/utils/auth";
import { getTenant, solutionId } from "@/extension/extra";

export function getConfig(item) {
  let envUrl;
  let instance;
  if (Object.keys(config).length > 0) {
    envUrl = config[item];
    instance = axios.create({ baseURL: envUrl });
  } else {
    envUrl = process.env[item];
    instance = axios.create({ baseURL: envUrl });
  }
  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer${getToken()}`;
      config.headers.TenantId = getTenant();
      config.headers.solutionId = solutionId;
      config.headers.OrganizationId = getOrganizationId();
      config.headers.UserName = getUsername();
      config.headers.UserId = getUserId();
      config.headers['Content-Type'] = 'application/json charset=utf-8';
      config.headers['Access-Control-Allow-Origin'] = '*';
      return config;
    }, (error) => Promise.reject(error),
  );
  return instance;
}

export function getConfigWithoutAxios(item) {
  let envUrl;
  if (Object.keys(config).length > 0) {
    envUrl = config[item];
  } else {
    envUrl = process.env[item];
  }
  return envUrl;
}
