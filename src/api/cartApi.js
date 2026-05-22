// src/api/cartApi.js

import axiosClient from "./axiosClient";

const CART_PATH = "/carts";
const CART_ITEM_PATH = "/cart-items";

export const createCartApi = () => {
  return axiosClient.post(CART_PATH);
};

export const getMyCartApi = () => {
  return axiosClient.get(`${CART_PATH}/my-cart`);
};

export const getCartApi = () => {
  return getMyCartApi();
};

export const addToCartApi = (data) => {
  console.log(data);
  
  return axiosClient.post(CART_ITEM_PATH, data);
};

export const updateCartItemApi = (id, quantity) => {
  console.log(id, quantity);
  return axiosClient.put(`${CART_ITEM_PATH}/${id}`, null, {
    params: { quantity },
  });
};

export const removeCartItemApi = (id) => {
  console.log(id);
  return axiosClient.delete(`${CART_ITEM_PATH}/${id}`);
};
