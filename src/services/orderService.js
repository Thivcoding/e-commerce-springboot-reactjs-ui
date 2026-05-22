// src/services/orderService.js

import {
  createOrderApi,
  getMyOrdersApi,
  getOrderByIdApi,
  cancelOrderApi,
  getAllOrdersApi,
  deleteOrderApi,
} from "../api/orderApi";

export const createOrderService = async (data) => {
  try {
    const response = await createOrderApi(data);

    return response.data;
  } catch (error) {
    console.log("CREATE ORDER ERROR :", error);
    throw error;
  }
};

export const getMyOrdersService = async () => {
  try {
    const response = await getMyOrdersApi();

    return response.data;
  } catch (error) {
    console.log("GET MY ORDERS ERROR :", error);
    throw error;
  }
};

export const getOrderByIdService = async (id) => {
  try {
    const response = await getOrderByIdApi(id);

    return response.data;
  } catch (error) {
    console.log("GET ORDER ERROR :", error);
    throw error;
  }
};

export const cancelOrderService = async (id) => {
  try {
    const response = await cancelOrderApi(id);

    return response.data;
  } catch (error) {
    console.log("CANCEL ORDER ERROR :", error);
    throw error;
  }
};

export const getAllOrdersService = async () => {
  try {
    const response = await getAllOrdersApi();

    return response.data;
  } catch (error) {
    console.log("GET ALL ORDERS ERROR :", error);
    throw error;
  }
};

export const deleteOrderService = async (id) => {
  try {
    const response = await deleteOrderApi(id);

    return response.data;
  } catch (error) {
    console.log("DELETE ORDER ERROR :", error);
    throw error;
  }
};
