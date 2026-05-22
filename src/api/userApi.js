// src/api/userApi.js

import axiosClient from "./axiosClient";

export const getAllUsersApi = () => {
  return axiosClient.get("/users");
};

export const getUserByIdApi = (id) => {
  return axiosClient.get(`/users/${id}`);
};

export const createUserApi = (data) => {
  return axiosClient.post("/users", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUserApi = (id, data) => {
  return axiosClient.put(`/users/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUserApi = (id) => {
  return axiosClient.delete(`/users/${id}`);
};