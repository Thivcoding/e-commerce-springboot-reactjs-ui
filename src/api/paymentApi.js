// src/api/paymentApi.js

import axiosClient from "./axiosClient";

export const createPaymentApi = (data) => {
  return axiosClient.post("/payments", data);
};

export const getAllPaymentsApi = () => {
  return axiosClient.get("/payments");
};

export const getPaymentByIdApi = (id) => {
  return axiosClient.get(`/payments/${id}`);
};

export const getMyPaymentsApi = () => {
  return axiosClient.get("/payments/my-payments");
};

export const updatePaymentStatusApi = (id, status) => {
  return axiosClient.put(`/payments/${id}/status`, null, {
    params: {
      status,
    },
  });
};
