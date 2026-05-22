// src/services/userService.js

import {
  getAllUsersApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/userApi";

export const getAllUsersService = async () => {
  try {
    const response = await getAllUsersApi();

    return response.data;
  } catch (error) {
    console.log("GET USERS ERROR :", error);
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const response = await getUserByIdApi(id);

    return response.data;
  } catch (error) {
    console.log("GET USER ERROR :", error);
    throw error;
  }
};

export const createUserService = async (data) => {
  try {
    const response = await createUserApi(data);

    return response.data;
  } catch (error) {
    console.log("CREATE USER ERROR :", error);
    throw error;
  }
};

export const updateUserService = async (id, data) => {
  try {
    const response = await updateUserApi(id, data);

    return response.data;
  } catch (error) {
    console.log("UPDATE USER ERROR :", error);
    throw error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const response = await deleteUserApi(id);

    return response.data;
  } catch (error) {
    console.log("DELETE USER ERROR :", error);
    throw error;
  }
};