// src/api/orderApi.js

import axiosClient from "./axiosClient";

export const createOrderApi = (data) => {
  return axiosClient.post("/orders", data);
};

export const getMyOrdersApi = () => {
  return axiosClient.get("/orders/my-orders");
};

export const getOrderByIdApi = (id) => {
  return axiosClient.get(`/orders/${id}`);
};

export const cancelOrderApi = (id) => {
  return axiosClient.put(`/orders/cancel/${id}`);
};

export const getAllOrdersApi = () => {
  return axiosClient.get("/orders");
};

export const deleteOrderApi = (id) => {
  return axiosClient.delete(`/orders/${id}`);
};
