// src/services/categoryService.js

import {
  getAllCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../api/categoryApi";

export const getAllCategoriesService = async () => {
  try {
    const response = await getAllCategoriesApi();

    return response.data;
  } catch (error) {
    console.log("GET CATEGORIES ERROR :", error);
    throw error;
  }
};

export const getCategoryByIdService = async (id) => {
  try {
    const response = await getCategoryByIdApi(id);

    return response.data;
  } catch (error) {
    console.log("GET CATEGORY ERROR :", error);
    throw error;
  }
};

export const createCategoryService = async (data) => {
  try {
    const response = await createCategoryApi(data);

    return response.data;
  } catch (error) {
    console.log("CREATE CATEGORY ERROR :", error);
    throw error;
  }
};

export const updateCategoryService = async (id, data) => {
  try {
    const response = await updateCategoryApi(id, data);

    return response.data;
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR :", error);
    throw error;
  }
};

export const deleteCategoryService = async (id) => {
  try {
    const response = await deleteCategoryApi(id);

    return response.data;
  } catch (error) {
    console.log("DELETE CATEGORY ERROR :", error);
    throw error;
  }
};
