// src/services/authService.js

import {
  loginApi,
  registerApi,
  getProfileApi,
  logoutApi,
} from "../api/authApi";

export const loginService = async (data) => {
  try {
    const response = await loginApi(data);

    return response.data;
  } catch (error) {
    console.log("LOGIN ERROR :", error);
    throw error;
  }
};

export const registerService = async (data) => {
  try {
    
    const response = await registerApi(data);

    return response.data;
  } catch (error) {
    console.log("REGISTER ERROR :", error);
    throw error;
  }
};

export const getProfileService = async () => {
  try {
    const response = await getProfileApi();

    return response.data;
  } catch (error) {
    console.log("PROFILE ERROR :", error);
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const response = await logoutApi();

    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    console.log("LOGOUT ERROR :", error);
    throw error;
  }
};