import axiosClient from "./axiosClient";

const CART = "/carts";
const CART_ITEM = "/cart-items";

export const getCartApi = () => {
  return axiosClient.get(`${CART}/my-cart`);
};

export const createCartApi = () => {
  return axiosClient.post(CART);
};

export const addToCartApi = (data) => {
  return axiosClient.post(CART_ITEM, data);
};

export const updateCartItemApi = (id, quantity) => {
  return axiosClient.put(`${CART_ITEM}/${id}`, null, {
    params: { quantity },
  });
};

export const removeCartItemApi = (id) => {
  return axiosClient.delete(`${CART_ITEM}/${id}`);
};