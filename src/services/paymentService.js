// src/services/paymentService.js

import {
  createPaymentApi,
  getAllPaymentsApi,
  getPaymentByIdApi,
  getMyPaymentsApi,
  updatePaymentStatusApi,
  checkBakongPaymentStatusApi,
} from "../api/paymentApi";

export const createPaymentService = async (data) => {
  try {
    const response = await createPaymentApi(data);

    return response.data;
  } catch (error) {
    console.log("CREATE PAYMENT ERROR :", error);
    throw error;
  }
};

export const getAllPaymentsService = async () => {
  try {
    const response = await getAllPaymentsApi();

    return response.data;
  } catch (error) {
    console.log("GET ALL PAYMENTS ERROR :", error);
    throw error;
  }
};

export const getPaymentByIdService = async (id) => {
  try {
    const response = await getPaymentByIdApi(id);

    return response.data;
  } catch (error) {
    console.log("GET PAYMENT ERROR :", error);
    throw error;
  }
};

export const getMyPaymentsService = async () => {
  try {
    const response = await getMyPaymentsApi();

    return response.data;
  } catch (error) {
    console.log("GET MY PAYMENTS ERROR :", error);
    throw error;
  }
};

export const updatePaymentStatusService = async (id, status) => {
  try {
    const response = await updatePaymentStatusApi(id, status);

    return response.data;
  } catch (error) {
    console.log("UPDATE PAYMENT STATUS ERROR :", error);
    throw error;
  }
};

export const checkBakongPaymentStatusService = async (id) => {
  try {
    const response = await checkBakongPaymentStatusApi(id);

    return response.data;
  } catch (error) {
    console.log("CHECK BAKONG PAYMENT STATUS ERROR :", error);
    throw error;
  }
};