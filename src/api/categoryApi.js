// src/api/categoryApi.js

import axiosClient from "./axiosClient";

export const getAllCategoriesApi = () => {
  return axiosClient.get("/category");
};

export const getCategoryByIdApi = (id) => {
  return axiosClient.get(`/category/${id}`);
};

export const createCategoryApi = (data) => {
  return axiosClient.post("/category", data);
};

export const updateCategoryApi = (id, data) => {
  return axiosClient.put(`/category/${id}`, data);
};

export const deleteCategoryApi = (id) => {
  return axiosClient.delete(`/category/${id}`);
};
