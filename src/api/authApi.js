// src/api/authApi.js

import axiosClient from "./axiosClient";

export const loginApi = (data) => {
  return axiosClient.post("/auth/login", data);
};

export const registerApi = (data) => {
  return axiosClient.post("/auth/register", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProfileApi = () => {
  return axiosClient.get("/auth/profile");
};

export const logoutApi = () => {
  return axiosClient.post("/auth/logout");
};