// 在真实环境中，如果使用 firebase 这种第三方 auth 服务的话，本文件不需要开发者开发

import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorgeKey = "__auth-provider_token__";

export const getToken = () => window.localStorage.getItem(localStorgeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorgeKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorgeKey);
