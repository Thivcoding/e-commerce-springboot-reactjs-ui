// src/services/productService.js

import {
  getAllProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../api/productApi";

export const getAllProductsService = async () => {
  try {
    const response = await getAllProductsApi();

    return response.data;
  } catch (error) {
    console.log("GET PRODUCTS ERROR :", error);
    throw error;
  }
};

export const getProductByIdService = async (id) => {
  try {
    const response = await getProductByIdApi(id);

    return response.data;
  } catch (error) {
    console.log("GET PRODUCT ERROR :", error);
    throw error;
  }
};

export const createProductService = async (data) => {
  try {
    const response = await createProductApi(data);

    return response.data;
  } catch (error) {
    console.log("CREATE PRODUCT ERROR :", error);
    throw error;
  }
};

export const updateProductService = async (id, data) => {
  try {
    const response = await updateProductApi(id, data);

    return response.data;
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR :", error);
    throw error;
  }
};

export const deleteProductService = async (id) => {
  try {
    const response = await deleteProductApi(id);

    return response.data;
  } catch (error) {
    console.log("DELETE PRODUCT ERROR :", error);
    throw error;
  }
};