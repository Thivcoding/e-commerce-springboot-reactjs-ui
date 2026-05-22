// src/api/productApi.js

import axiosClient from "./axiosClient";

export const getAllProductsApi = () => {
  return axiosClient.get("/products");
};

export const getProductByIdApi = (id) => {
  return axiosClient.get(`/products/${id}`);
};

export const createProductApi = (data) => {
  return axiosClient.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProductApi = (id, data) => {
  return axiosClient.put(`/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductApi = (id) => {
  return axiosClient.delete(`/products/${id}`);
};